(function () {

  var hiddenState = true;
  var $tocBtn = $("#toc-toggle");
  var $tocCont = $(".toc-container");
  var $body = $("body");
  var $header = $(".site-header");
  var $tocCaret = $(".site-header").find('#nav-caret');
  var $ddCaret = $("#dash").find("#nav-caret-dash-a");
  var lastScrollTop = 0, delta = 5;
  var ddShown = false;
  // UI Bindings, Scroll bindings and resize bindings
  $tocBtn.click(function (e) {
    e.preventDefault();

    if (hiddenState) {
      $tocCont.removeClass("toc-hidden");
      $tocCont.addClass("toc-shown");
      $body.addClass("locked");
      $tocCaret.addClass("fa-rotate-180");
      hiddenState = false;
    }
    else {
      $tocCont.removeClass("toc-shown");
      $body.removeClass("locked");
      $tocCont.addClass("toc-hidden");
      $tocCaret.removeClass("fa-rotate-180");
      hiddenState = true;
    }
  });

  $('#dash').on('click', '#nav-caret-dash-a', function(e) {

    e.preventDefault();
    if (!ddShown) {
      $("#dash-dropdown").addClass("shown").removeClass("hidden");
      $("#nav-caret-dash").addClass("fa-rotate-180");
      ddShown = true;
    }
    else {
      $("#dash-dropdown").addClass("hidden").removeClass("shown");
      $("#nav-caret-dash").removeClass("fa-rotate-180");

      ddShown = false;
    }
  });
  var urlPath = window.location.hash;


  $('#dash').on('click', '#switch-dash1', function(e) {
    e.preventDefault();
    // history.replaceState({}, document.title, "/");
    window.location.hash = "#kpi";

    ddShown = false;
  });

  $('#dash').on('click', '#switch-dash2', function(e) {
    e.preventDefault();
    window.location.hash = "#parsing";
    ddShown = false;
  });

  var updateHeader = function(event){
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta)
      return;
    if (st < 0) {
      $header.removeClass("hidden");
      $header.addClass("shown");
    }
    else if (st > lastScrollTop){
      // downscroll code
      $header.removeClass("shown");
      $header.addClass("hidden");
    }
    else {
      // upscroll code
      $header.removeClass("hidden");
      $header.addClass("shown");
    }
    lastScrollTop = st;
  };

  var throttled = _.throttle(updateHeader, 100);
  $(window).scroll(throttled);

  // init Core with the config
  if (urlPath == '#parsing') {
    dashboard.Core.init(dashboard.config, 1);
  }
  else if (urlPath == '#kpi') {
    dashboard.Core.init(dashboard.config, 0);
  }
  else if (window.location.href == ("http://" + window.location.host + "/") || window.location.href == ("https://" + window.location.host + "/")) {
    window.location.hash = "#parsing";
   // dashboard.Core.init(dashboard.config, 1);
  }
  else {
    window.location.hash = "";
    console.log(window.location.href, window.location.host);
    //dashboard.Core.init(dashboard.config, 1);
  }

  $(window).resize(function(){
    dashboard.Core.calcMargins();
  });

  window.addEventListener('popstate', function(event)
  {
    var urlPath = window.location.hash;
    console.log("pop");
    // init Core with the config
    if (urlPath == '#parsing') {
      dashboard.Core.init(dashboard.config, 1);
    }
    else if (urlPath == '#kpi') {
      dashboard.Core.init(dashboard.config, 0);
    }
    else if (urlPath == '') {
      window.location.hash = "";
      //dashboard.Core.init(dashboard.config, 1);
    }
  });

})();