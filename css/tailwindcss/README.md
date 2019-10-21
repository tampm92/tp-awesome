# Tailwindcss

> A utility-first CSS framework for
rapidly building custom designs.

## Preparing

1. [Node JS](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/lang/en/)
3. [live-server](https://github.com/tapio/live-server)

## Stater

- Document [here](https://tailwindcss.com/docs/installation/)
- Tutorial [here](https://tailwindcss.com/course/setting-up-tailwind-and-postcss/)
- Source code tutotial [here](https://github.com/tailwindcss/designing-with-tailwindcss)

1. Go to folder project

2. Run command

```bash
yarn init -y
yarn add tailwindcss postcss-cli autoprefixer
npx tailwind init
```

3. Creat a file `postcss.config.js` with content

```js
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
    ]
}
```

4. Creat a file `css/tailwind.css` with content

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Add script code in package.json

```json
"scripts": {
    "build": "postcss css/tailwind.css -o public/build/tailwind.css"
}
```

6. Run

```bash
yarn build
```

> It will generate a file `public/build/tailwind.css`

7. Create a new file `public/index.html` with content

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/build/tailwind.css">
</head>
<body>
    <h1 class="text-4xl font-bold text-center text-blue-500">Hello world!</h1>
</body>
</html>
```

8. Watching by `live-server`

```bash
live-server public
```
