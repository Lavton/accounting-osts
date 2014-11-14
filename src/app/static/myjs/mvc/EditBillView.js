(function() {

  var body = 
' <form> \
    <input type="text" class="form-control name" placeholder="New bill name"> \
  </form>';

  var footer = 
' <button class="btn btn-danger delete" data-dismiss="modal" style="cursor:pointer;"> \
    Delete \
  </button> \
  <button type="button" class="btn btn-primary add" data-dismiss="modal" style="margin-left: 350px;"> \
    Confirm \
  </button> \
  <button type="button" class="btn btn-default" data-dismiss="modal"> \
    Close \
  </button>';


  var EditBillBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);

      model = this.options.model;

      this.on("click:edit", function() {
        if($(".name", $(this.el)).val() != model.get('name'))
          model.set({
            name: $(".name").val()
          });
      }, this);

      this.on("click:delete", function() {
        model.destroy();
      }, this);

      this.render();
    },

    render: function() {
      $(this.el).html(body);
      $(".name", $(this.el)).val(this.options.model.get("name"));
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var EditBillFooter = Backbone.View.extend({

    events: {
      'click button.add': function() {
        this.trigger("click:edit");
      },
      'click button.delete': function() {
        this.trigger("click:delete");
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

  window.EditBillBody = EditBillBody;
  window.EditBillFooter = EditBillFooter;

})();