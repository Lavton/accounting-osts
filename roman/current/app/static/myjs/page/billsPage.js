(function(){
  this.listView = null;

  var Controller = {

    makePage: function(){
      var listView = new BillListView();
      $("#container").append("<div id='bill-list'></div>");
      this.listView = listView;
      listView.setCollection(collection, BillEditView, $("#bill-list"));

      $("#container-down").html($('#tpl-btn-add').html());
      $(".add-user-btn").unbind("click");
      $(".add-user-btn").click(function() {
        $(".modal-body").html($("#tpl-bill-add").html());
        $("#modal-btn-confirm").unbind("click");
        $("#modal-btn-confirm").click(function() {
          if($("#bills-in-sum").val()) 
            name = $("#bills-in-name").val() || "default"
            listView.addItem(name, +$("#bills-in-sum").val());
        });
        modalClick();
      });

    },

    cleanPage: function(){
      this.listView.unbind();
      this.listView.stopListening();
      this.listView.remove();
      $(".content").html("");
      this.listView = null;
    }
  }

  window.BillsPage = Controller;
})();