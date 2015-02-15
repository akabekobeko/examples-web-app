var React = require( 'react' );

/**
 * 新規の音楽情報を生成します。
 * @return {[type]} [description]
 */
function createNewMusic() {
    return {
        title:    'title',
        artist:   'artist',
        album:    'album',
        genre:    'genre'
    };
}

/**
 * 音楽情報を追加、削除、編集するためのコンポーネントです。
 *
 * @type {Object}
 */
var Editor = React.createClass( {
    /**
     * コンポーネントの状態を初期化します。
     *
     * @return {Object} 初期化された状態オブジェクト。
     */
    getInitialState: function() {
        return {
            music: createNewMusic()
        };
    },

    /**
     * コンポーネントのプロパティが更新された時に発生します。
     *
     * @param  {Object} nextProps 新しいプロパティ。
     */
    componentWillReceiveProps: function( nextProps ) {
        if( nextProps.music ) {
            this.setState( { music: nextProps.music } );
        }
    },
 
    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function() {
        function createRow( name, value, onChange ) {
            return (
                <tr>
                    <th>{name}</th>
                    <td><input type="text" value={value} onChange={onChange} /></td>
                </tr>
            );
        }

        return (
            <div className="editor">
                <div className="toolbar">
                    <div className="button add" onClick={this.onUpdate.bind(this, 'add')}>Add</div>
                    <div className="button delete" onClick={this.onUpdate.bind(this, 'delete')}>Delete</div>
                </div>
                <table className="form">
                    <tbody>
                        {createRow( 'Title',  this.state.music.title,  this.onChangeTitle  )}
                        {createRow( 'Artist', this.state.music.artist, this.onChangeArtist )}
                        {createRow( 'Album',  this.state.music.album,  this.onChangeAlbum  )}
                        {createRow( 'Genre',  this.state.music.genre,  this.onChangeGenre  )}
                    </tbody>
                </table>
                <div className="toolbar">
                    <div className="button update" onClick={this.onUpdate.bind(this, 'update')}>Update</div>
                </div>
            </div>
        );
    },

    /**
     * データが更新された時に発生します。
     *
     * @param {Object} mode 更新モード。
     */
    onUpdate: function( mode ) {
        switch( mode ) {
        case 'add':
            this.props.onUpdate( createNewMusic(), mode );
            break;

        default:
            this.props.onUpdate( this.state.music, mode );
            break;
        }
    },

    /**
     * タイトルが更新された時に発生します。
     *
     * @param {Object} e イベント情報。
     */
    onChangeTitle: function( e ) {
        this.setState( { title: e.target.value } );
    },

    /**
     * アーティスト名が更新された時に発生します。
     *
     * @param {Object} e イベント情報。
     */
    onChangeArtist: function( e ) {
        this.setState( { artist: e.target.value } );
    },

    /**
     * アルバム名が更新された時に発生します。
     *
     * @param {Object} e イベント情報。
     */
    onChangeAlbum: function( e ) {
        this.setState( { album: e.target.value } );
    },

    /**
     * ジャンルが更新された時に発生します。
     *
     * @param {Object} e イベント情報。
     */
    onChangeGenre: function( e ) {
        this.setState( { genre: e.target.value } );
    }
} );

module.exports = Editor;