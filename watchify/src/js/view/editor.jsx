var React  = require( 'react' );

/**
 * 音楽情報の編集フォーム描画オブジェクトを生成します。
 *
 * @param {Object} component コンポーネント。
 *
 * @return {[type]} 描画オブジェクト。
 */
module.exports = function( component ) {
    return (
        <div className="editor">
            <div className="toolbar">
                <div className="left">
                    {renderButton( component, 'add', 'Add', true )}
                    {renderButton( component, 'update', 'Update', component.state.id )}
                </div>
                <div className="right">
                    {renderButton( component, 'delete', 'Delete', component.state.id )}
                </div>
                <div className="clear"></div>
            </div>
            <table className="form">
                <tbody>
                    <tr>
                        <th>Title</th>
                        <td><input type="text" value={component.state.title} onChange={component.onChangeTitle} /></td>
                    </tr>
                    <tr>
                        <th>Artist</th>
                        <td><input type="text" value={component.state.artist} onChange={component.onChangeArtist} /></td>
                    </tr>
                    <tr>
                        <th>Album</th>
                        <td><input type="text" value={component.state.album} onChange={component.onChangeAlbum} /></td>
                    </tr>
                    <tr>
                        <th>Genre</th>
                        <td><input type="text" value={component.state.genre} onChange={component.onChangeGenre} /></td>
                    </tr>
                </tbody>
            </table>
            <div className="toolbar">
                {renderButton( component, 'clear', 'Clear', true )}
                {renderButton( component, 'dispose', 'Dispose', true )}
            </div>
        </div>
    );
};

/**
 * 更新ボタンの描画オブジェクトを生成します。
 *
 * @param {Object}  component コンポーネント。
 * @param {String}  type ボタン種別。
 * @param {String}  text 表示名。
 * @param {Boolean} enabled ボタンを有効にするなら true。
 *
 * @return {[type]} 描画オブジェクト。
 */
function renderButton( component, type, text, enabled ) {
    if( enabled ) {
        return ( <div className={'button ' + type} onClick={component.onUpdate.bind( component, type )}>{text}</div> );
    } else {
        return ( <div className="button disable">{text}</div> );
    }
}
