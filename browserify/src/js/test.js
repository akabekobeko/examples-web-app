
/**
 * メッセージ表示ボタンを生成します。
 *
 * @param {String} message メッセージ。
 *
 * @return {Object} ボタンとなる jQuery オブジェクト。
 */
module.exports = function( message ) {
    var $ = require( 'jquery' );

    return $( '<div>' )
        .addClass( 'button' )
        .text( 'Test' )
        .on( 'click', function() {
            alert( message );
        } );
};