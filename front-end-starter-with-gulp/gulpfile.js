var gulp = require( 'gulp' );
var $    = require( 'gulp-load-plugins' )();

// Common config
var config = {
  src:        './src',
  dest:       './dist',
  isWatchify: false,
  isRelease:  false
};

////////////////////////////////////////////////////////////////////////////////
// Transpiler
////////////////////////////////////////////////////////////////////////////////

// JavaScript ( ES6, React JSX )
gulp.task( 'js', $.watchify( function( watchify ) {
  var buffer    = require( 'vinyl-buffer' );
  var formatter = require( 'pretty-hrtime' );
  var time      = process.hrtime();

  return gulp.src( [ config.src + '/js/App.js' ] )
    .pipe( $.plumber() )
    .pipe( watchify( {
      watch: config.isWatchify,
      basedir:   './',
      debug:     true,
      transform: [ 'babelify' ]
    } ) )
    .pipe( buffer() )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.init( { loadMaps: true } ) ) )
    .pipe( $.if( config.isRelease, $.uglify() ) )
    .pipe( $.rename( 'bundle.js' ) )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.write( './' ) ) )
    .pipe( $.if( config.isRelease, gulp.dest( config.dest ), gulp.dest( config.src ) ) )
    .on( 'end', function() {
      var taskTime = formatter( process.hrtime( time ) );
      $.util.log( 'Bundled', $.util.colors.green( 'bundle.js' ), 'in', $.util.colors.magenta( taskTime ) );
    } );
} ) );

// CSS ( Stylus )
gulp.task( 'css', function() {
  return gulp.src( [ config.src + '/stylus/App.styl' ] )
    .pipe( $.plumber() )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.init() ) )
    .pipe( $.stylus() )
    .pipe( $.rename( 'bundle.css' ) )
    .pipe( $.if( config.isRelease, $.minifyCss() ) )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.write( '.' ) ) )
    .pipe( $.if( config.isRelease, gulp.dest( config.dest ), gulp.dest( config.src ) ) );
} );

////////////////////////////////////////////////////////////////////////////////
// Watch
////////////////////////////////////////////////////////////////////////////////

// Enable wachify
gulp.task( 'watch:js', function( done ) {
  config.isWatchify = true;
  done();
} );

// Local web server
gulp.task( 'server', function() {
  var browser = require( 'browser-sync' ).create();
  browser.init( {
    server: {
      baseDir: config.src
    }
  } );
} );

// Watch files
gulp.task( 'watch', [ 'watch:js', 'js', 'css', 'server' ], function () {
  gulp.watch( [ config.src + '/stylus/**/*.styl' ], [ 'css' ] );
} );

// Default task
gulp.task( 'default', [ 'watch' ] );

////////////////////////////////////////////////////////////////////////////////
// Release
////////////////////////////////////////////////////////////////////////////////

// Clean release image
gulp.task( 'release:clean', function( done ) {
  var del = require( 'del' );
  del( config.dest, done );
} );

// Create release directory & copy files
gulp.task( 'release:copy', function() {
  var src = [
    config.src + '/*.html',
    config.src + '/fonts/**'
  ];

  return gulp.src( src, { base: config.src } )
    .pipe( gulp.dest( config.dest ) );
} );

// Release config
gulp.task( 'release:config', function( done ) {
  config.isRelease = true;
  done();
} );

// Build release image
gulp.task( 'release', function( done ) {
  var runSequence = require( 'run-sequence' );
  return runSequence(
    'release:clean',
    'release:copy',
    'release:config',
    [ 'js', 'css' ],
    done
  );
} );
