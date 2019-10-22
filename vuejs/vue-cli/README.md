# Vue CLI

> A utility-first CSS framework for
rapidly building custom designs.

## Preparing

1. [Node JS](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/lang/en/)

## Stater

- Tutorial [here](https://tailwindcss.com/course/setting-up-tailwind-and-postcss/)

1. Install Vue CLI global

```bash
yarn global add @vue/cli
```

1. Run command

- Using command line

```bash
vue create hello-world
cd hello-world
npm run serve
# OR
yarn serve
```

- Using the GUI

```bash
vue ui
```

## Plugin

- You can install and manage Plugins using the GUI with the vue ui command.
OR
- You can run command `vue add [plugin name]`

## Environment

> Document [here](https://cli.vuejs.org/guide/mode-and-env.html)

1. Modes

> Mode is an important concept in Vue CLI projects. By default, there are three modes:

- `development` is used by vue-cli-service serve
- `test` is used by vue-cli-service test:unit
- `production` is used by vue-cli-service build and vue-cli-service test:e2e

2. Environment Variables

- You can specify env variables by placing the following files in your project root:

```bash
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

> Note that only variables that start with VUE_APP_ will be statically embedded into the client bundle with webpack.DefinePlugin.

3. Example

- Assuming we have an app with the following .env file:

```bash
VUE_APP_TITLE=My App
```

- And the following .env.staging file:

```bash
NODE_ENV=production
VUE_APP_TITLE=My App (staging)
```

- vue-cli-service build builds a production app, loading .env, .env.production and .env.production.local if they are present;

- vue-cli-service build --mode staging builds a production app in staging mode, using .env, .env.staging and .env.staging.local if they are present.

- In both cases, the app is built as a production app because of the NODE_ENV, but in the staging version, process.env.VUE_APP_TITLE is overwritten with a different value.
