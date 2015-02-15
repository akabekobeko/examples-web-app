var React = require( 'react' );

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
            id:     this.props.music.id,
            title:  this.props.music.title,
            artist: this.props.music.artist,
            album:  this.props.music.album,
            genre:  this.props.music.genre
        };
    },
 
    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function() {
        var saveButton = this.state.id ? 'Update' : 'Add';
        return (
            <div className="editor">
                <div className="toolbar">
                    <div className="save" onClick={this.onSave}>{saveButton}</div>
                    <div className="delete" onClick={this.onDelete}>Delete</div>
                </div>
                <table className="form">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <td><input type="text" className="textbox" value={this.state.title} onChange={this.onChangeTitle} /></td>
                        </tr>
                        <tr>
                            <th>Artist</th>
                            <td><input type="text" className="textbox" value={this.state.artist} onChange={this.onChangeArtist} /></td>
                        </tr>
                        <tr>
                            <th>Album</th>
                            <td><input type="text" className="textbox" value={this.state.album} onChange={this.onChangeAlbum} /></td>
                        </tr>
                        <tr>
                            <th>Genre</th>
                            <td><input type="text" className="textbox" value={this.state.genre} onChange={this.onChangeGenre} /></td>
                        </tr>
                        </tbody>
                </table>
            </div>
        );
    },

    /**
     * 保存操作がおこなわれた時に発生します。
     */
    onSave: function() {
        var music = {
            id:     this.props.music.id,
            title:  this.state.title,
            artist: this.state.artist,
            album:  this.state.album,
            genre:  this.state.genre
        };

        this.props.onSave( music );
    },

    onDelete: function() {

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