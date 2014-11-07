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
            console.log("cbill");
            BillsPage.cleanPage();
            break; 
          case WhatPageEnum.HOME:
            console.log("chome");
            HomePage.cleanPage();
            break; 
          case WhatPageEnum.ABOUT:
            console.log("cabout");
            AboutPage.cleanPage();
            break; 
          case WhatPageEnum.GAINS:
            console.log("c_gains");
            GainsPage.cleanPage();
            break;
        }
        currentPage = WhatPageEnum.NONE;
      }

      var Workspace = Backbone.Router.extend({

        routes: {
          "": "homeAction",
          "about": "aboutAction",
          "bills": "billsAction",
          "gains": "gainsAction",
        },

        homeAction: function() {
          cleanPage();
          HomePage.makePage();
          currentPage = WhatPageEnum.HOME;
        },

        gainsAction: function() {
          cleanPage();
          GainsPage.makePage();
          currentPage = WhatPageEnum.GAINS;
        },

        billsAction: function() {
          cleanPage();
          BillsPage.makePage();
          currentPage = WhatPageEnum.BILLS;
        },

        aboutAction: function() {
          cleanPage();
          AboutPage.makePage();
          currentPage = WhatPageEnum.ABOUT;
        }

      });

      window.workspase = new Workspace();
      $(".main-menu a").click(function(event) {
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


