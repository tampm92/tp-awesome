const jiraHttp = require('./jira-http');
const logger = require('../../utils/logger');

/**
 * @param {*} data // see more below Full Example
 */
async function create(data) {
  try {
    let options = {
      url: 'issue',
      data: data
    };
    const response = await jiraHttp.post(options);
    return response;
  } catch (error) {
    logger.error(error);
    return;
  }
}

/**
 * Models
 */

function IssueLinkModel() {
  return {
    "add": {
      "type": {
        "name": ""
      },
      "inwardIssue": {
        "key": "KEY-ISSUE"
      }
    }
  }
}

function IssueDescriptionContentModel() {
  return {
    "type": "paragraph",
    "content": []
  }
}

function IssueParagraphContentModel() {
  return {
    "text": "",
    "type": "text"
  }
}

function IssueTableRowContentModel() {
  return {
    "type": "tableRow",
    "content": []
  }
}

function IssueTableHeaderContentModel() {
  return {
    "type": "tableHeader",
    "attrs": {},
    "content": [{
      "type": "paragraph",
      "content": [{
        "type": "text",
        "text": ""
      }]
    }]
  }
}

function IssueTableCellContentModel() {
  return {
    "type": "tableCell",
    "attrs": {},
    "content": [{
      "type": "paragraph",
      "content": [{
        "type": "text",
        "text": ""
      }]
    }]
  }
}

function IssueModel() {
  return {
    "update": {
      "issuelinks": []
    },
    "fields": {
      "summary": "Summary",
      "issuetype": {
        "name": ""
      },
      "project": {
        "key": "KEY-PROJECT"
      },
      "description": {
        "type": "doc",
        "version": 1,
        "content": []
      },
      "priority": {
        "name": "Medium"
      }
    }
  }
}

module.exports = {
  create,
  IssueLinkModel,
  IssueModel,
  IssueDescriptionContentModel,
  IssueParagraphContentModel,
  IssueTableRowContentModel,
  IssueTableHeaderContentModel,
  IssueTableCellContentModel
}

/**
 * Full Example
curl --request POST \
  --url '/rest/api/3/issue' \
  --header 'Authorization: Bearer <access_token>' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "update": {},
  "fields": {
    "summary": "something's wrong",
    "issuetype": {
      "id": "10000"
    },
    "components": [
      {
        "id": "10000"
      }
    ],
    "customfield_20000": "06/Jul/19 3:25 PM",
    "customfield_40000": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "this is a text field",
              "type": "text"
            }
          ]
        }
      ]
    },
    "customfield_70000": [
      "jira-administrators",
      "jira-software-users"
    ],
    "project": {
      "id": "10000"
    },
    "description": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "description",
              "type": "text"
            }
          ]
        }
      ]
    },
    "reporter": {
      "id": "99:e2a16dd9-2ffb-4a4b-a9bd-bd1145a020ee"
    },
    "fixVersions": [
      {
        "id": "10001"
      }
    ],
    "customfield_10000": "09/Jun/19",
    "priority": {
      "id": "20000"
    },
    "labels": [
      "bugfix",
      "blitz_test"
    ],
    "timetracking": {
      "remainingEstimate": "5",
      "originalEstimate": "10"
    },
    "customfield_30000": [
      "10000",
      "10002"
    ],
    "customfield_80000": {
      "value": "red"
    },
    "security": {
      "id": "10000"
    },
    "environment": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "environment",
              "type": "text"
            }
          ]
        }
      ]
    },
    "versions": [
      {
        "id": "10000"
      }
    ],
    "duedate": "2019-05-11T00:00:00.000Z",
    "customfield_60000": "jira-software-users",
    "customfield_50000": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "this is a text area. big text.",
              "type": "text"
            }
          ]
        }
      ]
    },
    "assignee": {
      "id": "e5:e1a16c14-1fe0-1c93-a2b1-ac4493ace0f1"
    }
  }
}
*/