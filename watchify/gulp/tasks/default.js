var gulp   = require( 'gulp' );
var config = require( '../config' ).default;

/**
 * gulp の既定タスクです。
 */
gulp.task( 'default', config.depends );
