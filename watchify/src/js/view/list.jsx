var React  = require( 'react' );

/**
 * 音楽情報リストの描画オブジェクトを生成します。
 *
 * @param  {Object} component コンポーネント。
 *
 * @return {[type]} 描画オブジェクト。
 */
module.exports = function( component ) {
    var items = component.props.musics.map( function( music ) {
        var selected = ( component.props.current && component.props.current.id === music.id ? 'selected' : null );
        return (
            <tr key={music.id} onClick={component.onSelect.bind( component, music )} className={selected}>
                <td>{music.id}</td>
                <td>{music.title}</td>
                <td>{music.artist}</td>
                <td>{music.album}</td>
                <td>{music.genre}</td>
            </tr>
        );

    }, component );

    return (
        <div className="list">
            <table>
                <thead>
                    <tr><th>#</th><th>Title</th><th>Artis</th><th>Album</th><th>Genre</th></tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    );
};
