var btnAdderScript = function (){
  var btn = btnCreator();
  btn.click( function (){
    btnAdderScript();
  });
  
}

var btnCreator = function () {
  var btn = document.createElement('button');
  document.getElementsByTagName('body')[0].appendChild(btn);
  return btn;
}