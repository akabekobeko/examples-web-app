var React  = require( 'react' );
var List   = require( '../vm/list.js' );
var Editor = require( '../vm/editor.js' );

/**
 * アプリケーション全体の描画オブジェクトを生成します。
 *
 * @param  {Object} component コンポーネント。
 *
 * @return {[type]} 描画オブジェクト。
 */
module.exports = function( component ) {
    return (
        <div className="content">
            <List musics={component.state.musics} current={component.state.current} onSelect={component.onSelect} />
            <Editor music={component.state.current} onUpdate={component.onUpdate} />
        </div>
    );
};
