/**
 * Output log.
 *
 * @param {String} message Message text.
 */
export function func( message ) {
  console.log( message );
}

/**
 * Output log.
 *
 * @param {String} message Message text.
 */
export const func2 = ( message ) => {
  console.log( message );
};

/**
 * Sample object.
 * @type {Object}
 */
export const SampleObj = {
  /**
   * Output log.
   *
   * @param {String} message Message text.
   */
  func: function( message ) {
    console.log( message );
  },

  /**
   * Output log.
   *
   * @param {String} message Message text.
   */
  func2: ( message ) => {
    console.log( message );
  }
};

/**
 * Sample class.
 */
export default class Sample {
  /**
   * Initialize instance.
   *
   * @param {String} message Message text.
   */
  constructor( message ) {
    this._message = message;
  }

  /**
   * Get the message.
   *
   * @return {String} Message text.
   */
  get message() {
    return this._message;
  }

  /**
   * Set the message.
   *
   * @param {String} value Text value.
   */
  set message( value ) {
    this._message = value;
  }

  /**
   * Output log.
   *
   * @param {String} message Message text.
   */
  static logStrStatic( message ) {
    console.log( message );
  }

  /**
   * Output log.
   *
   * @param {String} message Message text.
   */
  logStr( message ) {
    console.log( message );
  }

  /**
   * Output log.
   *
   * @param {Number} num Number.
   */
  logNumber( num ) {
    console.log( num );
  }

  /**
   * Output log.
   *
   * @param {Object} obj Object.
   */
  logObject( obj ) {
    console.log( obj );
  }

  /**
   * Output log.
   *
   * @param {Array} arr Array.
   */
  logArray( arr ) {
    console.log( arr );
  }

  /**
   * Output log.
   *
   * @param {Function} f Function.
   */
  logFunction( f ) {
    console.log( f );
  }

  /**
   * Output the name in the log..
   *
   * @param {Sample2} sample2 Instance of Sample2.
   */
  logClass( sample2 ) {
    if( sample2 ) {
      console.log( sample2.name );
    }
  }
}
