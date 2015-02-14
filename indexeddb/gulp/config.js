var src  = './src';
var dist = './dist';

/**
 * gulp タスクから参照される設定です。
 * @type {Object}
 */
module.exports = {
    build: {
        depends: [ 'js', 'css' ]
    },
    release: {
        depends: [ 'copy', 'useref' ]
    },
    copy: {
        depends: [ 'build', 'clean' ],
        src:     [ './src/fonts/**', './src/js/app.js' ],
        dest:    './dist',
        base:    './src'
    },
    css: {
        src:  './src/stylus/*.styl',
        dest: './src/css'
    },
    js: {
        src:       './src/js/main.js',
        dest:      './src/js',
        file:      'app.js',
        debug:     true,
        transform: [ 'reactify', 'debowerify' ]
    },
    useref: {
        src:  './src/*.html',
        dest: './dist'
    },
    watch: {
        depends: [ 'build', 'connect' ],
        js: {
            src:  [ './src/js/**/*.js', './src/js/**/*.jsx', '!./src/js/app.js' ],
            task: [ 'js'  ]
        } ,
        css: {
            src:  [ './src/stylus/*.styl', '!./src/css/*.css' ],
            task: [ 'css' ]
        }
    },
    default: {
        depends: [ 'watch' ]
    }
};