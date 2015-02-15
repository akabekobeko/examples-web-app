var React = require( 'react' );

/**
 * 音楽リストを表すコンポーネントです。
 *
 * @type {Object}
 */
var MusicList = React.createClass( {
    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function() {
        var items = this.props.musics.map( function( music ) {
            return (
                <tr key={music.id} onClick={this.onSelect.bind( this, music )}>
                    <td>{music.title}</td>
                    <td>{music.artist}</td>
                    <td>{music.album}</td>
                    <td>{music.genre}</td>
                </tr>
            );

        }, this );

        return (
            <div className="list">
                <table>
                    <thead>
                        <tr><th>Title</th><th>Artis</th><th>Album</th><th>Genre</th></tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    },

    /**
     * リストから音楽が選択された時に発生します。
     *
     * @param {Object} music 音楽。
     */
    onSelect: function( music ) {
        if( this.props.onSelect ) {
            this.props.onSelect( music );
        }
    }
} );

module.exports = MusicList;