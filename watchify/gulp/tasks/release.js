var gulp   = require( 'gulp' );
var config = require( '../config.js' ).release;

/**
 * ブロジェクトのリリース用イメージを出力します。
 */
gulp.task( 'release', config.depends );
