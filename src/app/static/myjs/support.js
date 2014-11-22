
window.indefToName = function(indef, cls) {
  if(cls == "bill")
    res = collection.find(function(model){return model.get('indef') == indef;});
    return res ? res.get("name"): indef;
};

window.getDate = function() {
  var currentdate = new Date();
  var MM = (currentdate.getMonth()+1).toString();
  var dd  = currentdate.getDate().toString();
  var mm  = currentdate.getMinutes().toString();
  var hh  = currentdate.getHours().toString();
  var datetime =    (dd[1]?dd:"0"+dd[0]) + "/"
                  + (MM[1]?MM:"0"+MM[0])  + "/" 
                  + currentdate.getFullYear() + " "  
                  + (hh[1]?hh:"0"+hh[0]) + ":"  
                  + (mm[1]?mm:"0"+mm[0]);
  return datetime;
};