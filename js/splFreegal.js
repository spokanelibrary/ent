function goFreegal(detail) {   
  if( detail!=undefined ) {
    var detailIndex = "detail"+detail;
    if ( document.getElementById(detailIndex+'_DOC_ID').hasChildNodes() ) {
      // mobile safari workaround-sg
      var splBIB = document.getElementById(detailIndex+'_DOC_ID').childNodes[0].innerHTML;
      splBIB = splBIB.replace('SD_ILS:','');
    }
    if (document.getElementById(detailIndex+'_FORMAT').hasChildNodes() ) {
      // mobile safari workaround-sg
      var splFORMAT = document.getElementById(detailIndex+'_FORMAT').childNodes[0].innerHTML;
    }
    if ( splBIB && ('Audio disc' == splFORMAT || 'Music Sound Recording' == splFORMAT) ) {
      splGetFreegal(splBIB);
    }
  }
}

function splGetFreegal(bib) {
  var $ = jQuery;
  
  var splFreegal = {
    init: function( bib ) {
      
      var html = '';
      html += '<div id="spl-freegal">';
      html += '<div style="margin-top:10px; padding:6px; color:#444; border:2px solid #427639; border-radius:3px;">';
      html += '<p><b>Searching Freegal...</b></p>';
      html += '</div>';
      html += '</div>';

      $('#detail_biblio0').append(html);



      //console.log(bib);
      //$('#detail_biblio0').append('Freegal lookup: '+bib); 
      $.ajax({ 
          url: 'http://api.spokanelibrary.org/v2/freegal/album'
        , data: {  params: {bib:bib} }
        ,type: 'POST'
        ,dataType: 'json'
        ,dataType: 'jsonp'
        ,jsonp: 'callback'
        })
        .done(function(obj) {  
          splFreegal.showBib(obj);
        })
        .fail(function() {
        });
      
    },
    showBib: function(obj) {
      //$('#detail_biblio0').append('Freegal lookup: '+bib); 
      //console.log(obj);

      var html = '';
      html += '<div style="margin-top:10px; padding:6px; color:#444; border:2px solid #427639; border-radius:3px;">';
      if ( obj.freegal.albums || obj.freegal.artists) {

        //$('#detail_biblio0').append('<div id="spl-freegal"></div>');
        html += '<p><b>Find it on Freegal</b></p>';

        if ( obj.freegal.albums ) {
          
          html += '<p>';
          html += '<small>';
          html += "The following album(s) with similar titles are available on Freegal:";
          html += '</small>';
          html += '</p>';
          
          $.each(obj.freegal.albums, function( key, album ) {
            //console.log( album );
            html += '<div>';
            html += '<p>';
            html += '<a target="_blank" href="'+album.href+'"><img style="float:left; margin-right:6px; width:80px; height:auto;" src="'+album.artwork+'"></a>';
            html += '<a target="_blank" href="'+album.href+'"><b>'+album.title+'</b></a>';
            html += '<small>';
            html += ' by ';
            html += '<a target="_blank" href="http://spokanepl.freegalmusic.com/search/index?q='+album.artist+'&type=artist">'+album.artist+'</a>';
            html += '</small>';
            html += '</p>';
            html += '<div style="clear:both;">&nbsp;</div>';
            html += '</div>';

          });
        }

        if ( obj.freegal.artists ) {
          
          html += '<p>';
          html += '<small>';
          html += "The following artist(s) with similar names are available on Freegal:";
          html += '</small>';
          html += '</p>';
          
          $.each(obj.freegal.artists, function( key, album ) {
            //console.log( album );
            html += '<div>';
            html += '<p>';
            html += '<a target="_blank" href="'+album.href+'"><img style="float:left; margin-right:6px; width:80px; height:auto;" src="'+album.artwork+'"></a>';
            html += '<a target="_blank" href="'+album.href+'"><b>'+album.title+'</b></a>';
            html += '<small>';
            html += ' by ';
            html += '<a target="_blank" href="http://spokanepl.freegalmusic.com/search/index?q='+album.artist+'&type=artist">'+album.artist+'</a>';
            html += '</small>';
            html += '</p>';
            html += '<div style="clear:both;">&nbsp;</div>';
            html += '</div>';

          });
        }        
      } else {
        html += '<p>';
        html += '<b>No matches found on Freegal</b>';
        html += '</p>';
      }

      html += '<p>';
      html += '<small>';
      html += "Freegal is the library's music download service.";
      html += ' ';
      html += "You can download 5 tracks a week with your library card.";
      html += ' ';
      html += "There is no charge and the music is yours to keep.";
      html += '</small>';
      html += '</p>';

      html += '<p>';
      html += '<small>';
      html += '<a target="_blank" href="http://www.spokanelibrary.org/download-music">Learn more &rarr;</a>';
      html += '</small>';
      html += '</p>';

      html += '</div>';

      $('#spl-freegal').html('').hide().append(html).slideDown(); 

    }
  }

  splFreegal.init(bib);    
}