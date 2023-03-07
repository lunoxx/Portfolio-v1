var mobile_menu_opened = false;
var blocked_button = false;

$(document).ready(function() 
{

    // Hide panel if user click outside.
    $(document).mouseup(function(e){
        
        if(mobile_menu_opened) 
        {
            var menu = $('#nav_panel');
            var toggleButton = $('#toggleButton');

            if (!menu.is(e.target) && !toggleButton.is(e.target) && menu.has(e.target).length === 0)
            {
                toggleMenu( );
            }
        }
    });

});

async function toggleMenu() {

    if(blocked_button) return;

    var panel = $('#nav_panel');

    panel.toggleClass("active");
    $('body').toggleClass("fixed-position");

    mobile_menu_opened = !mobile_menu_opened;
    blocked_button = true;

    if(mobile_menu_opened) { // show
        panel.show();
        panel.removeClass("out").addClass("active");

        setTimeout(function() {

            blocked_button = false;

        }, 300);
    }
    else { // hide
        panel.removeClass("active").addClass("out");

        setTimeout(function() {
            panel.hide();
            blocked_button = false;

        }, 300); // same time as animation
    }
}