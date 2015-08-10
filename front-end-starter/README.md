# Web Front-end Starter Kit

This is a starter kit of the Web front-end development.

## Installation

1. Install [Node.js](https://nodejs.org/)
2. `cd PROJECTDIR`
3. `npm install`

## Development

### Watch

Runt the watch files, background complie ( JavaScript/CSS ) and launch the web server.

```bash
npm start
```

If you want to operate with Windows will fix the **watch:js** of npm-scripts as follows.

```js
{
  "watch:js": "watchify -v -t babelify ./src/js/App.js -o ./src/bundle.js -d"
}
```

### Unit test

Run the ES6 code of unit tests by mocha.

```bash
npm test
```

## Code document

Run the code document generation.

```bash
npm run esdoc
```

### Release build

Build the app for production.

```bash
npm run release
```

## License

[MIT](LICENSE)