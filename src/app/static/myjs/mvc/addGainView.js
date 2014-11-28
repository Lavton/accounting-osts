(function() {

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
      var gainViewFrom = new BillJsTreeView({el: $("#from_g"),
        collection: collection,
      });

      var gainViewFrom = new CategoriesView({el: $("#from_g"),
      cCollection: categoryCollection,});

/*      var gainViewFrom = new BillListView({
        el: $("#from_g"),
        collection: collection,
        view: BillClickView
      });
*/      var gainViewTo = new CategoriesView({el: $("#to_g"),
      cCollection: categoryCollection,
    });

//      gainViewFrom.setCollection(categoryCollection);
      //gainViewTo.setCollection(categoryCollection);
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
      this.render();
    },

    render: function() {
      $(this.el).html(footer);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });

  window.AddGainBody = AddGainBody;
  window.AddGainFooter = AddGainFooter;

})();