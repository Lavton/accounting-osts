(function() {

  var body = 
' <div class="bill-transactions"> \
    <table class="table table-bordered table-striped"></table> \
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
      this.listView = new ListView({
        el: $(".table", $(this.el)),
        collection: transactionCollection,
        view: TransactionClickView
      });
      return this;
    },

    unrender: function() {
      this.listView.unbind();
      this.listView.stopListening();
      this.listView.remove();
      this.listView = null;
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