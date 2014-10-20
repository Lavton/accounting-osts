/**
 * Created by 40in on 17.10.14.
 */
(function() {

    var Accounts = Backbone.Collection.extend({

    });

    var accounts;

    var Controller = {



        init: function() {
            accounts = new Accounts();
            accounts.sync();
        }
    };

    window.AccountsPage = Controller;

})();