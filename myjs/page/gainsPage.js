(function(){
  this.gainView = null;
  var Controller = {
    makePage: function() {
      $("#container").append("<div id='jstree'></div>");
      var gainView = new CategoriesView();
      $("#jstree").append(gainView.el)
      this.gainView = gainView;
      gainView.setCollection(categoryCollection);
    },
    cleanPage: function() {
      $(".content").html("");
    }
  }

  window.GainsPage = Controller;
})();