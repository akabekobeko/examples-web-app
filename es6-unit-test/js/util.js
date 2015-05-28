
/**
 * ユーテリティ メソッドを提供します。
 */
class Util {
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
    if( !( typeof a === 'number' && typeof b === 'number' ) ) {
      throw new Error( 'Invalid argument type of not Number.' );
    }

    return ( a + b );
  }
}

// Singleton
export default new Util();
