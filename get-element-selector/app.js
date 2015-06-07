
/**
 * 指定された要素と同一階層、同名の要素コレクション内におけるインデックスを取得します。
 *
 * @param {Element} el   要素。
 * @param {String}  name 要素名。
 *
 * @return {Number} インデックス。範囲は 1 〜 N となります。
 */
function getSiblingElemetsIndex( el, name ) {
  var index = 1;
  var sib   = el;

  while( ( sib = sib.previousElementSibling ) ) {
    if( sib.nodeName.toLowerCase() === name ) {
      ++index;
    }
  }

  return index;
}

/**
 * 指定された要素を示すセレクターを取得します。
 *
 * @see http://stackoverflow.com/questions/3620116/get-css-path-from-dom-element
 *
 * @param {Element} el 要素。
 *
 * @return {Array} セレクター名コレクション。
 */
function getSelectorFromElement( el ) {
  var names = [];
  if( !( el instanceof Element ) ) { return names; }

  while( el.nodeType === Node.ELEMENT_NODE ) {
    var name = el.nodeName.toLowerCase();
    if( el.id ) {
      // id はページ内で一意となるため、これ以上の検索は不要
      name += '#' + el.id;
      names.unshift( name );
      break;
    }

    // 同じ階層に同名要素が複数ある場合は識別のためインデックスを付与する
    // 複数要素の先頭 ( index = 1 ) の場合、インデックスは省略可能
    //
    var index = getSiblingElemetsIndex( el, name );
    if( 1 < index ) {
      name += ':nth-of-type(' + index + ')';
    }

    names.unshift( name );
    el = el.parentNode;
  }

  return names;
}

/**
 * 指定されたセレクターの示す要素を強調表示します。
 *
 * @param {String}  selector セレクター。
 * @param {Boolean} disabled  強調を解除する場合は true。
 */
function highlight( selector, disabled ) {
  var current = document.querySelector( selector );
  if( current ) {
    var enabled = !( disabled );
    current.className = ( enabled ? 'selected' : '' );
  }
}

/**
 * アドレスバーを更新します。
 *
 * @param {Array.<String>} names 選択されている要素のパスを構成する名前コレクション。
 */
function updateAddressbar( names ) {
  var addressbar = document.querySelector( '.addressbar' );
  if( !( addressbar ) ) { return; }

  var path = names.map( function( name ) {
    return '<span>' + name + '</span>';
  } ).join( ' > ' );

  addressbar.innerHTML = path;
}

/**
 * 要素がクリックされた時に発生します。
 *
 * @param {Object} ev イベント情報。
 */
function onClick( ev ) {
  var names = getSelectorFromElement( ev.target );
  if( !( names && 0 < names.length ) ) { return; }

  var selector = names.join( ' > ' );
  highlight( '.selected', true );
  highlight( selector );
  updateAddressbar( names );
}

/**
 * セレクターの示す要素に対してクリック時のイベントを設定します。
 *
 * @param {String} selector セレクター。
 */
function setClickEvent( selector ) {
  var area = document.querySelector( '.main' );
  if( !( area ) ) { return; }

  var els = area.querySelectorAll( selector );
  if( !( els ) ) { return; }

  for( var i = 0, max = els.length; i < max; ++i ) {
    els[ i ].addEventListener( 'click', onClick );
  }
}

/**
 * アプリケーションのエントリー ポイントです。
 */
window.onload = function() {
  setClickEvent( 'h1' );
  setClickEvent( 'p' );
  setClickEvent( 'th' );
  setClickEvent( 'td' );
};
