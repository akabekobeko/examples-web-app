import Util from './Util.js';

/**
 * アプリケーションのエントリー ポイントです。
 */
window.onload = () => {
  const date = Util.formatDate();
  console.log( '[' + date + '] Application was launched.' );
};
