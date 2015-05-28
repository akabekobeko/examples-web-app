import Util from './util.js';

/**
 * サンプルです。
 */
export default class Sample {
  /**
   * ふたつの値を合計します。
   *
   * @param {Number} a 値 1。
   * @param {Number} b 値 2。
   *
   * @return {Number} 合計。
   *
   * @throws {Error} ふたつの値のいずれが Number ではありません。
   */
  sum( a, b ) {
    // ES6 modules を試すため、別クラスのメソッドを呼ぶ
    return Util.sum( a, b );
  }

  /**
   * 配列内に指定された値が存在することを調べます。
   *
   * @param {Array}  arr    配列。
   * @param {Object} target 値。
   *
   * @return {Boolean} 存在するなら true。
   */
  exists( arr, target ) {
    if( !( arr && 0 < arr.length && arr.indexOf ) ) { return false; }

    return ( arr.indexOf( target ) !== -1 );
  }
}

/**
 * 値を整数にします。
 *
 * @param {Number} value 値。
 *
 * @return {Number} 整数化された値。
 */
export function Floor( value ) {
  return Math.floor( value );
}
