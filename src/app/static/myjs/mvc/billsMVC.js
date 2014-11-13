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
      'click .rclickable': 'budget',
      'click span.edit': 'edit',
      'click span.transfer': 'transfer'
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

      $(".modal-footer").html($("#tpl-bill-budjet-footer").html());
      $(".modal-body").html($("#tpl-bill-budjet-body").html());
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
      $(".modal-footer").html($("#tpl-bill-edit-footer").html());
      $(".modal-body").html($("#tpl-bill-edit-body").html());
      $("#bills-in-curname").val(model.get('name'));

      $("#bill-btn-del").unbind("click");
      $("#bill-btn-del").click(function(){
        model.destroy();
        modalClick();
      });

      $("#bill-edit-confirm").unbind("click");
      $("#bill-edit-confirm").click(function(){
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
      model = this.model;
      $(".modal-footer").html($("#tpl-bill-trans-footer").html());
      $(".modal-body").html($("#tpl-bill-trans-body").html());
      var target = model;
      $("#bill-trans-txt").html("<span style='color:red;'>" + model.get("name") + "</span>");
      var listView = new ListView();
      listView.setCollection(collection, BillClickView, $("#bill-div-bill"), function(m){
        target = m;
        if(m != model)
          $("#bill-trans-txt").
html("<span style='color:red;'>" + model.get("name") + "</span> -> <span style='color:blue;'>" + m.get("name") + "</span>");
        else
          $("#bill-trans-txt").html("<span style='color:red;'>" + model.get("name") + "</span>");
      });
      $("#bill-trans-in-delta").val(0);

      $("#bill-trans-confirm").click(function(){
        if(target != model) {
          var changed = {
            sum: +target.get("sum") + +$("#bill-trans-in-delta").val()
          };
          target.set(changed);

          changed = {
            sum: +model.get("sum") - +$("#bill-trans-in-delta").val()
          };
          model.set(changed);
          $("#bill-trans-in-delta").val(0);
        } else {
          var changed = {
            sum: +model.get("sum") + +$("#bill-trans-in-delta").val()
          };
          model.set(changed);          
          $("#bill-trans-in-delta").val(0);
        }
      });

//      $('#myModal').on('hide.bs.modal', function (e) {
//        listView.unbind();
//        listView.stopListening();
//        listView.remove();
//        $("#bill-div-bill").html("");
//        listView = null;
//      });

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