(function(){

  var Controller = {

    makePage: function(){
      $('#container').html("<h1>Accounts-ost</h1>\
      	Hello and welcome to our beautiful project!<br/> \
      	If you don't know, how to save you incomes - stay with us!\
      	<br/><br/>\
      	authors: Vasiliev Roman and Lioznov Anton<br/>\
      	curator: Evgeny Sorokin\
      	");
    },

    cleanPage: function(){
      $(".content").html("");
    }
  }

  window.AboutPage = Controller;
})();