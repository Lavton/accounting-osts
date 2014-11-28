(function() {


var Base = function() {};
var base = new Base();

BaseExtended = function() {};

BaseExtended.prototype = $.extend({}, Base.prototype, {
  init: function() {},
  c: '123'
});

  var App = {

    init: function() {
      console.log("init");
      var WhatPageEnum = {
        BILLS: 0,
        HOME: 1,
        ABOUT: 2,
        GAINS: 3,
        INCOMES: 5,
        NONE: 4,
      };

      var currentPage = WhatPageEnum.HOME;

      cleanPage = function(){
        $(".main-menu>li").removeClass("active");
        switch (currentPage) {
          case WhatPageEnum.BILLS:            
            BillsPage.cleanPage();
            break; 
          case WhatPageEnum.HOME:
            HomePage.cleanPage();
            break; 
          case WhatPageEnum.ABOUT:
            AboutPage.cleanPage();
            break; 
          case WhatPageEnum.GAINS:
            GainsPage.cleanPage();
            break;
          case WhatPageEnum.INCOMES:
            IncomesPage.cleanPage();
            break;
        }
        currentPage = WhatPageEnum.NONE;
      }

      var Workspace = Backbone.Router.extend({

        routes: {
          "": "homeAction",
          "gains": "gainsAction",
          "incomes": "incomesAction",
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
        },

        incomesAction: function() {
          cleanPage();
          $(".route-incomes").addClass("active");
          IncomesPage.makePage();
          currentPage = WhatPageEnum.INCOMES;
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


