jQuery(document).ready(function(){
  var $ = jQuery;

  $('head').append('<meta http-equiv="X-UA-Compatible" content="IE=edge"');
  $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
  $('head').append('<meta name="format-detection" content="telephone=no">');

  var SPL = {

  	config: { endpoint: {
  							spl: 'http://api.spokanelibrary.org'
  						}
  					}
  
	  , init: function() {
	  	_self = this;
	  	//console.log($.fn.jquery);

	  	//this.initCarousel();
	  	
	  	this.initBrowseList();

	  	//this.initLimitBox();
	  	this.initLimitPanel();
	  	this.initSearchResults();
	  	this.initDetailDisplay();
	  	this.initRegistration();
	  } 
	  
	  , initRegistration: function() {
	  	$registation = $('.registrationDiv');
	  	if ( $registation && 0 != $registation.length ) {
				$('.registrationTitle').html('Register for a library card');
				$('select.city_st').val('SPOKE');
				$('select.teacher').val('pickdt');
			}
	  }

	  , initDetailDisplay: function() {
			$results = $('.detail_main');
			if ( $results && 0 != $results.length ) {
				this.splNoveListDisplay(1);
			}
	  }

	  , splNoveListDisplay: function(i) {
	  	
	  	var $novSuggest = $('#NoveListSuggestions');
	  	if ( $novSuggest.html() == null
	        && i <= 10 ) {
	        setTimeout(function() {_self.splNoveListDisplay(++i)}, 500);
	    } else {
	        $('#content')
	        .prepend('<div class="splNoveListSelect"></div>');

	        var $splNovSel = $('.splNoveListSelect');
	        $splNovSel.html( $novSuggest.html() );

	        var $splSeries = $('.NovSimilarSeries', $splNovSel);
	        $('.NovSelectImageHeadingToggle', $splSeries)
	        .html('Similar Series');

	        var $splTitles = $('.NovSimilarTitles', $splNovSel);
	        $('.NovSelectImageHeadingToggle', $splTitles)
	        .html('Similar Titles');

	        var $splAuthors = $('.NovSimilarAuthors', $splNovSel);
	        $('.NovSelectImageHeadingToggle', $splAuthors)
	        .html('Similar Authors');

	        //$('.NovSuggestions').hide();
	        //$novSuggest.hide();

	        //$splNovSel.show();
	    }

	  }

	  , initSearchResults: function() {
	  	//$search = $('#searchViewDISCOVERYALL');
	  	$content = $('#content');
	  	$search = $('.searchLimitsColumn');

	  	var control = '<div class="splSearchLimitControl"><a href="#">Filter Search Results</a> &rarr;</div>';
	  	
	  	if ( $search && 0 != $search.length ) {
	  		$content.prepend(control);
	  	}

	  	//$('body').on('click', '.splSearchLimitControl a', function(e) {
	  	$('.splSearchLimitControl a').live('click', function(e) {
	  		e.preventDefault();
	  		$search.toggle();
	  	});
	 
	  }

	  , initLimitBox: function() {
	  	$limits = $('#searchLimitDropDown');
	  	if ( $limits && 0 != $limits.length ) {
	  		$('optgroup:first', $limits).appendTo($limits);
	  	}
	  }

	  , initLimitPanel: function() {
	  	$panel = $('.searchLimitsColumn');
	  	$library = $('#facetLIBRARY');
	  	$material = $('#facetITYPE');
	  	$format = $('#facetFORMAT');

	  	if ( $panel && 0 != $panel.length ) {
	  		
	  		if ( $library && 0 != $library.length ) {
	  			$('.navigator', $library)
	  			.removeClass('hidden')
	  			.addClass('shown')
	  			.closest('.facet')
	  			.find('.moreNavigators')
	  			.hide(); 
	  		}

	  		if ( $material && 0 != $material.length ) {
	  			$('.navigator', $material)
	  			.removeClass('hidden')
	  			.addClass('shown')
	  			.closest('.facet')
	  			.find('.moreNavigators')
	  			.hide();
	  		}

	  		if ( $format && 0 != $format.length ) {
	  			$('.navigator', $format)
	  			.removeClass('hidden')
	  			.addClass('shown')
	  			.closest('.facet')
	  			.find('.moreNavigators')
	  			.hide();
	  		}

	  	}
	  }

	  , initBrowseList: function() {
 
	  	$browse = $('#spl-browse-list');
	  	if ( $browse && 0 != $browse.length ) {
	  		//$browse.html('<div>browse list</div>');
	  		$.ajax({ 
			    url: 'https://app.spokanelibrary.org/v3/ent-carousel'
		    , data: {  }
		    ,type: 'POST'
		    ,dataType: 'json'
		    ,dataType: 'jsonp'
		    ,jsonp: 'callback'
			  })
			  .done(function(obj) {  
			  	//_self.loadCarousel(obj);
			  	if ( obj.error) {
			  		//console.log('this is an error');
			  	} else {
			  		//console.log(obj);
			  		_self.loadBrowseList(obj);
			  	}
			  })
			  .fail(function() {
			  });
	  	}
	  }

	  , loadBrowseList: function(list) {
	  	//console.log(list);

	  	var listSize = 5;
	  	var material = ['star-fiction', 'star-non-fiction', 'dvd-new', 'music'];

	  	var group = '#spl-browse-group';
	  	$browse = $('#spl-browse-list');
	  	
	  	html = '';
			html += '<div class="spl-row">';
			html += '<div class="spl-col spl-col-12">';
			html += '<div class="spl-panel spl-panel-primary spl-new-material">';
			html += '<div class="spl-panel-heading">';
			
			html += '<a class="spl-white spl-normal" href="http://www.spokanelibrary.org/browse/">Browse&nbsp;popular&nbsp;titles&nbsp;<small>&rarr;</small></a>';
			html += ' &nbsp;&nbsp;&nbsp; ';
			html += '<a class="spl-white spl-normal" href="http://www.spokanelibrary.org/new/">Browse&nbsp;new&nbsp;materials&nbsp;<small>&rarr;</small></a>';


			html += '</div>';
			html += '<div class="spl-panel-body" style="padding-bottom: 16px;">';
			
			html += '<div class="spl-row spl-btn-row">';
			
			html += '<div class="spl-col spl-col-3">';
			html += '<div class="spl-center">';
			html += '<a class="button" href="http://www.spokanelibrary.org/browse/star-fiction/">Fiction</a>';
			html += '</div>';
			html += '</div>';

			html += '<div class="spl-col spl-col-3">';
			html += '<div class="spl-center">';
			html += '<a class="button" href="http://www.spokanelibrary.org/browse/star-non-fiction/">Non-Fiction</a>';
			html += '</div>';
			html += '</div>';

			html += '<div class="spl-col spl-col-3">';
			html += '<div class="spl-center">';
			html += '<a class="button" href="http://www.spokanelibrary.org/browse/dvd-new/">DVDs</a>';
			html += '</div>';
			html += '</div>';

			html += '<div class="spl-col spl-col-3">';
			html += '<div class="spl-center">';
			html += '<a class="button" href="http://www.spokanelibrary.org/browse/music/">Music</a>';
			html += '</div>';
			html += '</div>';

			html += '</div>';
			html += '<div class="spl-clearfix"></div>';

			html += '<div id="spl-browse-more" class="spl-callout-bar" style="margin-bottom:16px; display:none;">';
			html += '<p class="spl-center">';
			html += '<a class="spl-browse-reload" href="#"><b>Show me some different titles</b></a>';
			html += '</p>';
			html += '</div>';

			html += '<div id="spl-browse-group">';
			$.each(list, function(g,group) {
				html += '<div class="spl-row spl-browse-group-list" id="spl-browse-group-list-'+g+'">';

				$.each(material, function(t,type) {
					html += '<div class="spl-col spl-col-3">';
					html += '<div class="spl-center">';
					html += '<a href="http://www.spokanelibrary.org'+group.list[type].item.url+'"><img style="max-height:120px;" class="spl-img-responsive spl-img-rounded" src="'+group.list[type].item.img+'"></a>';
					html += '<p>';
					html += '<a href="http://www.spokanelibrary.org'+group.list[type].item.url+'"><small><b>'+group.list[type].item.title+'</b></small></a>';
					html += '</p>';
					if ( null != group.list[type].item.author && null != typeof(group.list[type].item.author) ) {
						html += '<small>'+group.list[type].item.author+'</small>';
					}
					html += '</div>';
					html += '</div>';
				});

				html += '<div class="spl-clearfix">&nbsp;</div>';
				
				html += '</div>';
			});
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			
			$browse.html(html).hide();
			$(group + ' > div:gt(0)').hide();
			$browse.show();

			$('.spl-browse-reload').click( function(e) {
				e.preventDefault();
				_self.initBrowseList();
			});

			var i = 1;
			var slideInterval = setInterval(function() { 
					if ( i < listSize ) { 
					  $(group + ' > div:last')
					    .hide()
					    .prependTo(group)
					    //.next()
					    .slideDown('slow')
					    .end()
					    //.appendTo(group)
					    //.show();
					    /*
					    .hide()
					    .next()
					    .slideDown('slow')
					    .end()
					    .appendTo(group)
					    .show();
					  	*/
					  i++;
					} else {
						clearInterval(slideInterval);
						$('#spl-browse-more').slideDown();
					}
				},  8000);

			/*
			setInterval(function() { 
				  $(group + ' > div:first')
				    .hide()
				    .next()
				    .fadeIn(500)
				    .end()
				    .appendTo(group);
				},  8000);
			*/

	  }

	  , initCarousel: function() {
	  	$carousel = $('#spl-carousel');
		  if ( $carousel && 0 != $carousel.length ) {
		  	
		  	$.ajax({ 
			    url: this.config.endpoint.spl+'/new/' //'renew' //'trace'
		    , data: {  menu: 'all' }
		    ,type: 'POST'
		    ,dataType: 'json'
		    ,dataType: 'jsonp'
		    ,jsonp: 'callback'
			  })
			  .done(function(obj) {  
			  	_self.loadCarousel(obj);
			  })
			  .fail(function() {
			  });
		  }
	  }

	  , loadCarousel: function(bibs) {
	  	//$('.spl-browse-list').html('browse list');
	  	//console.log('browse-list');
	  	if ( bibs ) {
	  		//console.log(bibs);
	  		var bibsList = bibs
	  									.group
	  									.sort(function() { return 0.5 - Math.random() })
	  									.slice(0,25);
	  		
	  		var $carousel = $('#spl-carousel');
	  		var carousel = '';
	  		
	  		/*
	  		carousel += '<div class="spl-btn-row">';
				carousel += '<a class="button" href="http://www.spokanelibrary.org/new/">';
				carousel += 'See more new material &rarr;';
				carousel += '</a>';
				carousel += '</div>';

				carousel += '<h4 class="spl-center spl-muted">Recently added</h4>';
				*/
	  		carousel += '<div id="spl-carousel-slides">';
	  		$.each(bibsList, function(b,bib) {
	  			var isbn = false;
	  			if ( bib.isbn && bib.isbn[0] ) {
	  				isbn = bib.isbn[0];
	  			}
	  			carousel += '<div>';
	  			if ( isbn && isbn.length > 0 ) {
		  			carousel += '<div class="spl-center">';
	  				carousel += '<a href="/client/pub/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:'+bib.item.bib+'/ada?te=ILS">';
	  				carousel += '<img class="spl-img-responsive spl-img-rounded spl-img-bordered" src="http://www.syndetics.com/index.aspx?type=xw12&client=SPOKP&upc=&oclc=&isbn='+isbn+'/LC.JPG" alt="No cover image" title="">';
	  				// /carousel += '<img class="spl-img-responsive spl-img-rounded spl-img-bordered" src="http://contentcafe2.btol.com/ContentCafe/jacket.aspx?UserID=ebsco-test&Password=ebsco-test&Return=T&Type=M&Value='+isbn+'" alt="No cover image available">';
	  				carousel += '</a>';
	  				carousel += '</div>';
  				}
  				carousel += '<small>';
  				carousel += '<a href="/client/pub/search/detailnonmodal/ent:$002f$002fSD_ILS$002f0$002fSD_ILS:'+bib.item.bib+'/ada?te=ILS">';
  				carousel += bib.item.title + ' &rarr;';
					carousel += '</a>';
  				carousel += '</small>';
  				if ( bib.item.author ) {
  					/*
			  		carousel += '<h4>';
			  		carousel += bib.item.author;
			  		carousel += '</h4>';
			  		*/
			  	}
			  	carousel += '</div>';
	  		});
	  		carousel += '</div>';
	  		
	  		/*
	  		carousel += '<div class="spl-btn-row">';
				carousel += '<a class="button" href="http://www.spokanelibrary.org/new/">';
				carousel += 'See more new material &rarr;';
				carousel += '</a>';
				carousel += '</div>';
				*/

	  		$carousel.html(carousel).hide();
				$("#spl-carousel-slides > div:gt(0)").hide();
				$carousel.show();

				setInterval(function() { 
				  $('#spl-carousel-slides > div:first')
				    .hide()
				    .next()
				    .fadeIn(500)
				    .end()
				    .appendTo('#spl-carousel-slides');
				},  8000);


	  	}
	  } 

  };

  SPL.init();
  

});
