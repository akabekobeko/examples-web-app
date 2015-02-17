/**
 * gulp タスクから参照される設定です。
 * @type {Object}
 */
module.exports = {
    /**
     * 開発用ビルド。
     * @type {Object}
     */
    build: {
        depends: [ 'js', 'css' ]
    },

    /**
     * リリース用ビルド。
     * @type {Object}
     */
    release: {
        depends: [ 'copy', 'useref' ]
    },

    /**
     * リリース用ディレクトリの削除。
     * @type {Object}
     */
    clean: {
        dist: './dist'
    },

    /**
     * リリース用リソースのコピー。
     * @type {Object}
     */
    copy: {
        depends: [ 'build', 'clean' ],
        src:     [ './src/fonts/**', './src/js/bundle.js' ],
        dest:    './dist',
        base:    './src'
    },

    /**
     * CSS ビルド。
     * @type {Object}
     */
    css: {
        src:  './src/stylus/*.styl',
        dest: './src/css'
    },

    /**
     * JavaScript ビルド。
     * @type {Object}
     */
    js: {
        src:       './src/js/app.js',
        dest:      './src/js',
        bundle:    'bundle.js',
        browserify: {
            debug:     true,
            transform: [ 'reactify', 'debowerify' ]
        }
    },

    /**
     * リリース用 HTML リソース参照解決。
     * @type {Object}
     */
    useref: {
        src:  './src/*.html',
        dest: './dist'
    },

    /**
     * ソース変更監視 & 開発用ビルド。
     * @type {Object}
     */
    watch: {
        depends: [ 'build', 'connect' ],
        js: {
            src:  [ './src/js/**/*.js', './src/js/**/*.jsx', '!./src/js/bundle.js' ],
            task: [ 'js'  ]
        } ,
        css: {
            src:  [ './src/stylus/*.styl', '!./src/css/*.css' ],
            task: [ 'css' ]
        }
    },

    /**
     * 既定タスク。
     * @type {Object}
     */
    default: {
        depends: [ 'watch' ]
    }
};