(function() {

  var PopupBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.render();
    },

    render: function() {
      $(this.el).html("Body");
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var PopupFooter = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.render();
    },

    render: function() {
      btn = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
      $(this.el).html(btn);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var PopupView = Backbone.View.extend({

    el: $("body"),

    events: {
      'click .submit': function (argument) {
        this.options.contentView.trigger('submit');
      }
    },

    defaults: {
      title: "Name",
      body: PopupBody,
      footer: PopupFooter,
      data: {}
    },

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.render();
    },

    render: function() {
      var htmlCode = _.template($('#tpl-modal').html());
      $(this.el).html(htmlCode);

      $(".modal-title", $(this.el)).html(this.options.title);
      this.options.data.el = $(".modal-body", $(this.el));
      var body = new this.options.body(this.options.data);
      this.options.data.el = $(".modal-footer", $(this.el));
      var footer = new this.options.footer(this.options.data);

      footer.on("all", function(eventName, a, b, c, d, e, f) {
        body.trigger(eventName, a, b, c, d, e, f);
      });

      var popview = this;
      $('.modal').on('hidden.bs.modal', function (e) {
        body.unrender();
        footer.unrender();
        popview.unrender();
      });

      $('.modal').modal('show');
      return this;
    },

    unrender: function(){
      this.remove()
    }
  });


  window.PopupBody = PopupBody;
  window.PopupFooter = PopupFooter;
  window.PopupView = PopupView;

})();