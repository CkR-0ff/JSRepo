var btnAdderScript = function (){
  var btn = btnCreator();
  btn.click( function (){
    var newBtn = btnCreator();
  });
  
}

var btnCreator = function () {
  var btn = document.createElement('button');
  document.getElementsByTagName('body')[0].appendChild(btn);
  return btn;
}