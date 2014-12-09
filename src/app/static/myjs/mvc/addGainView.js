(function() {
  var gainViewFrom = null;
  var gainViewTo = null;
  var sum = 0;

  var body = 
  '<input type="text" value="" id="num_gain">\
  sum\
  </input>\
  <table class="whole_length">\
        <tr><td>откуда</td><td>куда</td></tr>\
        <tr><td>\
        <div id="from_g" class="centered"></div>\
        </td><td>\
        <div id="to_g" class="centered"></div>\
        </td></tr>\
        </table>';

  var footer = 
' <button type="button" class="btn btn-primary add" data-dismiss="modal">Add</button> \
  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';


  var AddGainBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);

/*      this.on("click:add", function(){
        name = $(".name", $(this.el)).val();
        sum = $(".sum", $(this.el)).val();
        if(name && sum != undefined)
          this.options.listView.addItem(name, sum);
      }, this);
*/
      this.render();
    },

    render: function() {
      $(this.el).html(body);
      gainViewFrom = new BillJsTreeView({el: $("#from_g"),
        collection: collection,
      });
      gainViewTo = new CategoriesView({el: $("#to_g"),
        cCollection: categoryCollection,
        type: "gains"
      });
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var AddGainFooter = Backbone.View.extend({

    events: {
      'click button.add': function() {
        this.trigger("click:add");
      }
    },

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.on("click:add", function() {
        var from = $("#from_g").jstree(true);
        var from_id = from.get_selected()[0];
        var to = $("#to_g").jstree(true);
        var from_id = from.get_selected()[0];
        var to_id = to.get_selected()[0];
        sum = $("#num_gain").val()*1;
        var mod_from = gainViewFrom.collection.where({"indef": from_id})[0];
        console.log(mod_to);
        mod_from.set({"sum": (1*mod_from.get("sum") - sum)})
        while (to_id != "#") {
          var mod_to = gainViewTo.collection.where({"indef": to_id})[0];
          mod_to.set({"sum": (1*mod_to.get("sum") + sum)})
          to_id = mod_to.get("parent");
        }
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

  window.AddGainBody = AddGainBody;
  window.AddGainFooter = AddGainFooter;

})();