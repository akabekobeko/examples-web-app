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
            var MusicStore = require( '../model/music-store.js' );
            this.state.db = new MusicStore();

        } catch( exp ) {
            this.state.db = null;
            alert( exp.message );
            return;
        }

        this.state.db.open( function( error ) {
            if( error ) {
                alert( 'Failed to open the database.' );
                return;
            }

            this.state.db.readAll( function( error, musics ) {
                if( error ) {
                    alert( 'Failed to read musics.' );
                    return;
                }

                this.setState( { musics: musics } );

            }.bind( this ) );

        }.bind( this ) );
    },

    /**
     * リストから音楽情報が選択された時に発生します。
     *
     * @param {Object} music 音楽情報。
     */
    onSelect: function( music ) {
        this.setState( { current: music, editorMode: 'update' } );
    },

    /**
     * 音楽情報が更新される時に発生します。
     *
     * @param {Object} music 音楽情報。
     * @param {Object} mode 更新モード。'add'、'delete'、'update' のいずれかとなります。
     */
    onUpdate: function( music, mode ) {
        if( !( this.state.db ) ) { return; }

        switch( mode ) {
        case 'add':
        case 'update':
            this.state.db.addItem( music, function( error, newMusic ) {
                if( error ) {
                    alert( error.message );
                    return;
                }

                var musics = ( mode === 'add' ?
                    this.state.musics.concat( [ newMusic ] ) :
                    this.state.musics.map( function( m ) {
                        return ( m.id === newMusic.id ? newMusic : m );
                    } )
                );

                this.setState( { current: newMusic, musics: musics } );

            }.bind( this ) );

            break;

        case 'delete':
            this.state.db.deleteItem( music.id, function( error, deletedId ) {
                if( error ) {
                    alert( error.message );
                    return;
                }

                this.setState( {
                    current: null,
                    musics:  this.state.musics.filter( function( m ) {
                        return ( m.id !== deletedId );
                    } )
                } );
            }.bind( this ) );

            break;

        case 'clear':
            this.state.db.clear( function( error ) {
                if( error ) {
                    alert( error.message );
                    return;
                }

                this.setState( { current: null, musics: [] } );
            }.bind( this ) );

            break;

        case 'dispose':
            this.state.db.dispose( function( error ) {
                if( error ) {
                    alert( error.message );
                    return;
                }

                this.load();

            }.bind( this ) );

            break;

        default:
            break;
        }
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