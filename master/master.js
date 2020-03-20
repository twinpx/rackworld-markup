//Mobile

( function($) {

  $( function() {
    
    Cookies.remove( 'lid', { domain: window.location.hostname });
    Cookies.set( 'lid', $( '#tires-master form:eq(0)' ).data( 'lid' ), { expires: 7, domain: window.location.hostname });
    
      function getFormResult() {
        var $form = $( '.tires-master-tab form' );
        
        $.ajax({
          url: $form.data( "url" ),
          type: $form.attr( "method" ),
          dataType: "html",
          data: $form.serialize(),
          success: function( data ) {
            //set html
            
            setTimeout( function() {
              initCountdown();
            }, 1000);
            
            $( '#right_block_ajax' ).html( data );
            
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      }
      
      //init counter
      function initCountdown() {
        $(".view_sale_block").size() && $(".view_sale_block").each(function() {
            var e = $(this).find(".active_to").text(),
                t = new Date(e.replace(/(\d+)\.(\d+)\.(\d+)/, "$3/$2/$1"));
            $(this).find(".countdown").countdown({
                until: t,
                format: "dHMS",
                padZeroes: !0,
                layout: '{d<}<span class="days item">{dnn}<div class="text">{dl}</div></span>{d>} <span class="hours item">{hnn}<div class="text">{hl}</div></span> <span class="minutes item">{mnn}<div class="text">{ml}</div></span> <span class="sec item">{snn}<div class="text">{sl}</div></span>'
            }, $.countdown.regionalOptions.ru)
        });
      }
      
  
    if ( $( '#tires-master select:eq(0)' ).closest( '.ik_select' ).length ) {//Desktop width ikSelect plugin
      
      //select width
      $( '#tires-master select' ).ikSelect( 'width', '200px' );
    
      //mobile button
      $( '#tires-master-mobile' ).click( function(e) {
        $( '#tires-master-mobile' ).slideUp();
        $( '#tires-master' ).slideDown();
      });
    
      //tabs
      $( '.tires-master-tabs__item' ).click( function() {
        var $tab = $( this );

        if ( !$tab.is( '.i-active' )) {
          $( '.tires-master-tabs__item.i-active' ).removeClass( 'i-active' );
          $tab.addClass( 'i-active' );
          
          $( '.tires-master-tab.i-active' ).removeClass( 'i-active' );
          $( '.tires-master-tab[ data-tab="' + $tab.data( 'tab' ) + '" ]' ).addClass( 'i-active' );
        }
      });
      
      $( '.tires-master-tabs__item:eq(0)' ).click();
      
      //selects
      $( '#tires-master-select1' ).change( function() {
        var $select = $( this );
        
        //the empty option
        if ( !$select.find( 'option:selected' ).attr( 'value' )) {
          $select.closest( 'form' ).find( '.bx_filter_search_reset_main' ).click();
          return;
        }
        
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select2
            var optionsIndexArray2 = [];
            var optionsLength2 = $( '#tires-master-select2 option' ).length;
            for ( var i=0; i < optionsLength2; i++ ) {
              optionsIndexArray2[i] = i;
            }
            $( '#tires-master-select2' ).ikSelect( 'removeOptions', optionsIndexArray2);
                      
            //empty select3
            var optionsIndexArray3 = [];
            var optionsLength3 = $( '#tires-master-select3 option' ).length;
            for ( var i=0; i < optionsLength3; i++ ) {
              optionsIndexArray3[i] = i;
            }
            $( '#tires-master-select3' ).ikSelect( 'removeOptions', optionsIndexArray3);
            
            //set preloader for select2
            $( '#tires-master-select2' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select2' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select2
            data.options.forEach( function( item ) {
              item.dataParam = {};
              item.title = '';
            });
            $( '#tires-master-select2' ).ikSelect( 'addOptions', data.options, 0, 0 );
            
            //make it enabled
            $( '#tires-master-select2' ).ikSelect('enable');
            
            //make select3 disabled
            $( '#tires-master-select3' ).ikSelect('disable');
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select2Name ] && $( '#tires-master-select2 option[ value="' + query[ select2Name ] + '"]' )) {
              
                $( '#tires-master-select2' ).ikSelect( 'select', query[ select2Name ] );              
                $( '#tires-master-select2' ).ikSelect( 'select', query[ select2Name ]);
                $( '#tires-master-select2' ).change();
                
                //look next in the select2 change event
                
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select2' ).change( function() {
        var $select = $( this );
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select3
            var optionsIndexArray3 = [];
            var optionsLength3 = $( '#tires-master-select3 option' ).length;
            for ( var i=0; i < optionsLength3; i++ ) {
              optionsIndexArray3[i] = i;
            }
            $( '#tires-master-select3' ).ikSelect( 'removeOptions', optionsIndexArray3);
            
            //set preloader for select3
            $( '#tires-master-select3' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select3' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select3
            data.options.forEach( function( item ) {
              item.dataParam = {};
              item.title = '';
            });
            $( '#tires-master-select3' ).ikSelect( 'addOptions', data.options, 0, 0 );
          
            //make it enabled
            $( '#tires-master-select3' ).ikSelect('enable');
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select3Name ] && $( '#tires-master-select3 option[ value="' + query[ select3Name ] + '"]' )) {
                $( '#tires-master-select3' ).ikSelect( 'select', query[ select3Name ]);
                $( '#tires-master-select3' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select3' ).change( function() {
          //set history url
          window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $( this ).closest( 'form' ).serialize());
          
          //show buttons
          $( this ).closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).addClass( 'i-enabled' );
          
          //if there is a URL query change next select
          if ( Object.keys( query ).length ) {
            getFormResult();
            //$( this ).closest( 'form' ).submit();
          }
          query = {};
      });
      
      
      
      $( '#tires-master-select4' ).change( function() {
        var $select = $( this );
        
        //the empty option
        if ( !$select.find( 'option:selected' ).attr( 'value' )) {
          $select.closest( 'form' ).find( '.bx_filter_search_reset_main' ).click();
          return;
        }
        
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select5
            var optionsIndexArray5 = [];
            var optionsLength5 = $( '#tires-master-select5 option' ).length;
            for ( var i=0; i < optionsLength5; i++ ) {
              optionsIndexArray5[i] = i;
            }
            $( '#tires-master-select5' ).ikSelect( 'removeOptions', optionsIndexArray5);
            
            //empty select6
            var optionsIndexArray6 = [];
            var optionsLength6 = $( '#tires-master-select6 option' ).length;
            for ( var i=0; i < optionsLength6; i++ ) {
              optionsIndexArray6[i] = i;
            }
            $( '#tires-master-select6' ).ikSelect( 'removeOptions', optionsIndexArray6);
            
            //empty select7
            var optionsIndexArray7 = [];
            var optionsLength7 = $( '#tires-master-select7 option' ).length;
            for ( var i=0; i < optionsLength7; i++ ) {
              optionsIndexArray7[i] = i;
            }
            $( '#tires-master-select7' ).ikSelect( 'removeOptions', optionsIndexArray7);
            
            //set preloader for select5
            $( '#tires-master-select5' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select5' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select5
            data.options.forEach( function( item ) {
              item.dataParam = {};
              item.title = '';
            });
            $( '#tires-master-select5' ).ikSelect( 'addOptions', data.options, 0, 0 );
            
            //make it enabled
            $( '#tires-master-select5' ).ikSelect('enable');
            
            //make select6 disabled
            $( '#tires-master-select6' ).ikSelect('disable');
            
            //make select7 disabled
            $( '#tires-master-select7' ).ikSelect('disable');
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select5Name ] && $( '#tires-master-select5 option[ value="' + query[ select5Name ] + '"]' )) {
                $( '#tires-master-select5' ).ikSelect( 'select', query[ select5Name ]);
                $( '#tires-master-select5' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select5' ).change( function() {
        var $select = $( this );
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select6
            var optionsIndexArray6 = [];
            var optionsLength6 = $( '#tires-master-select6 option' ).length;
            for ( var i=0; i < optionsLength6; i++ ) {
              optionsIndexArray6[i] = i;
            }
            $( '#tires-master-select6' ).ikSelect( 'removeOptions', optionsIndexArray6);
            
            //set preloader for select6
            $( '#tires-master-select6' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //empty select7
            var optionsIndexArray7 = [];
            var optionsLength7 = $( '#tires-master-select7 option' ).length;
            for ( var i=0; i < optionsLength7; i++ ) {
              optionsIndexArray7[i] = i;
            }
            $( '#tires-master-select7' ).ikSelect( 'removeOptions', optionsIndexArray7);
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select6' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select6
            data.options.forEach( function( item ) {
              item.dataParam = {};
              item.title = '';
            });
            $( '#tires-master-select6' ).ikSelect( 'addOptions', data.options, 0, 0 );
            
            //make it enabled
            $( '#tires-master-select6' ).ikSelect('enable');
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select6Name ] && $( '#tires-master-select6 option[ value="' + query[ select6Name ] + '"]' )) {
                $( '#tires-master-select6' ).ikSelect( 'select', query[ select6Name ]);
                $( '#tires-master-select6' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select6' ).change( function() {
        var $select = $( this );
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select7
            var optionsIndexArray7 = [];
            var optionsLength7 = $( '#tires-master-select7 option' ).length;
            for ( var i=0; i < optionsLength7; i++ ) {
              optionsIndexArray7[i] = i;
            }
            $( '#tires-master-select7' ).ikSelect( 'removeOptions', optionsIndexArray7);
            
            //set preloader for select7
            $( '#tires-master-select7' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select7' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select7
            data.options.forEach( function( item ) {
              item.dataParam = {};
              item.title = '';
            });
            $( '#tires-master-select7' ).ikSelect( 'addOptions', data.options, 0, 0 );
            
            //make it enabled
            $( '#tires-master-select7' ).ikSelect('enable');
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select7Name ] && $( '#tires-master-select7 option[ value="' + query[ select7Name ] + '"]' )) {
                $( '#tires-master-select7' ).ikSelect( 'select', query[ select7Name ]);
                $( '#tires-master-select7' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select7' ).change( function() {
          //set history url
          window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $( '#tires-master-select7' ).closest( 'form' ).serialize());
          
          //show buttons
          $( this ).closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).addClass( 'i-enabled' );
          
          //if there is a URL query change next select
          if ( Object.keys( query ).length ) {
            //$( this ).closest( 'form' ).submit();
            getFormResult();
          }
          query = {};
      });
      
      //send form
      /*$( '.tires-master-tab form' ).submit( function(e) {
        e.preventDefault();        
        var $form = $( this );
                
        $.ajax({
          url: $form.attr( "action" ),
          type: $form.attr( "method" ),
          dataType: "html",
          data: $form.serialize(),
          success: function( data ) {
            //set html
            
            setTimeout( function() {
              initCountdown();
            }, 1000);
            
            $( '#right_block_ajax' ).html( data );
            
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });*/
      
      
      //clear form
      $( '.bx_filter_search_reset_main' ).click( function(e) {
        e.preventDefault();
        var $button = $( this );
        
        $button.closest( 'form' ).find( 'select' ).each( function( index ) {
          var $select = $( this );
        
          if ( index > 0 ) {
            //empty select
            var optionsIndexArray = [];
            var optionsLength = $select.find( 'option' ).length;
            for ( var i=0; i < optionsLength; i++ ) {
              optionsIndexArray[i] = i;
            }
            $select.ikSelect( 'removeOptions', optionsIndexArray );
          
            //disable select
            $select.ikSelect('disable');
            
            //set default value
            $select.ikSelect( 'addOptions', { "value": "", "label": $select.data( 'default' ), dataParam: {}, title: '' }, 0, 0 );
          } else {
            //set default value
            $select.ikSelect( 'select', 0 )
          }
        
          //hide buttons
          $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
        });
      });
      
    
      //parse URL
      function parseQuery( queryString ) {
        var query = {};
        var pairs = ( queryString[0] === '?' ? queryString.substr(1) : queryString ).split('&');
        for ( var i = 0; i < pairs.length; i++ ) {
            var pair = pairs[i].split( '=' );
            query[ decodeURIComponent( pair[0]) ] = decodeURIComponent( pair[1] || '' );
        }
        return query;
      }
      
      var query = parseQuery( window.location.search );
      
      var select1Name = $( '#tires-master-select1' ).attr( 'name' ),
          select2Name = $( '#tires-master-select2' ).attr( 'name' ),
          select3Name = $( '#tires-master-select3' ).attr( 'name' ),
          select4Name = $( '#tires-master-select4' ).attr( 'name' ),
          select5Name = $( '#tires-master-select5' ).attr( 'name' ),
          select6Name = $( '#tires-master-select6' ).attr( 'name' ),
          select7Name = $( '#tires-master-select7' ).attr( 'name' );
          
      if ( Object.keys( query ).length ) {//if there is a URL query
        
        //first select in form
        if ( query[ select1Name ]) {
        
          $( '.tires-master-tabs__item[ data-tab=car ]' ).click();
          
          $( '#tires-master-select1' ).ikSelect( 'select', query[ select1Name ]);
          
          $( '#tires-master-select1' ).change();
          
          //next action look in the change event of the select1
          
        } else if ( query[ $( '#tires-master-select4' ).attr( 'name' )]) {
        
          $( '.tires-master-tabs__item[ data-tab=parameter ]' ).click();
        
          $( '#tires-master-select4' ).ikSelect( 'select', query[ select4Name ] );
          
          $( '#tires-master-select4' ).change();
          
          //next action look in the change event of the select4
          
        }
      }
    
    } 
    else 
    { //Mobile version
    
      //select width
	
      //mobile button
      $( '#tires-master-mobile' ).click( function(e) {
        $( '#tires-master-mobile' ).slideUp();
        $( '#tires-master' ).slideDown();
      });
    
      //tabs
      $( '.tires-master-tabs__item' ).click( function() {
        var $tab = $( this );

        if ( !$tab.is( '.i-active' )) {
          $( '.tires-master-tabs__item.i-active' ).removeClass( 'i-active' );
          $tab.addClass( 'i-active' );
          
          $( '.tires-master-tab.i-active' ).removeClass( 'i-active' );
          $( '.tires-master-tab[ data-tab="' + $tab.data( 'tab' ) + '" ]' ).addClass( 'i-active' );
        }
      });
      
      $( '.tires-master-tabs__item:eq(0)' ).click();
      
      //selects
      $( '#tires-master-select1' ).change( function() {
        var $select = $( this );
        
        //the empty option
        if ( !$select.find( 'option:selected' ).attr( 'value' )) {
          $select.closest( 'form' ).find( '.bx_filter_search_reset_main' ).click();
          return;
        }
        
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select2
            $( '#tires-master-select2' ).empty();
                      
            //empty select3
            $( '#tires-master-select3' ).empty();
            
            //set preloader for select2
            $( '#tires-master-select2' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select2' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select2
            data.options.forEach( function( item ) {
              html += '<option value="' + item.value + '">' + item.label + '</option>';
            });
            $( '#tires-master-select2' ).html( html ).removeAttr( 'disabled' );
            
            //make select3 disabled
            $( '#tires-master-select3' ).attr({ disabled: 'disabled' });
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select2Name ] && $( '#tires-master-select2 option[ value="' + query[ select2Name ] + '"]' )) {
              
                $( '#tires-master-select2' ).find( 'option[ value="' + query[ select2Name ] + '" ]' ).attr({ selected: 'selected' });
                
                $( '#tires-master-select2' ).find( 'option[ value="' + query[ select2Name ] + '" ]' ).attr({ selected: 'selected' });
                $( '#tires-master-select2' ).change();
                //look next in the select2 change event
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select2' ).change( function() {
        var $select = $( this );
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select3
            $( '#tires-master-select3' ).empty();
            
            //set preloader for select3
            $( '#tires-master-select3' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select3' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select3
            data.options.forEach( function( item ) {
              html += '<option value="' + item.value + '">' + item.label + '</option>';
            });
            $( '#tires-master-select3' ).html( html ).removeAttr( 'disabled' );
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select3Name ] && $( '#tires-master-select3 option[ value="' + query[ select3Name ] + '"]' )) {
                $( '#tires-master-select3' ).find( 'option[ value="' + query[ select3Name ] + '" ]' ).attr({ selected: 'selected' });
                $( '#tires-master-select3' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select3' ).change( function() {
          //set history url
          window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $( this ).closest( 'form' ).serialize());
          
          //show buttons
          $( this ).closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).addClass( 'i-enabled' );
          
          //if there is a URL query change next select
          if ( Object.keys( query ).length ) {
            //$( this ).closest( 'form' ).submit();
            getFormResult();
          }
          query = {};
      });
      
      $( '#tires-master-select4' ).change( function() {
        var $select = $( this );
        
        //the empty option
        if ( !$select.find( 'option:selected' ).attr( 'value' )) {
          $select.closest( 'form' ).find( '.bx_filter_search_reset_main' ).click();
          return;
        }
        
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select5
            $( '#tires-master-select5' ).empty();
            
            //empty select6
            $( '#tires-master-select6' ).empty();
            
            //empty select7
            $( '#tires-master-select7' ).empty();
            
            //set preloader for select5
            $( '#tires-master-select5' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select5' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select5
            data.options.forEach( function( item ) {
              html += '<option value="' + item.value + '">' + item.label + '</option>';
            });
            $( '#tires-master-select5' ).html( html ).removeAttr( 'disabled' );
            
            //make select6 disabled
            $( '#tires-master-select6' ).attr({ disabled: 'disabled' });
            
            //make select7 disabled
            $( '#tires-master-select7' ).attr({ disabled: 'disabled' });
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select5Name ] && $( '#tires-master-select5 option[ value="' + query[ select5Name ] + '"]' )) {
                $( '#tires-master-select5' ).find( 'option[ value="' + query[ select5Name ] + '" ]' ).attr({ selected: 'selected' });
                $( '#tires-master-select5' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select5' ).change( function() {
        var $select = $( this );
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select6
            $( '#tires-master-select6' ).empty();
            
            //set preloader for select6
            $( '#tires-master-select6' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //empty select7
            $( '#tires-master-select7' ).empty();
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select6' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select6
            data.options.forEach( function( item ) {
              html += '<option value="' + item.value + '">' + item.label + '</option>';
            });
            $( '#tires-master-select6' ).html( html ).removeAttr( 'disabled' );
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select6Name ] && $( '#tires-master-select6 option[ value="' + query[ select6Name ] + '"]' )) {
                $( '#tires-master-select6' ).find( 'option[ value="' + query[ select6Name ] + '" ]' ).attr({ selected: 'selected' });
                $( '#tires-master-select6' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select6' ).change( function() {
        var $select = $( this );
        //send ajax request
        $.ajax({
          url: $select.data( "ajax" ),
          type: $select.data( "method" ),
          dataType: "json",
          data: $select.closest( 'form' ).serialize(),
          beforeSend: function() {
            //hide results
            
            //empty select7
            $( '#tires-master-select7' ).empty();
            
            //set preloader for select7
            $( '#tires-master-select7' ).closest( '.select-column' ).addClass( 'i-preloader' );
            
            //hide buttons
            $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
            
            //set history url
            window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $select.closest( 'form' ).serialize());
            
          },
          success: function( data ) {
            var html = '';
            
            //remove preloader
            $( '#tires-master-select7' ).closest( '.select-column' ).removeClass( 'i-preloader' );
            
            //form select7
            data.options.forEach( function( item ) {
              html += '<option value="' + item.value + '">' + item.label + '</option>';
            });
            $( '#tires-master-select7' ).html( html ).removeAttr( 'disabled' );
            
            //if there is a URL query change next select
            if ( Object.keys( query ).length ) {
              if ( query[ select7Name ] && $( '#tires-master-select7 option[ value="' + query[ select7Name ] + '"]' )) {
                $( '#tires-master-select7' ).find( 'option[ value="' + query[ select7Name ] + '" ]' ).attr({ selected: 'selected' });
                $( '#tires-master-select7' ).change();
              } else {
                query = {};
              }
            }
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });
      
      $( '#tires-master-select7' ).change( function() {
          //set history url
          window.history.replaceState({}, '', String( window.location ).substring( 0, String( window.location ).indexOf('?')) + '?' + $( '#tires-master-select7' ).closest( 'form' ).serialize());
          
          //show buttons
          $( this ).closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).addClass( 'i-enabled' );
          
          //if there is a URL query change next select
          if ( Object.keys( query ).length ) {
            //$( this ).closest( 'form' ).submit();
            getFormResult();
          }
          query = {};
      });
      
      //send form
      /*$( '.tires-master-tab form' ).submit( function(e) {
        e.preventDefault();
        var $form = $( this );
        $.ajax({
          url: $form.attr( "action" ),
          type: $form.attr( "method" ),
          dataType: "html",
          data: $form.serialize(),
          success: function( data ) {
            //set html
            
            setTimeout( function() {
              initCountdown();
            }, 1000);
            
            
            $( '#right_block_ajax' ).html( data );
            
          },
          error:  function ajaxError( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
      });*/
      
      //clear form
      $( '.bx_filter_search_reset_main' ).click( function(e) {
        e.preventDefault();
        var $button = $( this );
        
        $button.closest( 'form' ).find( 'select' ).each( function( index ) {
          var $select = $( this );
        
          if ( index > 0 ) {
            //empty select
            $select.empty();
            
            //disable select
            $select.attr({ disabled: 'disabled' });
            
            //set default value
            $select.html( '<option>' + $select.data( 'default' ) + '</option>' );
          } else {
            //set default value
            $select.find( 'option:eq(0)' ).attr({ selected: 'selected' });
          }
        
          //hide buttons
          $select.closest( '.tires-master-tab' ).find( '.bx_filter_search_button' ).removeClass( 'i-enabled' );
        });
      });
      
    
      //parse URL
      function parseQuery( queryString ) {
        var query = {};
        var pairs = ( queryString[0] === '?' ? queryString.substr(1) : queryString ).split('&');
        for ( var i = 0; i < pairs.length; i++ ) {
            var pair = pairs[i].split( '=' );
            query[ decodeURIComponent( pair[0]) ] = decodeURIComponent( pair[1] || '' );
        }
        return query;
      }
      
      var query = parseQuery( window.location.search );
      
      var select1Name = $( '#tires-master-select1' ).attr( 'name' ),
          select2Name = $( '#tires-master-select2' ).attr( 'name' ),
          select3Name = $( '#tires-master-select3' ).attr( 'name' ),
          select4Name = $( '#tires-master-select4' ).attr( 'name' ),
          select5Name = $( '#tires-master-select5' ).attr( 'name' ),
          select6Name = $( '#tires-master-select6' ).attr( 'name' ),
          select7Name = $( '#tires-master-select7' ).attr( 'name' );
          
      if ( Object.keys( query ).length ) {//if there is a URL query
        
        //first select in form
        if ( query[ select1Name ]) {
        
          $( '.tires-master-tabs__item[ data-tab=car ]' ).click();
          
          $( '#tires-master-select1' ).find( 'option[ value="' + query[ select1Name ] + '" ]' ).attr({ selected: 'selected' });
          
          $( '#tires-master-select1' ).change();
          
          //next action look in the change event of the select1
          
        } else if ( query[ $( '#tires-master-select4' ).attr( 'name' )]) {
        
          $( '.tires-master-tabs__item[ data-tab=parameter ]' ).click();
        
         $( '#tires-master-select4' ).find( 'option[ value="' + query[ select4Name ] + '" ]' ).attr({ selected: 'selected' });
          
          $( '#tires-master-select4' ).change();
          
          //next action look in the change event of the select4
          
        }
      }
    
    }
    
  });
})( window.jQuery );

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));