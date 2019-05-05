'use strict';

const scrape = require('website-scraper');
const util = require('../utils/util');
const logger = require('../utils/logger');
const exception = require('../utils/exception');
const jiraService = require('../services/jira-service');
const scraperService = require('../services/scraper-service');

let chrome = null;
let puppeteer = null;
if (util.isRunOnAws) {
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer')
}

const ISSUE_TYPE = process.env.ISSUE_TYPE;
const ISSUE_LINK_TYPE = process.env.ISSUE_LINK_TYPE;
const URL_CF_NAME = process.env.URL_CF_NAME;
const RIGHT_CF_NAME = process.env.RIGHT_CF_NAME;
const WRONG_CF_NAME = process.env.WRONG_CF_NAME;
const IGNORED_CF_NAME = process.env.IGNORED_CF_NAME;
const EXCEPTIONS_CF_NAME = process.env.EXCEPTIONS_CF_NAME;
const DIRECTORY_TEMP = process.env.DIRECTORY_TEMP;

function getTitle(htmlStr = '') {
  let result = 'title';

  try {
    let titleRegexResult = htmlStr.match(/<title>Test Results:\s*(.*)\s*<\/title>/);
    result = titleRegexResult[1];
  } catch (error) {
    logger.error(error);
  }

  return result;
}

function getTestSummary(htmlStr = '') {
  let result = {
    right: 0,
    wrong: 0,
    ignored: 0,
    exceptions: 0,
  };

  try {
    let testSummaryRegexResult = htmlStr.match(/Test Pages:.*?([\d]{1,3})\s+right,\s+([\d]{1,3})\s+wrong,\s+([\d]{1,3})\s+ignored,\s+([\d]{1,3})\s+exceptions/);
    result.right = parseInt(testSummaryRegexResult[1]);
    result.wrong = parseInt(testSummaryRegexResult[2]);
    result.ignored = parseInt(testSummaryRegexResult[3]);
    result.exceptions = parseInt(testSummaryRegexResult[4]);
  } catch (error) {
    logger.error(error);
  }

  return result;
}

async function loadWebsite(url, pathDirectoryTemp) {
  let resultMain = null;
  let errorMain = null;
  let browser = null;

  try {
    const options = {
      urls: [url],
      directory: pathDirectoryTemp
    };

    // with async/await
    const result = await scrape(options);
    let documentHTML = result[0].getText();
    let title = getTitle(documentHTML);
    let testSummary = getTestSummary(documentHTML);

    resultMain = {
      documentHTML,
      title,
      testSummary
    }
  } catch (error) {
    errorMain = error;
  }

  if (browser !== null) {
    await browser.close();
  }

  if (errorMain) {
    throw exception.create('loadWebsite', errorMain);
  }

  return resultMain;
}

async function createIssue(projectKey, inwardIssueKey, summary, description, right, wrong, ignored, exceptions) {
  let resultMain = null;
  let errorMain = null;

  try {
    let issuelink = new jiraService.issue.IssueLinkModel();
    issuelink.add.inwardIssue.key = inwardIssueKey;
    issuelink.add.type.name = ISSUE_LINK_TYPE;

    let issueParagraphContentModel = new jiraService.issue.IssueParagraphContentModel;
    issueParagraphContentModel.text = description;
    let issueDescriptionContent = new jiraService.issue.IssueDescriptionContentModel;
    issueDescriptionContent.type = 'paragraph';
    issueDescriptionContent.content.push(issueParagraphContentModel)

    let issue = new jiraService.issue.IssueModel();
    issue.fields.issuetype.name = ISSUE_TYPE,
      issue.update.issuelinks.push(issuelink);
    issue.fields.description.content.push(issueDescriptionContent);
    issue.fields.summary = summary;
    issue.fields.project.key = projectKey;
    issue.fields[RIGHT_CF_NAME] = right;
    issue.fields[WRONG_CF_NAME] = wrong;
    issue.fields[IGNORED_CF_NAME] = ignored;
    issue.fields[EXCEPTIONS_CF_NAME] = exceptions;

    resultMain = await jiraService.issue.create(issue);
  } catch (error) {
    errorMain = error;
  }


  if (errorMain) {
    throw exception.create('createIssue', errorMain);
  }

  return resultMain;
}

async function addAttachment(issueKey, path, fileName) {
  let resultMain = null;
  let errorMain = null;

  try {
    resultMain = await jiraService.issue.attachment.addWithZip(issueKey, path, fileName);
  } catch (error) {
    errorMain = error;
  }

  if (errorMain) {
    throw exception.create('addAttachment', errorMain);
  }

  return resultMain;
}

async function testScrape(url) {
  const options = {
    urls: [url],
    directory: 'output/store-temp',
    plugins: [new scraperService.ScraperPlugin()]
  };

  // with async/await
  const result = await scrape(options);
  return result[0].getText();
}

async function testPuppeteer(url) {
  let resultMain = null;
  let errorMain = null;
  let browser = null;

  try {
    if (util.isRunOnAws) {
      browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      });
    } else {
      browser = await puppeteer.launch({
        headless: true
      });
    }

    const page = await browser.newPage();
    let styles = [];
    let scripts = [];

    page.on('response', async (response) => {
      try {
        const contentType = response.request().resourceType();
        let text = await response.text();

        if (contentType === 'stylesheet') {
          styles.push(text);
          // console.log(text)
        } else if (contentType === 'script') {
          scripts.push(text);
        }
      } catch (error) {
        // do not thing
      }
    });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    let documentHTML = await page.content();

    resultMain = {
      documentHTML
    }
  } catch (error) {
    errorMain = error;
  }

  if (browser !== null) {
    await browser.close();
  }

  if (errorMain) {
    throw exception.create('testPuppeteer', errorMain);
  }

  return resultMain;
}

/**
 * @param {body, params, query} request 
 * @param {asSuccess, asError} response 
 * asSuccess = (data, message, statusCode)
 * asError = (error, message, statusCode)
 */
async function createIssueJiraWebhooks(request, response) {
  // var r = await start('https://fettblog.eu/scraping-with-puppeteer/');
  // console.log(r)
  // return response.asSuccess(1);
  try {
    let resultMain = null;
    let body = request.body;
    let issue = body.issue ? body.issue : {};
    let fields = issue.fields ? issue.fields : {};
    let url = fields[URL_CF_NAME];
    let issueKey = issue.key;
    let projectKey = fields.project.key;

    logger.log(`... Start createIssueJiraWebhooks: ${issueKey} ...`);

    if (url) {
      let now = new Date;
      let isoTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
      let pathDirectoryTemp = `${DIRECTORY_TEMP}-${isoTimestamp}`
      let dataLoadWebsite = await loadWebsite(url, pathDirectoryTemp);
      let summary = `ITAP Test Result for ${dataLoadWebsite.title} on ${isoTimestamp}`;
      let description = `${dataLoadWebsite.title}`;

      let createIssueResult = await createIssue(projectKey, issueKey, summary, description, dataLoadWebsite.testSummary.right, dataLoadWebsite.testSummary.wrong, dataLoadWebsite.testSummary.ignored, dataLoadWebsite.testSummary.exceptions);
      let fileName = `${dataLoadWebsite.title}-${util.stringRandom()}`;
      resultMain = await addAttachment(createIssueResult.key, pathDirectoryTemp, fileName);
      util.rmdir(pathDirectoryTemp);
    } else {
      logger.warn(`${issueKey} don't have url`);
      resultMain = `${issueKey} don't have url`;
    }

    logger.log(`... Stop createIssueJiraWebhooks: ${issueKey} ...`);
    return response.asSuccess(resultMain);
  } catch (error) {
    logger.error(error);
    return response.asError(error);
  }
};

module.exports = {
  createIssueJiraWebhooks
}

var exampleJiraWebhooksResponse = {
  body: {
    transition: {
      workflowId: 10000,
      workflowName: 'Software Simplified Workflow for Project TP',
      transitionId: 51,
      transitionName: 'Run Test',
      from_status: 'In Progress',
      to_status: 'In Progress'
    },
    comment: '',
    user: {
      self: 'https://itap-staging.atlassian.net/rest/api/2/user?accountId=557058%3Af0a5a110-4da2-4a0d-a2ad-358eec0fa7c8',
      name: 'admin',
      key: 'admin',
      accountId: '557058:f0a5a110-4da2-4a0d-a2ad-358eec0fa7c8',
      emailAddress: 'kiet@kietnh.com',
      avatarUrls: {
        '48x48': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
        '24x24': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
        '16x16': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
        '32x32': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue'
      },
      displayName: 'Kiet Ngo',
      active: true,
      timeZone: 'Asia/Bangkok'
    },
    issue: {
      id: '10000',
      self: 'https://itap-staging.atlassian.net/rest/api/2/issue/10000',
      key: 'TP-1',
      fields: {
        issuetype: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/issuetype/10005',
          id: '10005',
          description: 'A problem which impairs or prevents the functions of the product.',
          iconUrl: 'https://itap-staging.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303
        },
        timespent: null,
        project: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/project/10000',
          id: '10000',
          key: 'TP',
          name: 'Test Project',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48': 'https://itap-staging.atlassian.net/secure/projectavatar?avatarId=10324',
            '24x24': 'https://itap-staging.atlassian.net/secure/projectavatar?size=small&avatarId=10324',
            '16x16': 'https://itap-staging.atlassian.net/secure/projectavatar?size=xsmall&avatarId=10324',
            '32x32': 'https://itap-staging.atlassian.net/secure/projectavatar?size=medium&avatarId=10324'
          }
        },
        fixVersions: [],
        aggregatetimespent: null,
        resolution: null,
        customfield_10027: 'http://prod.at.andover.server.ds.its-ipaas.com:8000/ClientModuleSuites.QuotePolicyModuleSuites.CustomerModuleWithoutErrorsSuite?responder=test&format=html',
        resolutiondate: null,
        workratio: -1,
        lastViewed: '2019-03-26T22:23:45.427+0700',
        watches: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/issue/TP-1/watchers',
          watchCount: 1,
          isWatching: true
        },
        created: '2019-03-22T22:53:48.435+0700',
        customfield_10020: null,
        customfield_10021: null,
        customfield_10022: '0|hzzzzz:',
        priority: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/priority/3',
          iconUrl: 'https://itap-staging.atlassian.net/images/icons/priorities/medium.svg',
          name: 'Medium',
          id: '3'
        },
        customfield_10026: null,
        labels: [],
        customfield_10016: null,
        customfield_10017: null,
        customfield_10018: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'PLUGIN_LICENSE_ERROR',
            message: 'Portfolio for Jira must be licensed for the Parent Link to be available.'
          }
        },
        customfield_10019: null,
        timeestimate: null,
        aggregatetimeoriginalestimate: null,
        versions: [],
        issuelinks: [{
          id: '10000',
          self: 'https://itap-staging.atlassian.net/rest/api/2/issueLink/10000',
          type: {
            id: '10000',
            name: 'Blocks',
            inward: 'is blocked by',
            outward: 'blocks',
            self: 'https://itap-staging.atlassian.net/rest/api/2/issueLinkType/10000'
          },
          outwardIssue: {
            id: '10001',
            key: 'TP-2',
            self: 'https://itap-staging.atlassian.net/rest/api/2/issue/10001',
            fields: {
              summary: 'Issue Con',
              status: {
                self: 'https://itap-staging.atlassian.net/rest/api/2/status/10001',
                description: '',
                iconUrl: 'https://itap-staging.atlassian.net/',
                name: 'To Do',
                id: '10001',
                statusCategory: {
                  self: 'https://itap-staging.atlassian.net/rest/api/2/statuscategory/2',
                  id: 2,
                  key: 'new',
                  colorName: 'blue-gray',
                  name: 'To Do'
                }
              },
              priority: {
                self: 'https://itap-staging.atlassian.net/rest/api/2/priority/3',
                iconUrl: 'https://itap-staging.atlassian.net/images/icons/priorities/medium.svg',
                name: 'Medium',
                id: '3'
              },
              issuetype: {
                self: 'https://itap-staging.atlassian.net/rest/api/2/issuetype/10005',
                id: '10005',
                description: 'A problem which impairs or prevents the functions of the product.',
                iconUrl: 'https://itap-staging.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
                name: 'Bug',
                subtask: false,
                avatarId: 10303
              }
            }
          }
        }],
        assignee: null,
        updated: '2019-03-26T22:19:47.729+0700',
        status: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/status/3',
          description: 'This issue is being actively worked on at the moment by the assignee.',
          iconUrl: 'https://itap-staging.atlassian.net/images/icons/statuses/inprogress.png',
          name: 'In Progress',
          id: '3',
          statusCategory: {
            self: 'https://itap-staging.atlassian.net/rest/api/2/statuscategory/4',
            id: 4,
            key: 'indeterminate',
            colorName: 'yellow',
            name: 'In Progress'
          }
        },
        components: [],
        timeoriginalestimate: null,
        description: 'Issue Cha',
        customfield_10010: null,
        customfield_10014: null,
        customfield_10015: null,
        timetracking: {},
        customfield_10005: null,
        customfield_10006: null,
        security: null,
        customfield_10007: null,
        customfield_10008: null,
        customfield_10009: null,
        attachment: [],
        aggregatetimeestimate: null,
        summary: 'Issue Cha',
        creator: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/user?accountId=557058%3Af0a5a110-4da2-4a0d-a2ad-358eec0fa7c8',
          name: 'admin',
          key: 'admin',
          accountId: '557058:f0a5a110-4da2-4a0d-a2ad-358eec0fa7c8',
          emailAddress: 'kiet@kietnh.com',
          avatarUrls: {
            '48x48': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue'
          },
          displayName: 'Kiet Ngo',
          active: true,
          timeZone: 'Asia/Bangkok'
        },
        subtasks: [],
        reporter: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/user?accountId=557058%3Af0a5a110-4da2-4a0d-a2ad-358eec0fa7c8',
          name: 'admin',
          key: 'admin',
          accountId: '557058:f0a5a110-4da2-4a0d-a2ad-358eec0fa7c8',
          emailAddress: 'kiet@kietnh.com',
          avatarUrls: {
            '48x48': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32': 'https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue'
          },
          displayName: 'Kiet Ngo',
          active: true,
          timeZone: 'Asia/Bangkok'
        },
        customfield_10000: '{}',
        aggregateprogress: {
          progress: 0,
          total: 0
        },
        customfield_10001: null,
        customfield_10002: null,
        customfield_10003: null,
        customfield_10004: null,
        environment: null,
        duedate: null,
        progress: {
          progress: 0,
          total: 0
        },
        comment: {
          comments: [],
          maxResults: 0,
          total: 0,
          startAt: 0
        },
        votes: {
          self: 'https://itap-staging.atlassian.net/rest/api/2/issue/TP-1/votes',
          votes: 0,
          hasVoted: false
        },
        worklog: {
          startAt: 0,
          maxResults: 20,
          total: 0,
          worklogs: []
        }
      }
    },
    timestamp: 1553613825436
  },
  params: {
    proxy: 'TP-1'
  },
  query: {
    user_id: 'admin',
    user_key: 'admin'
  },
  method: 'POST',
  debug: {
    resource: '/{proxy+}',
    path: '/TP-1',
    httpMethod: 'POST',
    headers: {
      Accept: '*/*',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-Country': 'SG',
      'Content-Type': 'application/json; charset=UTF-8',
      Host: 'dmqavo3qek.execute-api.us-east-2.amazonaws.com',
      'User-Agent': 'Atlassian HttpClient unknown / JIRA-1001.0.0-SNAPSHOT (100099) / Default',
      Via: '1.1 localhost (Apache-HttpClient/4.4.1 (cache)), 1.1 aa0f507eb11fe6a0d0b6bc93ffd294fb.cloudfront.net (CloudFront)',
      'X-Amz-Cf-Id': 'lPANLJudJkvQB2RkcM2gaIg6MQjgkazY3ZNJBW8ThFQC6X086y4M8A==',
      'X-Amzn-Trace-Id': 'Root=1-5c9a4402-46d4f8767814e4b6b11af650',
      'X-Forwarded-For': '18.136.214.100, 70.132.3.100',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
      Accept: ['*/*'],
      'CloudFront-Forwarded-Proto': ['https'],
      'CloudFront-Is-Desktop-Viewer': ['true'],
      'CloudFront-Is-Mobile-Viewer': ['false'],
      'CloudFront-Is-SmartTV-Viewer': ['false'],
      'CloudFront-Is-Tablet-Viewer': ['false'],
      'CloudFront-Viewer-Country': ['SG'],
      'Content-Type': ['application/json; charset=UTF-8'],
      Host: ['dmqavo3qek.execute-api.us-east-2.amazonaws.com'],
      'User-Agent': ['Atlassian HttpClient unknown / JIRA-1001.0.0-SNAPSHOT (100099) / Default'],
      Via: ['1.1 localhost (Apache-HttpClient/4.4.1 (cache)), 1.1 aa0f507eb11fe6a0d0b6bc93ffd294fb.cloudfront.net (CloudFront)'],
      'X-Amz-Cf-Id': ['lPANLJudJkvQB2RkcM2gaIg6MQjgkazY3ZNJBW8ThFQC6X086y4M8A=='],
      'X-Amzn-Trace-Id': ['Root=1-5c9a4402-46d4f8767814e4b6b11af650'],
      'X-Forwarded-For': ['18.136.214.100, 70.132.3.100'],
      'X-Forwarded-Port': ['443'],
      'X-Forwarded-Proto': ['https']
    },
    queryStringParameters: {
      user_id: 'admin',
      user_key: 'admin'
    },
    multiValueQueryStringParameters: {
      user_id: ['admin'],
      user_key: ['admin']
    },
    pathParameters: {
      proxy: 'TP-1'
    },
    stageVariables: null,
    requestContext: {
      resourceId: 'ufpv7c',
      resourcePath: '/{proxy+}',
      httpMethod: 'POST',
      extendedRequestId: 'XJ-QWGoviYcFtPg=',
      requestTime: '26/Mar/2019:15:23:46 +0000',
      path: '/dev/TP-1',
      accountId: '368886022624',
      protocol: 'HTTP/1.1',
      stage: 'dev',
      domainPrefix: 'dmqavo3qek',
      requestTimeEpoch: 1553613826277,
      requestId: '25d6b1c1-4fdb-11e9-9349-9be8e5ef32d5',
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '18.136.214.100',
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent: 'Atlassian HttpClient unknown / JIRA-1001.0.0-SNAPSHOT (100099) / Default',
        user: null
      },
      domainName: 'dmqavo3qek.execute-api.us-east-2.amazonaws.com',
      apiId: 'dmqavo3qek'
    },
    body: '{"transition":{"workflowId":10000,"workflowName":"Software Simplified Workflow for Project TP","transitionId":51,"transitionName":"Run Test","from_status":"In Progress","to_status":"In Progress"},"comment":"","user":{"self":"https://itap-staging.atlassian.net/rest/api/2/user?accountId=557058%3Af0a5a110-4da2-4a0d-a2ad-358eec0fa7c8","name":"admin","key":"admin","accountId":"557058:f0a5a110-4da2-4a0d-a2ad-358eec0fa7c8","emailAddress":"kiet@kietnh.com","avatarUrls":{"48x48":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue","24x24":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue","16x16":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue","32x32":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"},"displayName":"Kiet Ngo","active":true,"timeZone":"Asia/Bangkok"},"issue":{"id":"10000","self":"https://itap-staging.atlassian.net/rest/api/2/issue/10000","key":"TP-1","fields":{"issuetype":{"self":"https://itap-staging.atlassian.net/rest/api/2/issuetype/10005","id":"10005","description":"A problem which impairs or prevents the functions of the product.","iconUrl":"https://itap-staging.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype","name":"Bug","subtask":false,"avatarId":10303},"timespent":null,"project":{"self":"https://itap-staging.atlassian.net/rest/api/2/project/10000","id":"10000","key":"TP","name":"Test Project","projectTypeKey":"software","avatarUrls":{"48x48":"https://itap-staging.atlassian.net/secure/projectavatar?avatarId=10324","24x24":"https://itap-staging.atlassian.net/secure/projectavatar?size=small&avatarId=10324","16x16":"https://itap-staging.atlassian.net/secure/projectavatar?size=xsmall&avatarId=10324","32x32":"https://itap-staging.atlassian.net/secure/projectavatar?size=medium&avatarId=10324"}},"fixVersions":[],"aggregatetimespent":null,"resolution":null,"customfield_10027":"http://prod.at.andover.server.ds.its-ipaas.com:8000/ClientModuleSuites.QuotePolicyModuleSuites.CustomerModuleWithoutErrorsSuite?responder=test&format=html","resolutiondate":null,"workratio":-1,"lastViewed":"2019-03-26T22:23:45.427+0700","watches":{"self":"https://itap-staging.atlassian.net/rest/api/2/issue/TP-1/watchers","watchCount":1,"isWatching":true},"created":"2019-03-22T22:53:48.435+0700","customfield_10020":null,"customfield_10021":null,"customfield_10022":"0|hzzzzz:","priority":{"self":"https://itap-staging.atlassian.net/rest/api/2/priority/3","iconUrl":"https://itap-staging.atlassian.net/images/icons/priorities/medium.svg","name":"Medium","id":"3"},"customfield_10026":null,"labels":[],"customfield_10016":null,"customfield_10017":null,"customfield_10018":{"hasEpicLinkFieldDependency":false,"showField":false,"nonEditableReason":{"reason":"PLUGIN_LICENSE_ERROR","message":"Portfolio for Jira must be licensed for the Parent Link to be available."}},"customfield_10019":null,"timeestimate":null,"aggregatetimeoriginalestimate":null,"versions":[],"issuelinks":[{"id":"10000","self":"https://itap-staging.atlassian.net/rest/api/2/issueLink/10000","type":{"id":"10000","name":"Blocks","inward":"is blocked by","outward":"blocks","self":"https://itap-staging.atlassian.net/rest/api/2/issueLinkType/10000"},"outwardIssue":{"id":"10001","key":"TP-2","self":"https://itap-staging.atlassian.net/rest/api/2/issue/10001","fields":{"summary":"Issue Con","status":{"self":"https://itap-staging.atlassian.net/rest/api/2/status/10001","description":"","iconUrl":"https://itap-staging.atlassian.net/","name":"To Do","id":"10001","statusCategory":{"self":"https://itap-staging.atlassian.net/rest/api/2/statuscategory/2","id":2,"key":"new","colorName":"blue-gray","name":"To Do"}},"priority":{"self":"https://itap-staging.atlassian.net/rest/api/2/priority/3","iconUrl":"https://itap-staging.atlassian.net/images/icons/priorities/medium.svg","name":"Medium","id":"3"},"issuetype":{"self":"https://itap-staging.atlassian.net/rest/api/2/issuetype/10005","id":"10005","description":"A problem which impairs or prevents the functions of the product.","iconUrl":"https://itap-staging.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype","name":"Bug","subtask":false,"avatarId":10303}}}}],"assignee":null,"updated":"2019-03-26T22:19:47.729+0700","status":{"self":"https://itap-staging.atlassian.net/rest/api/2/status/3","description":"This issue is being actively worked on at the moment by the assignee.","iconUrl":"https://itap-staging.atlassian.net/images/icons/statuses/inprogress.png","name":"In Progress","id":"3","statusCategory":{"self":"https://itap-staging.atlassian.net/rest/api/2/statuscategory/4","id":4,"key":"indeterminate","colorName":"yellow","name":"In Progress"}},"components":[],"timeoriginalestimate":null,"description":"Issue Cha","customfield_10010":null,"customfield_10014":null,"customfield_10015":null,"timetracking":{},"customfield_10005":null,"customfield_10006":null,"security":null,"customfield_10007":null,"customfield_10008":null,"customfield_10009":null,"attachment":[],"aggregatetimeestimate":null,"summary":"Issue Cha","creator":{"self":"https://itap-staging.atlassian.net/rest/api/2/user?accountId=557058%3Af0a5a110-4da2-4a0d-a2ad-358eec0fa7c8","name":"admin","key":"admin","accountId":"557058:f0a5a110-4da2-4a0d-a2ad-358eec0fa7c8","emailAddress":"kiet@kietnh.com","avatarUrls":{"48x48":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue","24x24":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue","16x16":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue","32x32":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"},"displayName":"Kiet Ngo","active":true,"timeZone":"Asia/Bangkok"},"subtasks":[],"reporter":{"self":"https://itap-staging.atlassian.net/rest/api/2/user?accountId=557058%3Af0a5a110-4da2-4a0d-a2ad-358eec0fa7c8","name":"admin","key":"admin","accountId":"557058:f0a5a110-4da2-4a0d-a2ad-358eec0fa7c8","emailAddress":"kiet@kietnh.com","avatarUrls":{"48x48":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue","24x24":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue","16x16":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue","32x32":"https://avatar-cdn.atlassian.com/23798348081369dc745036cf60c0d6ae?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F23798348081369dc745036cf60c0d6ae%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"},"displayName":"Kiet Ngo","active":true,"timeZone":"Asia/Bangkok"},"customfield_10000":"{}","aggregateprogress":{"progress":0,"total":0},"customfield_10001":null,"customfield_10002":null,"customfield_10003":null,"customfield_10004":null,"environment":null,"duedate":null,"progress":{"progress":0,"total":0},"comment":{"comments":[],"maxResults":0,"total":0,"startAt":0},"votes":{"self":"https://itap-staging.atlassian.net/rest/api/2/issue/TP-1/votes","votes":0,"hasVoted":false},"worklog":{"startAt":0,"maxResults":20,"total":0,"worklogs":[]}}},"timestamp":1553613825436}',
    isBase64Encoded: false
  }
}