(function(){
  this.gainView = null;

  var Controller = {

    makePage: function() {
      $("#container").append("<div id='gains-div'></div>");
        this.gainView = new CategoriesView({
          el: $("#gains-div"),
          cCollection: categoryCollection,
          type:'g'
        });
    },
  
    cleanPage: function() {
      $(".content").html("");
    }
  }
  window.GainsPage = Controller;
})();