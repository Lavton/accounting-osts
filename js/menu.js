/**
 * Created by 40in on 10.10.14.
 */
(function() {

    var structure = [{
        href: 'home',
        name: 'Home'
    }, {
        href: 'about',
        name: 'About'
    }];

    var Menu = {
        init: function() {
            var templateCode = $('#menu-tpl').html();
            var templateHtml = _.template(templateCode, {
                items: structure
            });
            $('#menu-container').empty().append(templateHtml);

            $('#menu-container a').click(function(event) {
                event.preventDefault();

                Backbone.history.navigate($(event.target).attr('href'), {
                    trigger: true
                });
            });
        }
    };

    window.Menu = Menu;

})();