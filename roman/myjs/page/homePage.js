(function(){

  var Controller = {

    makePage: function() {
      $('#container').html('<h1>Main action</h1>');
    },

    cleanPage: function() {
      $(".content").html("");
    }
  }

  window.HomePage = Controller;
})();