

var mobile_menu_opened = false;

$(document).ready(function() 
{
    $(document).mouseup(function(e){
        
        if(mobile_menu_opened) 
        {
            var menu = $('#nav_panel');
            var toggleButton = $('#toggleButton');

            if (!menu.is(e.target) && !toggleButton.is(e.target) && menu.has(e.target).length === 0)
            {
                toggleMenu();
            }
        }
    });
});

var toggleMenu = () => {

    var panel = $('#nav_panel');

    panel.toggleClass("active");
    $('body').toggleClass("fixed-position");

    mobile_menu_opened = !mobile_menu_opened;

    if(mobile_menu_opened) { // show
        panel.show();
        panel.removeClass("out").addClass("active");
    }
    else { // hide
        panel.removeClass("active").addClass("out");

        setTimeout(function() {
            panel.hide();
            
        }, 300); // same time as animation
    }
}
