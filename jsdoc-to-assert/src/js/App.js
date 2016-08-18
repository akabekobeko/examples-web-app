import Sample from './Sample.js';
import { func, func2 } from './Sample.js';
import Sample2 from './Sample2.js';

/**
 * Entry point of the application.
 */
window.onload = () => {
  func( 'Normar function' );
  func( 300 );

  func2( 'Arrow function' );
  func2( 200 );

  let sample = new Sample( 100 );
  sample = new Sample( 'ES2015 class' );
  Sample.logStrStatic( sample.message );
  sample.logStr( sample.message );
  sample.logStr( {} );
  sample.logStr( [] );
  sample.logNumber( 1024 );
  sample.logNumber( 'Not number' );
  sample.logObject( { type: 'Object' } );
  sample.logObject( 'Not object' );
  sample.logArray( [ 3, 8 ] );
  sample.logArray( 'Not array' );
  sample.logFunction( func );
  sample.logFunction( 'Not function' );

  const value = new Sample2();
  sample.logClass( value );
  sample.logClass( 'Value' );
};
