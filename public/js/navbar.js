var mobile_menu_opened=!1;$(document).ready(function(){$(document).mouseup(function(a){if(mobile_menu_opened){var o=$("#nav_panel"),n=$("#toggleButton");o.is(a.target)||n.is(a.target)||0!==o.has(a.target).length||e()}});var e=()=>{var e=$("#nav_panel");e.toggleClass("active"),$("body").toggleClass("fixed-position"),(mobile_menu_opened=!mobile_menu_opened)?(e.show(),e.removeClass("out").addClass("active")):(e.removeClass("active").addClass("out"),setTimeout(function(){e.hide()},301))}});