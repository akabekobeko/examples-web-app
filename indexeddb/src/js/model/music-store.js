
/**
 * データベース名。
 * @type {String}
 */
var DB_NAME = 'music_db';

/**
 * データベースのバージョン。
 * @type {Number}
 */
var DB_VERSION = 1;

/**
 * 音楽情報を示すデータベース内のストア名。
 * @type {String}
 */
var DB_STORE_NAME = 'musics';

module.exports = function() {
    // IndexedDB チェック
    var _indexedDB = ( window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB );
    if( !( _indexedDB ) ) {
        throw new Error( 'IndexedDB not supported.' );
    }

    /**
     * データベース。
     * @type {Object}
     */
    var _db = null;

    /**
     * データベースを開きます。
     *
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.open = function( callback ) {
        var request = _indexedDB.open( DB_NAME, DB_VERSION );

        request.onupgradeneeded = function( e ) {
            console.log( 'DB [ oepn ]: Success, Upgrade' );

            _db = e.target.result;
            _db.createObjectStore( DB_STORE_NAME, { keyPath: 'id', autoIncrement: true } );
            e.target.transaction.oncomplete = function() {
                if( callback ) { callback(); }
            };
        };

        request.onsuccess = function( e ) {
            console.log( 'DB [ oepn ]: Success' );

            _db = e.target.result;
            if( callback ) { callback(); }
        };
         
        request.onerror = function( e ) {
            console.log( 'DB [ oepn ]: Error, ' + e );

            if( callback ) { callback( e ); }
        };
    };

    /**
     * データベースを破棄します。
     *
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.dispose = function( callback ) {
        if( !( _db ) ) { return; }

        _db.close();

        var request = _indexedDB.deleteDatabase( DB_NAME );
        request.onsuccess = function( e ) {
            console.log( 'DB [ dispose ]: Success' );

            _db = null;
            if( callback ) { callback(); }
        };
         
        request.onerror = function( e ) {
            console.log( 'DB [ dispose ]: Error, ' + e );

            if( callback ) { callback( e ); }
        };
    };

    /**
     * 音楽情報を全て消去します。
     *
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.clear = function( callback ) {
        if( !( _db ) ) { return; }

        var transaction = _db.transaction( DB_STORE_NAME, 'readwrite' );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.clear();

        request.onsuccess = function( e ) {
            if( callback ) { callback( null ); }
        };
     
        request.onerror = function( e ) {
            console.log( e );
            if( callback ) { callback( e ); }
        };
    };

    /**
     * 音楽情報を全件、読み取ります。
     *
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.readAll = function( callback ) {
        if( !( _db ) ) { return; }

        var transaction = _db.transaction( DB_STORE_NAME, 'readonly' );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.openCursor();
        var musics      = [];

        request.onsuccess = function( e ) {
            var cursor = e.target.result;
            if( cursor ) {
                musics.push( cursor.value );
                cursor.continue();

            } else if( callback ) {
                callback( null, musics );
            }
        };

        request.onerror = function( e ) {
            if( callback ) { callback( e ); }
        };
    };

    /**
     * 音楽情報を追加または更新します。
     *
     * @param {Object}   music    音楽情報。id が有効値の場合は既存の情報を上書きします。
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.addItem = function( music, callback ) {
        if( !( _db ) ) { return; }

        var transaction = _db.transaction( DB_STORE_NAME, 'readwrite' );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.put( music );

        request.onsuccess = function( e ) {
            music.id = e.target.result;
            if( callback ) { callback( null, music ); }
        };
     
        request.onerror = function( e ) {
            console.log( e );
            if( callback ) { callback( e, music ); }
        };
    };

    /**
     * 音楽情報を削除します。
     *
     * @param {Number}   id       音楽情報の識別子。
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.deleteItem = function( id, callback ) {
        if( !( _db ) ) { return; }

        var transaction = _db.transaction( DB_STORE_NAME, 'readwrite' );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.delete( id );

        request.onsuccess = function( e ) {
            if( callback ) { callback( null, id ); }
        };
     
        request.onerror = function( e ) {
            if( callback ) { callback( e, id ); }
        };
    };
};
