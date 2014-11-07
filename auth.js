/**
 * Created by 40in on 07.11.14.
 */
var Auth = {

    isAuth: function() {

        //1:
        var cookie = response.cookies.get('aid');
        if (!cookie) return false;

        //2:
        //login, pass, hash, id
        var user = DB.userGetByCookie(cookie);
        return user ? user : false;
    },

    authenticate: function(login, pass) {

        //1:
        var user = DB.getUserByPass(login, md5(pass));
        //or:
        //oauth request
        if (!user) {
            throw('User not found');
        }

        var hash = generateHash();

        DB.setUserData(user.id, {
            hash: hash
        });

        cookies.set('aid', hash);

    },

    logout: function() {
        cookies.set('aid', '');
    }

};


function billsGet() {

    if (!Auth.isAuth()) {

        return false;
    }

    var user = {
        id: 1
    };

    //select * from bills where user_id = 1;



}