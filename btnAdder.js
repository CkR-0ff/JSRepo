var btnAdderScript = function (){
  var btn = document.createElement('button');
  document.getElementsByTagName('body')[0].appendChild(btn);
  btn.onclick = btnAdderScript();
  
}

