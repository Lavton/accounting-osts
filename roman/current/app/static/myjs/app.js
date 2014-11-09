(function() {

  var App = {

    init: function() {
      console.log("init");

      var isBills = false,
          isHome = false,
          isAbout = false;

      cleanPage = function(){
        if(isBills) {
          console.log("cbill");
          BillsPage.cleanPage();
          isBills = !isBills;
        } else if(isHome) {
          console.log("chome");
          HomePage.cleanPage();
          isHome = !isHome;
        } else if(isAbout) {
          console.log("cabout");
          AboutPage.cleanPage();
          isAbout = !isAbout;
        }
      }

      var Workspace = Backbone.Router.extend({

        routes: {
          "": "homeAction",
          "about": "aboutAction",
          "bills": "billsAction"
        },

        homeAction: function() {
          cleanPage();
          HomePage.makePage();
          isHome = true;
        },

        billsAction: function() {
          cleanPage();
          BillsPage.makePage();
          isBills = true;
        },

        aboutAction: function() {
          cleanPage();
          AboutPage.makePage();
          isAbout = true;
        }

      });

      window.workspase = new Workspace();
      $(".main-menu a").click(function(event) {
//        console.log($(this).attr("href"));
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


