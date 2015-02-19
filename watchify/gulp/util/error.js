
/**
 * gulp タスクでエラーが発生した時、通知を表示して処理を続行します。
 * ストリームの 'error' イベントに関数を指定してください。
 */
module.exports = function() {
    var notify = require( 'gulp-notify' );
    var args   = Array.prototype.slice.call( arguments );

    notify
        .onError( {
            title: 'Task Error',
            message: "<%= error %>"
        } )
        .apply( this, args );

    // タスク維持
    this.emit( 'end' );
};