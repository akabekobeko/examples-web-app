var React  = require( 'react' );

/**
 * 音楽情報を生成します。
 *
 * @param {Boolean} forAdditional 新規追加用なら true、それ以外はリセット用。
 *
 * @return {Object} 音楽情報。
 */
function createMusic( forAdditional ) {
    if( forAdditional ) {
        return { title: 'title', artist: 'artist', album: 'album', genre: 'genre' };
    } else {
        return { title: '', artist: '', album: '',genre: '' };
    }
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
        var music = createMusic();
        return {
            title:  music.title,
            artist: music.artist,
            album:  music.album,
            genre:  music.genre
        };
    },

    /**
     * コンポーネントのプロパティが更新された時に発生します。
     *
     * @param  {Object} nextProps 新しいプロパティ。
     */
    componentWillReceiveProps: function( nextProps ) {
        if( nextProps.music ) {
            this.setState( {
                id:     nextProps.music.id,
                title:  nextProps.music.title,
                artist: nextProps.music.artist,
                album:  nextProps.music.album,
                genre:  nextProps.music.genre
            } );

        } else {
            var music = createMusic();
            this.setState( {
                id:     undefined,
                title:  music.title,
                artist: music.artist,
                album:  music.album,
                genre:  music.genre
            } );
        }
    },

    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function() {
        return require( '../view/editor.jsx' )( this );
    },

    /**
     * データが更新された時に発生します。
     *
     * @param {Object} mode 更新モード。
     */
    onUpdate: function( mode ) {
        switch( mode ) {
        case 'add':
            this.props.onUpdate( createMusic( true ), mode );
            break;

        case 'clear':
        case 'dispose':
            this.props.onUpdate( null, mode );
            break;

        default:
            this.props.onUpdate( {
                    id:     this.state.id,
                    title:  this.state.title,
                    artist: this.state.artist,
                    album:  this.state.album,
                    genre:  this.state.genre
                },
                mode
            );
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