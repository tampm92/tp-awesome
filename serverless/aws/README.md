# Quick Start

1. Install everything we need

```bash
mkdir serverless-app
cd serverless-app
npm init -y

npm install serverless serverless-offline serverless-webpack webpack webpack-node-externals babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-object-rest-spread --save-dev
```

2. Configuration files

- ./serverless.yml — a configuration file for our lambda

```bash
# enable required plugins, in order to make what we want
plugins:
  - serverless-webpack
  - serverless-offline

custom:
  webpack:
    webpackConfig: 'webpack.config.js' # name of webpack configuration file
    includeModules: true # add excluded modules to the bundle
    packager: 'npm' # package manager we use
```

- ./webpack.config.js — a webpack config file. You may customize the file in any way you like, but please pay attention to:

```bash
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    // pay attention to this
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // ... and this
              presets: [['@babel/env', { targets: { node: '8.10' } }]],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
              ]
            },
          },
        ],
      },
    ],
  },
};
```
