import assert from 'assert';
import Sample from '../src/js/Sample.js';
import Sample2 from '../src/js/Sample2.js';
import { func, func2, SampleObj } from '../src/js/Sample.js';

describe( 'Valid', () => {
  /** @test {Sample} */
  describe( 'Sample', () => {
    /** @test {Sample#constructor} */
    it( 'constructor', () => {
      const sample = new Sample( 'message' );
      assert( sample.message === 'message' );
    } );

    /** @test {Sample#message} */
    it( 'set message', () => {
      const sample = new Sample( 'message' );
      sample.message = 'a';
    } );

    /** @test {Sample#logStrStatic} */
    it( 'logStrStatic', () => {
      Sample.logStrStatic( 'message' );
    } );

    /** @test {Sample#logStr} */
    it( 'logStr', () => {
      const sample = new Sample( 'message' );
      sample.logStr( 'a' );
    } );

    /** @test {Sample#logNumber} */
    it( 'logNumber', () => {
      const sample = new Sample( 'message' );
      sample.logNumber( 8 );
    } );

    /** @test {Sample#logObject} */
    it( 'logObject', () => {
      const sample = new Sample( 'message' );
      sample.logObject( {} );
    } );

    /** @test {Sample#logArray} */
    it( 'logArray', () => {
      const sample = new Sample( 'message' );
      sample.logArray( [] );
    } );

    /** @test {Sample#logFunction} */
    it( 'logFunction', () => {
      const sample = new Sample( 'message' );
      sample.logFunction( () => {} );
    } );

    /** @test {Sample#logClass} */
    it( 'logClass', () => {
      const sample = new Sample( 'message' );
      sample.logClass( new Sample2() );
    } );
  } );

  /** @test {SampleObj} */
  describe( 'SampleObj', () => {
    /** @test {SampleObj#func} */
    it( '', () => {
      SampleObj.func( 'message' );
    } );

    /** @test {SampleObj#func2} */
    it( '', () => {
      SampleObj.func2( 'message' );
    } );
  } );

  /** @test {func} */
  describe( 'func', () => {
    it( '', () => {
      func( 'message' );
    } );
  } );

  /** @test {func2} */
  describe( 'func2', () => {
    it( '', () => {
      func2( 'message' );
    } );
  } );
} );

describe( 'Invalid', () => {
  /** @test {Sample} */
  describe( 'Sample', () => {
    /** @test {Sample#constructor} */
    it( 'constructor', () => {
      const sample = new Sample( 7 );
      assert( sample.message === 'message' );
    } );

    /** @test {Sample#message} */
    it( 'set message', () => {
      const sample = new Sample( 'message' );
      sample.message = 5;
    } );

    /** @test {Sample#logStrStatic} */
    it( 'logStrStatic', () => {
      Sample.logStrStatic( 4 );
    } );

    /** @test {Sample#logStr} */
    it( 'logStr', () => {
      const sample = new Sample( 'message' );
      sample.logStr( 12 );
    } );

    /** @test {Sample#logNumber} */
    it( 'logNumber', () => {
      const sample = new Sample( 'message' );
      sample.logNumber( 'a' );
    } );

    /** @test {Sample#logObject} */
    it( 'logObject', () => {
      const sample = new Sample( 'message' );
      sample.logObject( 8 );
    } );

    /** @test {Sample#logArray} */
    it( 'logArray', () => {
      const sample = new Sample( 'message' );
      sample.logArray( 1 );
    } );

    /** @test {Sample#logFunction} */
    it( 'logFunction', () => {
      const sample = new Sample( 'message' );
      sample.logFunction( 5 );
    } );

    /** @test {Sample#logClass} */
    it( 'logClass', () => {
      const sample = new Sample( 'message' );
      sample.logClass( {} );
    } );
  } );

  /** @test {SampleObj} */
  describe( 'SampleObj', () => {
    /** @test {SampleObj#func} */
    it( '', () => {
      SampleObj.func( 21 );
    } );

    /** @test {SampleObj#func2} */
    it( '', () => {
      SampleObj.func2( 54 );
    } );
  } );

  /** @test {func} */
  describe( 'func', () => {
    it( '', () => {
      func( 8 );
    } );
  } );

  /** @test {func2} */
  describe( 'func2', () => {
    it( '', () => {
      func2( 9 );
    } );
  } );
} );
