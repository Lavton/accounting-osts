(function() {
  if(localStorage["request"] != undefined)
    window.requestQuery = JSON.parse(localStorage["request"]);
  else
    window.requestQuery = [];

  setInterval(function() {
    if(this.isWorking) return;
    this.isWorking = true;
    while(requestQuery.length > 0) {
      this.isConnected = true;
      $.ajax(requestQuery[0]).done(function(json) {
        console.log("success: request sended")
        console.log(requestQuery[0]);
        console.log(json);
        requestQuery.shift();
        localStorage["request"] = JSON.stringify(requestQuery);
      }).fail(function() {
        console.log("fail: can't synchronize");
        this.isConnected = false;
      });
      if(!this.isConnection) break;
    }
    this.isWorking = false;
  }, 1000);
})();