/**
 * This module adds a copy button to all code examples in the docs.
 */

!function() {

// Look for code samples and set up a copy button on each
$('[data-docs-code]').each(function(index, value) {
  var copyBtnId = 'copy-btn-' + index.toString();
  var $button = $('<button class="docs-code-copy" id="' + copyBtnId + '">Copy</button>');

  var text = $(this).find('code').text()
    .replace('&lt;', '<')
    .replace('&gt;', '>');

  $(this).prepend($button);

  $(document).on('click', '#' + copyBtnId, function() {
    navigator.clipboard.writeText(text).then(function() {
      // Change the text of the copy button when it's clicked on
      $button.text('Copied!');
      window.setTimeout(function() {
        $button.text('Copy');
      }, 3000);
    }, function() {
      // Log errors on copy failure
      console.error('Action:', event.action);
      console.error('Trigger:', event.trigger);
    });
  });

});

}();

/**
 * This module activates on a Kitchen Sink page, and changes how code examples are rendered.
 * The code example is hidden, and can be revealed with a toggle.
 */

!function() {

var $ks = $('#docs-kitchen-sink');
if (!$ks.length) return;

$ks.find('[data-ks-codepen]').each(function() {
  var $codepen = $(this);
  var $code = $codepen.next('[data-docs-code]');

  $link = $('<a class="docs-code-toggle">Toggle Code</a>');
  $link.on('click.docs', function() {
    $codepen.slideToggle(250);
    $code.slideToggle(250);
  });
  $link.insertBefore(this);
  $code.addClass('kitchen-sink').hide(0);
  $codepen.addClass('kitchen-sink').hide(0);
});

}();

/**
 * This module sets up the search bar.
 */

!function() {

var source = {
  // Only show 10 results at once
  limit: 10,

  // Function to fetch result list and then find a result;
  source: function(query, sync, async) {
    query = query.toLowerCase();

    $.getJSON('./data/search.json', function(data, status) {
      async(data.filter(function(elem, i, arr) {
        var name = elem.name.toLowerCase();
        var terms = [name, name.replace('-', '')].concat(elem.tags || []);
        for (var i in terms) if (terms[i].indexOf(query) > -1) return true;
        return false;
      }));
    });
  },

  // Name to use for the search result itself
  display: function(item) {
    return item.name;
  },

  templates: {
    // HTML that renders if there are no results
    notFound: function(query) {
      return '<div class="tt-empty">No results for "' + query.query + '".</div>';
    },
    // HTML that renders for each result in the list
    suggestion: function(item) {
      return '<div><span class="name">' + item.name + '<span class="meta">' + item.type + '</span></span> <span class="desc">' + item.description + '</span></div>';
    }
  }
}

// Search
$('[data-docs-search]')
  .typeahead({ highlight: false }, source)
  .on('typeahead:select', function(e, sel) {
    window.location.href = sel.link;
  });

// Auto-highlight unless it's a phone
if (!navigator.userAgent.match(/(iP(hone|ad|od)|Android)/)) {
  $('[data-docs-search]').focus();
}

}();

/**
 * This module generates a table of contents from the <h2>s on a page.
 */

!function() {

var $h2s = $('.docs-component h2');
var $toc = $('[data-docs-toc]');

$h2s.each(function () {
  var $title = $(this);
  // Ignore <h2>s inside of a rendered code sample
  if ($title.parents('.docs-code-live').length) return;

  // Get the text in the title without the nested HTML
  // https://stackoverflow.com/a/33592275
  var $topLevelTitle = $title.clone().children().remove().end();
  var text = $topLevelTitle.text();

  var anchor = $title.children('a').attr('href');

  $toc.append('<li><a href="'+anchor+'">'+text+'</a></li>');
});

}();

//var $window = $(window);
//var $container = $('.docs-component');
//var $TOC = $('#docsToc');
//var $TOCparent = $TOC.parent();
//
//if($TOC.is('*')) {
//  var fixedTop = $container.offset().top;
//  var innerHeight = 0;
//  $container.children().each(function() {innerHeight += $(this).height()});
//  var containerHeight = $container.height();
//  var handler = function() {
//    var tocHeight = $TOC.height();
//    var parentOffset = $TOCparent.offset().top;
//    var windowScroll = $window.scrollTop();
//    var containerScroll = $container.scrollTop();
//    var visibleNav = (containerHeight + fixedTop) - windowScroll;
//
//    if (visibleNav < tocHeight || containerScroll + tocHeight >= innerHeight) {
//      $TOC.removeClass('is-fixed');
//      $TOC.addClass('is-docked').css({top: 'auto'});
//    } else if ((windowScroll > fixedTop && parentOffset < windowScroll)|| (parentOffset < fixedTop - windowScroll)) {
//      var offset = Math.max(fixedTop - windowScroll, 0)
//      $TOC.removeClass('is-docked');
//      $TOC.addClass('is-fixed').css({top: offset});
//    } else {
//      $TOC.removeClass('is-fixed');
//      $TOC.removeClass('is-docked');
//    }
//  };
//  $(document).on('load scroll', handler);
//  $container.on('scroll', handler);
//}

(function() {
  var prev = 0;
  var $window = $(window);
  var nav = $('.docs-sticky-top-bar');

  $window.on('scroll', function(){
    var scrollTop = $window.scrollTop();
    nav.toggleClass('mobile-hidden', scrollTop > prev && scrollTop > 100);
    prev = scrollTop;
  });

  $('#inline-search').on('on.zf.toggler', function() {
    $(this).find('input').focus();
    $('.search-button').addClass('search-open');
  });
  $('#inline-search').on('off.zf.toggler', function() {
    $(this).find('input').blur();
    $('.search-button').removeClass('search-open');
  });
})();

// From http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

// 2. This code loads the IFrame Player API code asynchronously.
if ($('#main-video').is('*')) {
  var $videoOuter = $('#subpage-intro-video');
  var $videoInner = $videoOuter.find('.docs-video-inner');
  var $videoOverlay = $videoOuter.find('.video-overlay');
  var videoId = $('#main-video').data().video;
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube mainPlayer)
  //    after the API code downloads.
  var mainPlayer, embeddedPlayers = [];

  function onYouTubeIframeAPIReady() {
    mainPlayer = new YT.Player('main-video', {
      height: '385',
      width: '690',
      videoId: videoId,
      playerVars: {showinfo: '0'},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    $('[data-linkable-video]').each(function() {
      var $vid= $(this);
      var id = this.id;
      var videoId = $vid.data().linkableVideo;
      embeddedPlayers.push({id: id, video: videoId, player: new YT.Player(id, {
        events: {
          'onReady': onPlayerReady
        }
      })});
    });
  }

  // 4. The API will call this function when the video mainPlayer is ready.
  function onPlayerReady(event) {
    if(QueryString.video == videoId) {
      mainPlayer.playVideo();
    } else if(QueryString.video) {
      for(var i = 0; i < embeddedPlayers.length; i++) {
        if(QueryString.video == embeddedPlayers[i].video) {
          $(window).scrollTop($('#' + embeddedPlayers[i].id).offset().top - 200);

          // Don't show the main vid if we're autoplaying a different one.
          $videoInner.removeClass('autostick').removeClass('expanded');
          $videoOverlay.removeClass('expanded');
          embeddedPlayers[i].player.playVideo();
        }
      }
    }
  }

  // 5. The API calls this function when the mainPlayer's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the mainPlayer should play for six seconds and then stop.
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      $videoInner.addClass('playing').addClass('autostick');
    } else {
      $videoInner.removeClass('playing');
    }
  }

  var $window = $(window);
  
  $(window).on("scroll", function() {
    var videoOffset = $videoOuter.offset().top;
    var videoHeight = $videoOuter.height();
    var myScrollPosition = $(this).scrollTop();
 
    if (myScrollPosition > (videoOffset + videoHeight - 300)) {
      $videoInner.addClass('is-stuck');
      $videoOverlay.addClass('is-stuck');
    } else {
      $videoInner.removeClass('is-stuck');
      $videoOverlay.removeClass('is-stuck');
    }
  });

  $('[data-close-video]').on('click', function() {
    mainPlayer.stopVideo();
    $videoInner.removeClass('autostick').removeClass('expanded');
    $videoOverlay.removeClass('expanded');
  });

  $('[data-expand-contract-video]').on('click', function() {
    $videoInner.toggleClass('expanded');
    $videoOverlay.toggleClass('expanded');
  });

  var getSeconds = function(link) {
    var time = $(link).data().openVideo;
    var sections = String(time).split(':');
    var seconds;
    if(sections.length > 1) { 
      seconds = (60 * Number(sections[0])) + Number(sections[1]);
    } else {
      seconds = Number(sections[0]);
    }
    return seconds;
  }
  var href = $('#docs-mobile-video-link').attr('href');
  $('[data-open-video]').each(function() {
    var seconds = getSeconds(this);
    this.href = href + '&t=' + seconds;
    this.target = '_blank';
  });

  $('[data-open-video]').on('click', function(e) {
    if(Foundation.MediaQuery.is('small only')) {
      return;
    }
    e.preventDefault();
    var seconds = getSeconds(this)
    mainPlayer.seekTo(seconds, true);
    mainPlayer.playVideo();
    $videoOverlay.addClass('expanded');
    $videoInner.addClass('expanded').addClass('autostick');
  });
}


!function() {

var $currentText = $('[data-docs-code-current]');
var $toggleButtons = $('[data-docs-code-toggle]');

$toggleButtons.click(function(e) {
  e.preventDefault();
  $('body').toggleClass('is-inky-enabled');

  if ($('body').hasClass('is-inky-enabled')) {
    $currentText.text('Inky');
    $toggleButtons.text('Switch to HTML');
  }
  else {
    $currentText.text('HTML');
    $toggleButtons.text('Switch to Inky');
  }
});

}();

$(function() {
  // TODO: Add alternate between advanced and intro
  var topic = $('h1.docs-page-title').text();
  var header = 'Master ' + topic;
  var body = 'Get up to speed FAST, learn straight from the experts who built Foundation for Emails.';
  var link = 'https://zurb.com/university/responsive-emails-foundation?utm_source=Foundation%20Docs&utm_medium=Docs&utm_content=Struggling&utm_campaign=Docs%20To%20Emails';
  var cta = 'Learn More';

  var html = '<div class="ad-unit"><h3 class="ad-unit-title">' + header + '</h3>' +
             '<p class="ad-unit-text">' + body + '</p>' +
             '<a class="button ad-unit-button" href="' + link+ '">' +
             cta + '</a></div>';
  $('#TOCAdUnit').html(html);

});

$(document).foundation();
