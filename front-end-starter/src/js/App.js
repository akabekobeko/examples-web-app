import Util from './Util.js';

// Application entry point
window.onload = () => {
  const date = Util.formatDate();
  console.log( '[' + date + '] Application was launched.' );
};
