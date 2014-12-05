(function() {

  var Controller = {

    makePage: function() {
      $("#container").append("<div id='bill-list'></div>");
      this.listView = new ListView({
        el: $("#bill-list"),
        collection: collection,
        view: BillEditView,
        selector: function(model) {
          return model.get("visible") != 0;
        }
      });
      listView = this.listView;

      $("#container-down").html($('#tpl-btn-add').html());
      $(".add-user-btn").unbind("click");
      $(".add-user-btn").click(function() {
        $("#container-tmp").append("<div></div>")
        window.popwindow = new PopupView({
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
