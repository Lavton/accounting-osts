(function(){

  var Controller = {

    makePage: function(){
      $('#container').html('<h1>About action</h1>');
    },

    cleanPage: function(){
      $(".content").html("");
    }
  }

  window.AboutPage = Controller;
})();