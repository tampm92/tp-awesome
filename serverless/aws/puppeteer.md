1. Install everything we need

```bash
# for dev
npm install puppeteer --save

# for deploy to aws function
npm install puppeteer-core chrome-aws-lambda --save
```

2. TIP
[puppeteer](https://github.com/GoogleChrome/puppeteer)
[chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)

```
Note: When you install Puppeteer, it downloads a recent version of Chromium (~170MB Mac, ~282MB Linux, ~280MB Win) that is guaranteed to work with the API.
```

Also we can't deploy `puppeteer full` to aws lambda
We will use `puppeteer-core chrome-aws-lambda` to instead

3. Code to dev and deploy to aws

```
function isRunOnAws() {
    return process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined || process.env.FUNCTION_NAME !== undefined;
}

let chrome = null;
let puppeteer = null;
if (util.isRunOnAws) {
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer')
}

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
```