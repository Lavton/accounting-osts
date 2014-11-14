(function(){
  this.listView = null;

  var Controller = {

    makePage: function(){
      $("#container").append("<div id='bill-list'></div>");
      this.listView = new BillListView({
        el: $("#bill-list"),
        collection: collection,
        view: BillEditView
      });

      $("#container-down").html($('#tpl-btn-add').html());
      $(".add-user-btn").unbind("click");
      $(".add-user-btn").click(function() {
        $("#container-tmp").append("<div></div>")
        popwindow = new PopupView({
          el: $("div", $("#container-tmp")),
          body: AddBillBody,
          footer: AddBillFooter,
          data: {
            listView: listView
          }
        });
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