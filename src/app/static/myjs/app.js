(function() {

  var App = {

    init: function() {
      console.log("init");

      var isBills = false,
          isHome = true,
          isAbout = false;

      cleanPage = function(){
        if(isBills) {
          $(".route-bills").removeClass("active");
          BillsPage.cleanPage();
          isBills = !isBills;
        } else if(isHome) {
          $(".route-home").removeClass("active");
          HomePage.cleanPage();
          isHome = !isHome;
        } else if(isAbout) {
          $(".route-about").removeClass("active");
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
          $(".route-home").addClass("active");
          HomePage.makePage();
          isHome = true;
        },

        billsAction: function() {
          cleanPage();
          $(".route-bills").addClass("active");
          BillsPage.makePage();
          isBills = true;
        },

        aboutAction: function() {
          cleanPage();
          $(".route-about").addClass("active");
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


