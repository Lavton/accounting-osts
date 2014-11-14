(function() {

  var body = 
' <div class="bill-transactions"> \
    Here should be information about last transactions. \
  </div>';

  var footer = 
' <button type="button" class="btn btn-default" data-dismiss="modal"> \
    Close \
  </button>';


  var HistoryBillBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.render();
    },

    render: function() {
      $(this.el).html(body);
      $(".name").val(this.options.model.get("name"));
      for (var i = 0; i < 100; i++) {
        $(".bill-transactions", $(this.el)).append("<h6>Transction</h6>")
      }
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });


  var HistoryBillFooter = Backbone.View.extend({

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

  window.HistoryBillBody = HistoryBillBody;
  window.HistoryBillFooter = HistoryBillFooter;

})();