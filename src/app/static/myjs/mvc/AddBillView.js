(function() {

  var body = 
' <form> \
      <div class="form-group"> \
          <input type="text" class="form-control name" placeholder="Name"> \
      </div> \
      <div class="form-group"> \
          <input type="number" class="form-control sum" placeholder="Sum"> \
      </div> \
  </form>';

  var footer = 
' <button type="button" class="btn btn-primary add" data-dismiss="modal">Add</button> \
  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';


  var AddBillBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);

      this.on("click:add", function(){
        name = $(".name", $(this.el)).val();
        sum = $(".sum", $(this.el)).val();
        if(name && sum != undefined)
          this.options.listView.addItem(name, sum);
      }, this);

      this.render();
    },

    render: function() {
      $(this.el).html(body);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var AddBillFooter = Backbone.View.extend({

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

  window.AddBillBody = AddBillBody;
  window.AddBillFooter = AddBillFooter;

})();