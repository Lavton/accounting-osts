(function() {

  var App = {

    init: function() {
      console.log("init");
      var WhatPageEnum = {
        BILLS: 0,
        HOME: 1,
        ABOUT: 2,
        GAINS: 3,
        NONE: 4,
      };

      var currentPage = WhatPageEnum.HOME;

      cleanPage = function(){
        switch (currentPage) {
          case WhatPageEnum.BILLS:
            $(".route-bills").removeClass("active");
            BillsPage.cleanPage();
            break; 
          case WhatPageEnum.HOME:
            $(".route-home").removeClass("active");
            HomePage.cleanPage();
            break; 
          case WhatPageEnum.ABOUT:
            $(".route-about").removeClass("active");
            AboutPage.cleanPage();
            break; 
          case WhatPageEnum.GAINS:
            $(".route-gains").removeClass("active");
            GainsPage.cleanPage();
            break;
        }
        currentPage = WhatPageEnum.NONE;
      }

      var Workspace = Backbone.Router.extend({

        routes: {
          "": "homeAction",
          "gains": "gainsAction",
          "about": "aboutAction",
          "bills": "billsAction"
        },

        homeAction: function() {
          cleanPage();
          $(".route-home").addClass("active");
          HomePage.makePage();
          currentPage = WhatPageEnum.HOME;
        },

        billsAction: function() {
          cleanPage();
          $(".route-bills").addClass("active");
          BillsPage.makePage();
          currentPage = WhatPageEnum.BILLS;
        },

        aboutAction: function() {
          cleanPage();
          $(".route-about").addClass("active");
          AboutPage.makePage();
          currentPage = WhatPageEnum.ABOUT;
        },

        gainsAction: function() {
          cleanPage();
          $(".route-gains").addClass("active");
          GainsPage.makePage();
          currentPage = WhatPageEnum.GAINS;
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


