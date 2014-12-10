(function() {
  var incomeViewCat = null;
  var incomeViewBill = null;
  var sum = 0;

  var body = 
  '<input type="text" value="" id="num_income">\
  sum\
  </input>\
  <table class="whole_length">\
        <tr><td>категория</td><td>счёт</td></tr>\
        <tr><td>\
        <div id="cat" class="centered"></div>\
        </td><td>\
        <div id="bill" class="centered"></div>\
        </td></tr>\
        </table>';

  var footer = 
' <button type="button" class="btn btn-primary add" data-dismiss="modal">Add</button> \
  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';


  var AddIncomeBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.render();
    },

    render: function() {
      $(this.el).html(body);
      incomeViewBill = new BillJsTreeView({el: $("#bill"),
        collection: collection,
      });

      incomeViewCat = new CategoriesView({el: $("#cat"),
        cCollection: categoryCollection,
        type: "incomes"
      });
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var AddIncomeFooter = Backbone.View.extend({

    events: {
      'click button.add': function() {
        this.trigger("click:add");
      }
    },

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.on("click:add", function() {
        var cat = $("#cat").jstree(true);
        var cat_id = cat.get_selected()[0];
        var bill = $("#bill").jstree(true);
        var cat_id = cat.get_selected()[0];
        var bill_id = bill.get_selected()[0];
        sum = $("#num_income").val();
        var mod_bill = incomeViewBill.collection.where({"indef": bill_id})[0];
        if (isNaN(sum) || (sum == "") ||(sum*1 < 0)) {
          sum = 0;
          alert("Bad sum. Try again")
        }
        if (mod_bill == null) {
          alert("bill not selected")
        }
        if (cat_id == null) {
          alert("category not selected")
        }

        mod_bill.set({"sum": (1*mod_bill.get("sum") + sum)})
        while (cat_id != "#") {
          var mod_cat = incomeViewCat.collection.where({"indef": cat_id})[0];
          mod_cat.set({"sum": (1*mod_cat.get("sum") + sum)})
          cat_id = mod_cat.get("parent");
        }
        //debugger;
      }, this);
      this.render();
    },

    render: function() {
      $(this.el).html(footer);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
      $("body").trigger("close:adding")
    }
  });

  window.AddIncomeBody = AddIncomeBody;
  window.AddIncomeFooter = AddIncomeFooter;

})();