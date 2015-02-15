var React   = require( 'react' );
var List    = require( './list.jsx' );
var Editor  = require( './editor.jsx' );

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
            current: null,
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
            <div className="content">
                <List musics={this.state.musics} current={this.state.current} onSelect={this.onSelect} />
                <Editor music={this.state.current} onUpdate={this.onUpdate} />
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
     * 音楽情報が更新される時に発生します。
     *
     * @param {Object} music 音楽情報。
     * @param {Object} mode 更新モード。'add'、'delete'、'update' のいずれかとなります。
     */
    onUpdate: function( music, mode ) {
        switch( mode ) {
        case 'add':
            music.id = ++this.count;
            this.setState( {
                current: music,
                musics:  this.state.musics.concat( [ music ] )
            } );
            break;

        case 'delete':
            this.setState( {
                current: null,
                musics:  this.state.musics.filter( function( m ) {
                    return ( m.id !== music.id );
                } )
            } );
            break;

        case 'update':
            break;

        default:
            break;
        }
    },
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