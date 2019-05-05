1. Install everything we need

```bash
npm install website-scraper --save
```

2. TIP
[scraper](https://github.com/website-scraper/node-website-scraper)

```
Note: Download website to local directory (including all css, images, js, etc.)
```

Also we can't deploy `puppeteer full` to aws lambda
We will use `puppeteer-core chrome-aws-lambda` to instead

3. Use

```
const scrape = require('website-scraper');
const options = {
  urls: ['http://nodejs.org/'],
  directory: '/path/to/save/',
};

// with async/await
const result = await scrape(options);
```