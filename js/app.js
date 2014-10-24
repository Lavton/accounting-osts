/**
 * Created by 40in on 10.10.14.
 */
(function() {

    var App = {

        init: function() {
            console.log('app init');

            var Workspace = Backbone.Router.extend({

                routes: {
                    "home":         "homeAction",    // #help
                    "about":        "aboutAction"  // #search/kiwis
                },

                homeAction: function() {
                    AccountsPage.init();
                },

                aboutAction: function() {
                    $('#content').html('<h1>About action</h1>');
                }

            });

            window.workspase = new Workspace();

            Menu.init();

            $('.add').click(function() {
                var amount = $('.amount').val();
                var data = {
                    amount: amount,
                    date: '12.10.2014'
                };
                var vk = {
                    user_ids: 'lavton',
                    access_token: 'czGJs8MdzeBDjPJoB368'
                }

                $.ajax({
                    method: 'get',
                    url: 'https://api.vk.com/method/users.get',
                    data: vk
                }).done(function(json) {
                    console.log(json);
                    console.log('success');
                }).fail(function() {
                    console.log('fail');
                });
            });

            Backbone.history.start({
                pushState: true
            });

        }
    };

    $(App.init);

})();


