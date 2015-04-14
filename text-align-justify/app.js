( function() {
    var page   = document.querySelector( '.page' );
    var button = document.querySelector( '.button' );
    var enable = true;

    button.addEventListener( 'click', function() {
        if( enable ) {
          enable             = false;
          button.textContent = 'OFF';
          button.className   = 'button off';
          page.className     = 'page';
        } else {
          enable             = true;
          button.textContent = 'ON';
          button.className   = 'button on';
          page.className     = 'page justify';
        }
    } );
} )();
