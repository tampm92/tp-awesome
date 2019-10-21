# Setup project Typescript with Visual Studio Code
---
> *Hướng dẫn được thực hiện trên MAC OS*

I. Cài đặt công cụ

1. [Visual Studio Code](https://code.visualstudio.com/)
2. [Node Js](https://github.com/pmatam/nodejs)
3. [Typescript](https://github.com/pmatam/typescript)

II. Thiết lập project

1. Mở Terminal commands (command line).
2. Trỏ đến thư mục của project.
3. Gõ lệnh: npm init và nhập các thông tin cần thiết
- Lệnh trên sẽ tạo file package.json: là file config các thư việc được sử dụng.
Dùng lệnh: 
```
- npm install <tên package> --save : để cài đặt package
- npm install <tên package> --save-dev : để cài đặt package với chức năng dev
```
4. Dùng lệnh:
``` 
- tsd install <tên package> --save : để cài đặt package
- tsd install <tên package> --save-dev : để cài đặt package với chức năng dev
```

> **Lưu ý cho phần 3 và 4**
```
Với mỗi package install bằng npm, bạn cần run một lần nữa với tsd.
Vì các package hiện tại là javascript cần được chuyển sang typescript.
```

5. Tạo file tsconfig.json
- Là file config: để build, để chuyển từ typescript sang javascript.
- Các config:
```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "commonjs",
        "noEmitOnError": true,
        "noImplicitAny": true,
        "experimentalDecorators": true,
        "rootDir": "./",
        "sourceMap": true,
        "outDir": "build"
    },
    "exclude": [
        "build",
        "node_modules"
    ]
}
``` 

III. Bắt đầu những dòng code nào ;)

1. Tạo file index.js
```js
"use strict";

//--------------------
//include packages
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var expressValidator = require('express-validator');

var app = express();
var port = process.env.PORT || 3000;

//--------------------
//config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));

//--------------------
//include router
app.get('/', function (req, res) {
    res.send('Server Ok');
});

//--------------------
// start the server
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
```
> Lưu ý: để sử dụng được code trên bạn cần cài đặt thêm các package cần thiết.

IV. Cùng build nào :)

> Sau khi build chúng ta sẽ có code được chuyển từ typescript sang javascript trong thư mục build (được config trong file tsconfig.json)

1. Dùng VS Code:
- Nhấn tổ hợp: `Cmd+Shift+B`
- Chọn `Configure Task Runner`
- Chọn `TypeScript - Watch Mode`
- Bây giờ bạn đã có config cho phần build trong file `tasks.json` vừa mới được tạo.
- Nhấn `Cmd+Shift+B` (và từ giờ chỉ cần nhấn là xong, vì đã config rồi).

V. Debug với VS Code

> Lúc này bạn đã có extension để debug (đã cài ở phần I).
- Chọn mục Debug trên thanh công cụ bên trái.
- Nhấn vào bánh răng (cài đặt) để tạo file `launch.json`, chọn loại là `Node`.
- Thay đổi một số config để có thể debug nhé :).

*với các setup hiện tại, bạn có thể sử dụng phần sau để debug*
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/index.js",
            "stopOnEntry": false,
            "args": [],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": null,
            "runtimeExecutable": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "development"
            },
            "externalConsole": false,
            "sourceMaps": true,
            "outDir": "${workspaceRoot}/build"
        },
        {
            "name": "Attach",
            "type": "node",
            "request": "attach",
            "port": 5858,
            "address": "localhost",
            "restart": false,
            "sourceMaps": false,
            "outDir": null,
            "localRoot": "${workspaceRoot}",
            "remoteRoot": null
        }
    ]
}
```