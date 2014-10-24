(function() {

  var App = {
    init: function() {
      console.log("init");
      var Workspace = Backbone.Router.extend({

        routes: {
          "": "homeAction",
          "about": "aboutAction"
        },

        homeAction: function() {
          console.log("homeAction");
          $('#container').html('<h1>Main action</h1>');
        },

        aboutAction: function() {
          console.log("aboutAction");
           $('#container').html('<h1>About action</h1>');
        }

      });

      window.workspase = new Workspace();
      
      var listView = new ListView();
      listView.setCollection(collection);

      $("#container-down").append($('#tpl-btn-add').html());
      $("#container-down").append($('#tpl-popwindow-add').html());
      $("#bills-btn-add").click(function() {
        if($("#bills-in-sum").val()) 
          name = $("#bills-in-name").val() || "default"
          listView.addItem(name, +$("#bills-in-sum").val());
      });

      window.listView = listView;
      
      $(".main-menu a").click(function(event){
        console.log($(this).attr("href"));
        event.preventDefault();
        Backbone.history.navigate($(this).attr("href"), {
          trigger: true
        });
      });

      Backbone.history.start();
    }

  }
  $(App.init);

})();


