;( function( $, window, document, undefined ) {

  /**
   * Active
   */
  document.addEventListener( "touchstart", function() {}, true );

  /**
   * nojs
   */
  $( '.html' )
    .removeClass( 'html--nojs' )
    .addClass( 'html--js' );

  /**
   * Is Touch
   */
  function isTouch() {
    try {
      document.createEvent( "TouchEvent" );
      return true;
    } catch ( e ) {
      return false;
    }
  }

  if ( isTouch() ) {
    $( '.html' )
      .addClass( 'html--touch' );
  } else {
    $( '.html' )
      .addClass( 'html--desktop' );
  }

  /**
   * Burger
   */
  $( '.header__burger' )
    .on( 'click', function() {
      $( '.html' )
        .toggleClass( 'html--burger' );
    } );

  /**
   * Title Fade
   */
  if ( $( '.title' ).length && ! $( '.title' ).hasClass( 'title--white' ) ) {

    var scrollRange,
      opacityRatio,
      scrollOffset;

    $( window )
      .on( 'scroll resize', function() {

        scrollRange = 90;
        if ( $( window ).width() < 768 ) {
          scrollRange = 60;
        }
        if ( $( window ).width() >= 1272 ) {
          scrollRange = 100;
        }

        scrollOffset = $( window ).scrollTop();

        if ( scrollOffset <= scrollRange ) {
          opacityRatio = 1 - scrollOffset / scrollRange;

          $( '.title__heading' ).css({
            opacity: opacityRatio
          });
        }
      } );
  }

  /**
   * Images and links
   */
  $( '.page a img' )
    .closest( 'a' )
    .addClass( 'illustrated-link' );

  /**
   * Appearing
   */
  $( '.emerge' ).each( function() {

      var $this = $( this );

      $this.waypoint( {
          handler: function( direction ) {
              $this.addClass( 'emerge--visible' );
          },
          offset: '100%'
      } );
  } );

} )( jQuery, window, document );
