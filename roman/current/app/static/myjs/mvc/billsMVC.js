(function(){

  var Item = Backbone.Model.extend({
    defaults: {
      sum: 0
    }
  });


  var List = Backbone.Collection.extend({
    model: Item
  });


  var BillEditView = Backbone.View.extend({      
    events: {
      'click button.budget': 'budget',
      'click button.edit': 'edit',
      'click button.transfer': 'transfer'
    },    

    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'budget', 'remove', 'edit', 'transfer');

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

    budget: function(){
      model = this.model;
      $(".modal-body").html($("#tpl-bill-sum").html());
      $("#bills-in-delta").val(0);
      $("#modal-btn-confirm").unbind("click");
      for (var i = 0; i < 100; i++) {
        $(".bill-transactions").append("<h6>Transction</h6>")
      }

      $("#modal-btn-confirm").click(function(){
        if(+$("#bills-in-delta").val() != 0){
          var changed = {
            sum: model.get('sum') + +$("#bills-in-delta").val()
          };
          model.set(changed);
        }
      });
      modalClick();
    },

    edit: function(){
      model = this.model;
      $(".modal-body").html($("#tpl-bill-edit").html());
      $("#bills-in-curname").val(model.get('name'));

      $("#bill-btn-del").unbind("click");
      $("#bill-btn-del").click(function(){
        model.destroy();
        modalClick();
      });

      $("#modal-btn-confirm").unbind("click");
      $("#modal-btn-confirm").click(function(){
        if($("#bills-in-curname").val() != model.get('name')){
          var changed = {
            name: $("#bills-in-curname").val()
          };
          model.set(changed);
        }
      });
      modalClick();
    },

    transfer: function() {
      $(".modal-body").html($("#tpl-bill-trb").html());
      var listView = new ListView();
      listView.setCollection(collection, BillClickView, $("#bill-div-bill"),
       function(m){alert(m.get("name"));});

//      $('#myModal').on('hide.bs.modal', function (e) {
//        listView.unbind();
//        listView.stopListening();
//        listView.remove();
//        $("#bill-div-bill").html("");
//        listView = null;
//      });

      $("#modal-btn-confirm").unbind("click");
      modalClick();
    },

    remove: function(){
      this.model.destroy();
    }
  });


  var BillClickView = Backbone.View.extend({
    tagName: "tr",

    events: {
      'click': 'click'
    },    

    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'click');

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

    click: function(){
      if(!(this.func == undefined)) this.func(this.model);
    }
  });
  

  var ListView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');
    },

    setCollection: function(collection, view, elem, func){
      this.setElement(elem);
      this.elem = elem;
      this.view = view;
      this.func = func
      this.collection = collection;
      this.listenTo(this.collection, 'add', this.appendItem);
      this.render();
    },

    render: function() {
      var self = this;
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },

    addItem: function(name, sum) {
      var item = new Item();
      item.set({
        indef: (new Date()).getTime(), 
        name: name,
        sum: sum
      });
      this.collection.add(item);
    },

    appendItem: function(item) {
      var billView = new this.view({
        model: item
      });
      billView.func = this.func;
      this.elem.append(billView.render().el);
    }
  });

  window.BillItem = Item;
  window.BillList = List;
  window.BillEditView = BillEditView;
  window.BillClickView = BillClickView;
  window.BillListView = ListView;


})();