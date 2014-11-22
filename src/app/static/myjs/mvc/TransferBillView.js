(function() {

  var body = 
' <table class="table table-bordered table-striped"></table> \
  <h8 class="text"> </h8>';

  var footer = 
' <input type="number" class="delta" placeholder="Sum"> \
  <button type="button" class="btn btn-primary transfer"> \
    Transfer \
  </button> \
  <button type="button" class="btn btn-default" data-dismiss="modal"> \
    Close \
  </button>';


  var TransactionBillBody = Backbone.View.extend({

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.target = this.model;

      this.on("click:transfer", function(delta) {
        if(this.target != this.model) {
          this.target.set({
            sum: +this.target.get("sum") + +delta
          });
          this.model.set({
            sum: +this.model.get("sum") - +delta
          });
        } else {
          this.model.set({
            sum: +this.model.get("sum") + +delta
          });
        }

        transactionCollection.add({
          indef: (new Date()).getTime(),
          data: getDate(),
          from: this.model.get("indef"),
          fromClass: "bill",
          to: this.target.get("indef"),
          toClass: "bill",
          delta: delta
        });
      }, this);

      this.render();
    },

    render: function() {
      $(this.el).html(body);
      $(".text", $(this.el)).html("<span style='color:red;'>" + this.model.get("name")
       + "</span>");

      this.listView = new ListView({
        el: $(".table", $(this.el)),
        collection: this.options.collection,
        view: BillClickView
      });
      this.listView.on("click:select", function(newTarget) {
        this.target = newTarget;
        $(".text").html(this.target != this.model ? "<span style='color:red;'>" + 
          this.model.get("name") + "</span> -> <span style='color:blue;'>" + 
          this.target.get("name") + "</span>" : "<span style='color:red;'>" +
          this.model.get("name") + "</span>");
      }, this);

      return this;
    },

    unrender: function() {
      this.listView.unbind();
      this.listView.stopListening();
      this.listView.remove();
      this.listView = null;
      this.target = null;
      $(this.el).remove();
      this.remove();
    }
  });


  var TransactionBillFooter = Backbone.View.extend({

    events: {
      'click button.transfer': function() {
        this.trigger("click:transfer", $(".delta", $(this.el)).val());
        $(".delta").val(0);
      }
    },

    initialize: function (options) {
      _.bindAll(this, 'render', 'unrender');
      this.options = $.extend({}, this.defaults, options);
      this.render();
    },

    render: function() {
      $(this.el).html(footer);
      $(".delta", $(this.el)).val(0);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
      this.remove();
    }
  });

  window.TransactionBillBody = TransactionBillBody;
  window.TransactionBillFooter = TransactionBillFooter;

})();