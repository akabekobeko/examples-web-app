module.exports = function( grunt ) {
    var pkg = grunt.file.readJSON( 'package.json' );
 
    grunt.initConfig( {
        pkg: pkg,
        /**
         * ファイル、ディレクトリを削除します。
         * @type {Object}
         */
        clean: {
            build: [ '.tmp', 'dist' ],
            release: [ '.tmp' ]
        },
        /**
         * ファイル、ディレクトリをコピーします。
         * @type {Object}
         */
        copy: {
            html: {
                files: [ {
                    expand: true,
                    cwd: 'src',
                    src: [ '*.html', 'img/*.*' ],
                    dest: 'dist'
                } ]
            }
        },
        /**
         * usemin の grunt タスクを作成します。
         * @type {Object}
         */
        useminPrepare: {
            html: 'src/*.html',
            options: {
                dest: 'dist'
             }
        },
        /**
         * CSS、JavaScript を結合・圧縮し、HTML の参照パスを更新します。
         * @type {Object}
         */
        usemin: {
            html: 'dist/*.html',
            options: {
                dest: 'dist'
             }
        },
 
        /**
         * フォルダの変更を監視する設定。
         * $ grunt watch を実行している間、変更がある度に指定されたタスクを実行する。
         * @type {Object}
         */
        watch: {
            scripts: {
                files: [ 'src/css/*.css', 'src/js/*.js' ],
                tasks: [ 'build' ]
            }
        }
    } );
 
    Object.keys( pkg.devDependencies ).forEach( function( devDependency ) {
        if( devDependency.match( /^grunt\-/ ) ) {
            grunt.loadNpmTasks( devDependency );
        }
    } );
 
    grunt.registerTask( 'build', [ 'clean:build', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'clean:release' ] );
    grunt.registerTask( 'default', [ 'watch' ] );
};