# NODE JS
---
## I. Tạo project
> Chắc chắn rằng bạn đã cài đặt [NodeJs](https://nodejs.org/en/)

### 1. Tạo thư mục và init npm
- Mở CommanLine đến đường dẫn thư mục bạn muốn tạo project.
- Nhập lệnh: npm init và nhập các thông tin cần thiết

### 2. Cài đặt
#### a. Cần thiết   
- Cài đặt [ExpressJs](http://expressjs.com/): npm install express --save
- Cài đặt [CORE](https://github.com/expressjs/cors): npm install cors --save
- Cài đặt [body-parser](https://github.com/expressjs/body-parser): npm install body-parser --save
- Cài đặt [lodash](https://github.com/lodash/lodash/): npm install lodash --save

#### b. Debug
- Cài đặt [morgan](https://github.com/expressjs/morgan): npm install morgan --save

#### c. Database
- Cài đặt [sequelize](http://docs.sequelizejs.com/en/latest/) (ORM database): npm install sequelize --save

#### d. Authentication
- Cài đặt [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): npm install jsonwebtoken --save

#### e. View

#### d. More
- Validate: Cài đặt [validate](https://github.com/chriso/validator.js/): npm install validator --save
- Validate: Cài đặt [express-validator](https://github.com/ctavan/express-validator): npm install express-validator --save
- Async: Cài đặt [async](https://github.com/caolan/async): npm install async --save
- Job: Cài đặt [kue](https://github.com/Automattic/kue): npm install kue --save
- Job: Cài đặt [cron](https://github.com/ncb000gt/node-cron): npm install cron --save
>> node-cron is a very simple library, which provide very basic and easy to understand api like crontab. It doesn't need any config and just works.
- Job: Cài đặt [agenda](https://github.com/rschmukler/agenda): npm install agenda --save
>> agenda is very powerful and fit for much more complex services. Think about ifttt, you have to run millions of tasks. agenda would be the best choice.
>> Note: You need Mongodb to use Agenda
---

- Tạo file và thư mục theo cây sau:
> Thư mục project:
> 
	| app
	| --- app.js
	| node_modules
	| config.js
	| package.json
	| server.js