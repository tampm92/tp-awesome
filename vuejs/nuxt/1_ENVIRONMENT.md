# Cross platform setting of environment

- Install lib:

```bash
yarn add cross-env
```

- Add script in file `package.json`

```bash
"scripts": {
    "dev": "nuxt",
    "build": "cross-env NODE_ENV=production nuxt build",
    "start": "cross-env NODE_ENV=production nuxt start",
    "generate": "cross-env NODE_ENV=production nuxt generate"
},
```

- Default NODE_ENV = development
