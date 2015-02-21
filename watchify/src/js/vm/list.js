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
        return require( '../view/list.jsx' )( this );
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