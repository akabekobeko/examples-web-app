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
        depends: [ 'js-release', 'css', 'clean' ],
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
     * この設定は js、js-release、watchify で共有されます。
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
     * ローカル HTTP サーバー起動。
     * プロジェクトのルートを起点とします。
     * @type {Object}
     */
    connect: {
        root: require( 'path' ).join( __dirname, '../' ),
        port: 8080
    },

    /**
     * ソース変更監視 & 開発用ビルド。
     * JavaScript 監視は watchify が担当するため、これを依存タスクとして実行しておきます。
     * @type {Object}
     */
    watch: {
        depends: [ 'css', 'watchify', 'connect' ],
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