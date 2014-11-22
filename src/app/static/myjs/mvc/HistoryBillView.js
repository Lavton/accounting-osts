(function() {

  var body = 
'   <table class="table table-bordered table-striped"> \
      <tr> \
        <td style="cursor:pointer;">From</td> \
        <td style="cursor:pointer;">To</td> \
        <td style="cursor:pointer;">Delta</td> \
        <td style="cursor:pointer;">Date</td> \
      </tr> \
    </table> \
  <div class="bill-transactions"> \
    <table class="table table-bordered table-striped ctable"></table> \
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
      indef = this.options.model.get("indef");
      this.listView = new ListView({
        el: $(".ctable", $(this.el)),
        collection: transactionCollection,
        view: TransactionClickView,
        selector: function(model) {
          return model.get("from") == indef || model.get("to") == indef;
        }
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