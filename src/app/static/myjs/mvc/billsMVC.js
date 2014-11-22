(function(){

  var Item = Backbone.Model.extend({
  });


  var List = Backbone.Collection.extend({
    model: Item
  });


  var BillEditView = Backbone.View.extend({ 

    defaults:{},

    events: {
      'click .rclickable': 'budget',
      'click span.edit': 'edit',
      'click span.transfer': 'transfer'
    },    

    initialize: function(options){
      _.bindAll(this, 'render', 'unrender', 'budget', 'remove', 'edit', 'transfer');
      this.options = $.extend({}, this.defaults, options);
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);

    },

    render: function(){
      var htmlCode = _.template($('#item-tpl').html(), {
        model: this.model
      });
      $(this.el).html(htmlCode);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
    },

    budget: function() {
      console.log("budget");
      $("#container-tmp").append("<div></div>")
      popwindow = new PopupView({
        el: $("div", $("#container-tmp")),
        title: "History",
        body: HistoryBillBody,
        footer: HistoryBillFooter,
        data: {
          model: this.model
        }
      });      
    },

    edit: function() {
      console.log("edit");
      $("#container-tmp").append("<div></div>")
      popwindow = new PopupView({
        el: $("div", $("#container-tmp")),
        title: "Edit",
        body: EditBillBody,
        footer: EditBillFooter,
        data: {
          model: this.model
        }
      });
    },

    transfer: function() {
      console.log("transfer");
      $("#container-tmp").append("<div></div>")
      popwindow = new PopupView({
        el: $("div", $("#container-tmp")),
        title: "Transaction",
        body: TransactionBillBody,
        footer: TransactionBillFooter,
        data: {
          model: this.model,
          collection: collection,
          tranCollection: transactionCollection
        }
      });
    },

    remove: function(){
      this.model.destroy();
    }
  });


  var BillClickView = Backbone.View.extend({

    tagName: "tr",

    defaults: {},

    events: {
      'click': 'click'
    },

    initialize: function(options){
      _.bindAll(this, 'render', 'unrender', 'click');
      this.options = $.extend({}, this.defaults, options);
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function(){
      var htmlCode = _.template($('#tpl-bill-click').html(), {
        model: this.model
      });
      $(this.el).html(htmlCode);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
    },

    click: function() {
      this.trigger("click:select", this.model);
    }
  });
  

  var ListView = Backbone.View.extend({

    defaults: {
      collection: null,
      view: null
    },

    initialize: function(options) {
      _.bindAll(this, 'render', 'addItem', 'appendItem');
      this.options = $.extend({}, this.defaults, options);
      delete this.options.el;
      this.listenTo(this.options.collection, 'add', this.appendItem);
      this.render();
    },

    render: function() {
      _(this.options.collection.models).each(function(item) {
        this.appendItem(item);
      }, this);
    },

    addItem: function(param) {
      var item = new Item();
      item.set(param);
      this.options.collection.add(item);
    },

    appendItem: function(item) {
      if(!this.options.selector || this.options.selector(item)) {
        this.options.model = item;
        var billView = new this.options.view(this.options);
        billView.on("all", function(eventName, a, b, c, d, e, f) {
          this.trigger(eventName, a, b, c, d, e, f);
        }, this);
        $(this.el).append(billView.render().el);
      }
    }
  });


  var TransactionClickView = Backbone.View.extend({
    tagName: "tr",

    defaults: {},

    events: {
      'click': 'click'
    },

    initialize: function(options){
      _.bindAll(this, 'render', 'unrender', 'click');
      this.options = $.extend({}, this.defaults, options);
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      var htmlCode = _.template($('#tpl-transaction-click').html(), {
        model: this.model
      });
      $(this.el).html(htmlCode);
      return this;
    },

    unrender: function(){
      $(this.el).remove();
    },

    click: function() {
      this.trigger("click:select", this.model);
    }
  });

  window.Item = Item;
  window.List = List;
  window.ListView = ListView;
  window.BillEditView = BillEditView;
  window.BillClickView = BillClickView;
  window.TransactionClickView = TransactionClickView;


})();