/**
 * Created by 40in on 10.10.14.
 */
(function() {

    var App = {

        init: function() {
            console.log('app init');
            Menu.init();

            $('.add').click(function() {
                var amount = $('.amount').val();
                var data = {
                    amount: amount,
                    date: '12.10.2014'
                };

                $.ajax({
                    method: 'post',
                    url: '/costs/resp.json',
                    data: data
                }).done(function(json) {
                    console.log(json);
                    console.log('success');
                }).fail(function() {
                    console.log('fail');
                });
            });

        }
    };

    $(App.init);

})();


