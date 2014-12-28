var React = require( 'react' );

var ITEM_TYPE_FOLDER = 'folder';
var ITEM_TYPE_FILE = 'file';

/**
 * 指定された範囲のランダムな整数を取得します。
 *
 * @param {Number} min 下限。
 * @param {Number} max 上限。
 *
 * @return {Number} 整数。
 */
function getRandomInt( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

/**
 * フォルダ内のアイテムを取得します。
 * このアプリはサンプルなので、得られる結果はランダムな 3 パターンから選択されます。
 *
 * @return {Array} アイテムのコレクション。
 */
function getSubItems() {
    switch( getRandomInt( 0, 2 ) ) {
    case 1:
        return [
            { name: 'dir-1', type: ITEM_TYPE_FOLDER },
            { name: 'dir-2', type: ITEM_TYPE_FOLDER }
        ];

    case 2:
        return [
            { name: 'dir', type: ITEM_TYPE_FOLDER },
            { name: 'music.aac', type: ITEM_TYPE_FILE },
            { name: 'sample.jpg', type: ITEM_TYPE_FILE }
        ];

    default:
        return [
            { name: 'dir', type: ITEM_TYPE_FOLDER },
            { name: 'test.txt', type: ITEM_TYPE_FILE }
        ];
    }
}

/**
 * フォルダ用の描画オブジェクトを取得します。
 *
 * @param {Object} component コンポーネント。
 *
 * @return {Object} 描画オブジェクト。
 */
function renderFolder( component ) {
    var children  = null;
    if( component.state.children ) {
        children = component.state.children.map( function( item, index ) {
            return ( <li key={index}><Explorer item={item} /></li> );
        } );
    }

    var style = component.state.expanded ? {} : { display: 'none' };
    var mark  = component.state.expanded ? 'icon-arrow-down' : 'icon-arrow-right';
    var icon  = 'icon-folder';
    return (
        <div>
            <div onClick={component.onClick}>
                <i className={mark}></i>
                <i className={icon}></i>
                <span>{component.props.item.name}</span>
            </div>
            <ul style={style}>
                {children}
            </ul>
        </div>
    );
}

/**
 * ファイル用の描画オブジェクトを取得します。
 *
 * @param {Object} component コンポーネント。
 *
 * @return {Object} 描画オブジェクト。
 */
function renderFile( component ) {
    var icon = 'icon-file';
    return (
        <div onClick={component.onClick}>
            <i className={icon}></i>
            <span>{component.props.item.name}</span>
        </div>
    );
}

var Explorer = React.createClass( {
    /**
     * コンポーネントの状態を初期化します。
     *
     * @return {Object} 初期化された状態オブジェクト。
     */
    getInitialState: function() {
        return {
            expanded: false,
            enumerated: false
        };
    },

    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function() {
        return ( this.props.item.type === ITEM_TYPE_FOLDER ? renderFolder( this ) : renderFile( this ) );
    },

    /**
     * アイテムがクリックされた時に発生します。
     */
    onClick: function() {
        if( this.props.item.type === ITEM_TYPE_FOLDER ) {
            if( !this.state.enumerated ) {
                this.setState( { enumerated: true } );
                this.setState( { children: getSubItems() } );
            }

            this.setState( { expanded: !this.state.expanded } );
        }
    }
} );

module.exports = function( target ) {
    var root = {
        name: 'root',
        type: 'folder'
    };

    React.render(
        <Explorer item={root} />,
        document.querySelector( target )
    );
};
