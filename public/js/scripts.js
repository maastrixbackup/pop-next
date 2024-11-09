jQuery(document).ready(function () {
  var offset = 220;
  var duration = 500;
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".back-to-top").fadeIn(duration);
    } else {
      jQuery(".back-to-top").fadeOut(duration);
    }
  });

  jQuery(".back-to-top").click(function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

$(document).ready(function () {
  var targetParent = $(".progress");
  targetParent.each(function () {
    //required variables
    var target = $(this).children();
    var offsetTop = $(this).offset().top;
    var winHeight = $(window).height();
    // var data_width = target.attr("aria-valuenow") + "%";

    //animation starts
    if (winHeight > offsetTop) {
      target.addClass("animateBar");
    }

    //animation with scroll
    $(window).scroll(function () {
      var scrollBar = $(this).scrollTop();
      var animateStart = offsetTop - winHeight;
      if (scrollBar > animateStart) {
        target.addClass("animateBar");
      }
    });
  });
});

jQuery(document).ready(function () {
  var offset = 220;
  var duration = 500;
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".back-to-top").fadeIn(duration);
    } else {
      jQuery(".back-to-top").fadeOut(duration);
    }
  });

  jQuery(".back-to-top").click(function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

$(document).ready(function () {
  try {
    $('[data-bs-toggle="tooltip"]').tooltip();
  } catch (error) {
    console.log(error);
  }
});

$( document ).ready(function() {
  new WOW().init()
});

!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js"
);
fbq("init", "704557541261516");
fbq("track", "PageView");

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-Z65XK2K459");

(function ($) {
  window.fnames = new Array();
  window.ftypes = new Array();
  fnames[0] = "EMAIL";
  ftypes[0] = "email";
  fnames[1] = "FNAME";
  ftypes[1] = "text";
  fnames[2] = "LNAME";
  ftypes[2] = "text";
  fnames[3] = "ADDRESS";
  ftypes[3] = "address";
  fnames[4] = "PHONE";
  ftypes[4] = "phone";
  fnames[5] = "BIRTHDAY";
  ftypes[5] = "birthday";
})(jQuery);
var $mcj = jQuery.noConflict(true);
