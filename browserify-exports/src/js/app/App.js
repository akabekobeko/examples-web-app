import { Util, Echo } from 'library';

// Application entry point
window.onload = () => {
  const date = Util.formatDate();
  Echo();
  console.log( '[' + date + '] Application was launched.' );

  const elm = document.querySelector( '.date' );
  if( elm ) {
    elm.textContent = date;
  }
};
