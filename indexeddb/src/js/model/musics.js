
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

/**
 * [exports description]
 * @return {[type]} [description]
 */
module.exports = function() {
    // IndexedDB チェック
    var _indexedDB = ( window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB );
    if( !( _indexedDB ) ) {
        throw new Error( '"indexedDB" is not defined.' );
    }

    /**
     * データベース。
     * @type {Object}
     */
    var _db = null;

    /**
     * データベースを開きます。
     * @param {Function} onSuccess 成功時に呼び出される関数。
     * @param {Function} onError   失敗時に呼び出される関数。
     */
    function open( callback ) {
        var request = _indexedDB.open( DB_NAME, DB_VERSION );

        request.onupgradeneeded = function( e ) {
            _db = e.target.result;

            _db.createObjectStore( DB_STORE_NAME, { keyPath: 'id', autoIncrement: true } );
            e.target.transaction.oncomplete = function() {
                if( callback ) {
                    callback();
                }
            };
        };

        request.onsuccess = function( e ) {
            _db = e.target.result;
            if( callback ) {
                callback();
            }
        };
         
        request.onerror = function( e ) {
            if( callback ) {
                callback( e );
            }
        };
    }

    /**
     * データベースを破棄します。
     */
    function destroy() {
        _indexedDB.deleteDatabase( DB_NAME );
    }

    /**
     * 音楽情報を追加します。
     *
     * @param {Object}   music    音楽情報。
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    function addItem( music, onSuccess, onError ) {
        var transaction = _db.transaction( DB_STORE_NAME, IDBTransaction.READ_WRITE );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.put( music );

        request.onsuccess = function( e ) {
            if( callback ) {
                callback( null, music );
            }
        };
     
        request.onerror = function( e ) {
            if( callback ) {
                callback( e, music );
            }
        };
    }

    /**
     * 音楽情報を削除します。
     *
     * @param {Number}   id       音楽情報の識別子。
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    function deleteItem( id, callback ) {
        var transaction = _db.transaction( DB_STORE_NAME, IDBTransaction.READ_WRITE );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.delete( id );

        request.onsuccess = function( e ) {
            if( callback ) {
                callback( null, id );
            }
        };
     
        request.onerror = function( e ) {
            if( callback ) {
                callback( e, id );
            }
        };
    }

    /**
     * 音楽情報を読み取ります。
     *
     * @param {Number}   id       音楽情報の識別子。。
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    function read( id, callback ) {
        var transaction = _db.transaction( DB_STORE_NAME, IDBTransaction.READ_ONLY );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.get( id );

        request.onsuccess = function( e ) {
            if( callback ) {
                callback( null, e.target.result );
            }
        };
     
        request.onerror = function( e ) {
            if( callback ) {
                callback( e, id );
            }
        };
    }

    /**
     * 音楽情報を全件、読み取ります。
     *
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    function readAll( callback ) {
        var transaction = _db.transaction( DB_STORE_NAME, IDBTransaction.READ_ONLY );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.openCursor();
        var musics      = [];

        request.onsuccess = function( e ) {
            if( e.target.result ) {
                musics.push( e.target.result.value );
            }
        };

        request.oncomplete = function( e ) {
            if( callback ) {
                callback( null, musics );
            }
        };

        request.onerror = function( e ) {
            if( callback ) {
                callback( e );
            }
        };
    }

    return {
        open: open,
        destroy: destroy,
        addItem: addItem,
        deleteItem: deleteItem,
        read: read,
        readAll: readAll
    };
};
