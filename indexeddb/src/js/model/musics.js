
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
        console.log( 'DB [ chek ]: success' );
        return null;
    }

    /**
     * データベース。
     * @type {Object}
     */
    var _db = null;

    /**
     * データベースを開きます。
     *
     * @param  {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.open = function( callback ) {
        var request = _indexedDB.open( DB_NAME, DB_VERSION );

        request.onupgradeneeded = function( e ) {
            console.log( 'DB [ oepn ]: Success, onUpgradeNeeded' );

            _db = e.target.result;
            _db.createObjectStore( DB_STORE_NAME, { keyPath: 'id', autoIncrement: true } );
            e.target.transaction.oncomplete = function() {
                if( callback ) { callback(); }
            };
        };

        request.onsuccess = function( e ) {
            console.log( 'DB [ oepn ]: Success, onSuccess' );

            _db = e.target.result;
            if( callback ) { callback(); }
        };
         
        request.onerror = function( e ) {
            console.log( 'DB [ oepn ]: Error, ' + e );

            if( callback ) { callback( e ); }
        };
    };

    /**
     * 音楽情報を全件、読み取ります。
     *
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.readAll = function( callback ) {
        var transaction = _db.transaction( DB_STORE_NAME, IDBTransaction.READ_ONLY );
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
     * 音楽情報を追加します。
     *
     * @param {Object}   music    音楽情報。
     * @param {Function} callback 処理が終了した時に呼び出される関数。
     */
    this.addItem = function( music, callback ) {
        var transaction = _db.transaction( DB_STORE_NAME, 'readwrite' );
        var store       = transaction.objectStore( DB_STORE_NAME );
        var request     = store.put( {
            title:  music.title,
            artist: music.artist,
            album:  music.album,
            genre:  music.genre
        } );

        request.onsuccess = function( e ) {
            music.id = e.target.result;
            if( callback ) { callback( null, music ); }
        };
     
        request.onerror = function( e ) {
            console.log( e );
            if( callback ) { callback( e, music ); }
        };
    };

    return this;
};
