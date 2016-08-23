# Using jsdoc-to-assert

Example for [azu/jsdoc-to-assert](https://github.com/azu/jsdoc-to-assert).

## Installation

1. Install [Node.js](https://nodejs.org/)
2. `cd PROJECTDIR`
3. `npm install`

## Type check

About `jsdoc-to-assert`.

> Convert JSDoc to `assert` that runtime assert.

Test to be type-checking as a function of the following in this Example.

### Normal function

```js
/**
 * @param {String} message Message text.
 */
function func( message ) {
}
```

### Arrow function (ES2015)

```js
/**
 * @param {String} message Message text.
 */
const func = ( message ) => {
};
```


### Object property

```js
const obj = {
  /**
   * @param {String} message Message text.
   */
  func: function message ) {
  }
};
```

### ES2015 Class

* Constructor
* Property Setter
* Method
* Static Method

```js
class Sample {
  /**
   * @param {String} message Message text.
   */
  constructor( message ) {
    this._message = message;
  }

  get message() {
    return this._message;
  }

  /**
   * @param {String} value Value.
   */
  set message( value ) {
    this._message = value;
  }

  /**
   * @param {String} message Message text.
   */
  func( message ) {
  }

  /**
   * @param {String} message Message text.
   */
  static func2( message ) {
  }

}
```

## Usage

### Watch build

Runt the watch files, background complie ( JavaScript/CSS ) and launch the web server.

```bash
npm start
```

Check the console at the develper tools of the Web browser. The success or failure of the type checking by `jsdoc-to-assert` has been **output**.

### Release build

Build the app for production.

```bash
npm run release
```
Type checking of the success or failure by `jsdoc-to-assert` the release version is **not output**.

### Unit test

Run the unit tests by [mocha](https://mochajs.org/).

```bash
npm test
```

## Code document

Run the code document generation by [ESDoc](https://esdoc.org/).

```bash
npm run esdoc
```

## License

[MIT](LICENSE)
