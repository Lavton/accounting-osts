/**
 * Created by 40in on 10.10.14.
 */
(function() {

    var App = {

        init: function() {
            console.log('app init');

            var Workspace = Backbone.Router.extend({

                routes: {
                    "home":         "homeAction",
      //              "about":        "aboutAction",
                    "gaining":      "gainAction",
                },

                homeAction: function() {
                    AccountsPage.init();
                },

//                aboutAction: function() {
  //                  $('#content').html('<h1>About action</h1>');
    //            },
                gainAction: function() {
                    $('#content').html('<h1>Gain action</h1>');
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
                    user_id: '1',
                    v: 5.25,
                    access_token: 'czGJs8MdzeBDjPJoB368'
                };

                $.ajax({
                    method: 'get',
                 //   url: 'https://api.vk.com/method/users.get',
                   // data: vk,
                   url: 'https://oauth.vk.com/authorize?client_id=4602552&redirect_uri=http://example.com/callback&scope=12&display=mobile',
                    dataType: 'jsonp'
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


