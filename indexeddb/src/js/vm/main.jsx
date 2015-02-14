var React   = require( 'react' );
var List    = require( './list.jsx' );
var Editor  = require( './editor.jsx' );

/**
 * 新規作成するための音楽情報を生成します。
 * @return {[type]} [description]
 */
function createMusicForAdditional() {
    return {
        title:    'title',
        artist:   'artist',
        album:    'album',
        genre:    'genre'
    };
}

/**
 * アプリケーションのエントリーポイントになるコンポーネントです。
 *
 * @type {Object}
 */
var Main = React.createClass( {
    /**
     * コンポーネントの状態を初期化します。
     *
     * @return {Object} 初期化された状態オブジェクト。
     */
    getInitialState: function() {
        return {
            musics: [],
            current: createMusicForAdditional(),
            db: null
        };
    },

    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function() {
        return (
            <div className="main">
                <List musics={this.state.musics} onSelect={this.onSelect} />
                <Editor music={this.state.current} onSave={this.onSave} />
            </div>
        );
    },

    /**
     * すべての音楽情報を読み込みます。
     */
    load: function() {
        try {
            this.state.db = require( '../model/musics.js' )();
            this.state.db.open( function( error ) {
                if( error ) { throw new Error( 'Failed to open database.' ); }

                this.state.db.readAll( function( error, musics ) {
                    if( error ) { throw new Error( 'Failed to read muisc data.' ); }

                    this.setState( { musics: musics } );

                }.bind( this ) );

            }.bind( this ) );

        } catch( e ) {
            this.setState( { db: null } );
            alert( e.message );
        }
    },

    /**
     * リストから音楽情報が選択された時に発生します。
     *
     * @param {Object} music 音楽情報。
     */
    onSelect: function( music ) {
        this.setState( { current: music, editorMode: 'update' } );
    },

    count: 0,

    /**
     * 音楽情報が保存される時に発生します。
     *
     * @param  {Object} music 音楽情報。
     */
    onSave: function( music ) {
        if( music.id ) {
            // 更新

        } else {
            music.id = ++this.count;
            this.setState( { musics: this.state.musics.concat( [ music ] ) } );
        }
    },

    /**
     * 音楽情報が削除される時に発生します。
     *
     * @param  {Object} music 音楽情報。
     */
    onDelete: function( music ) {
        if( !( this.state.db ) ) { return; }
    }
} );

/**
 * コンポーネント処理を開始します。
 *
 * @param {Object} query コンポーネントの配置対象となる DOM を示すクエリ。
 *
 * @return {Object} コンポーネント。
 */
module.exports = function( query ) {
    return React.render(
        <Main />,
        document.querySelector( query )
    );
};