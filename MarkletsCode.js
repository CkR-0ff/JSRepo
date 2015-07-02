javascript: (
  function (){
    var exists = false;
    var allScripts = document.getElementsByTagName('script');
    alert(allScripts.join('\n'));
    if(allScripts){
      for(var i = 0; i<allScripts.length; i++){
	if(allScripts[i].src = 'https://github.com/CkR-0ff/JSRepo/blob/master/btnAdder.js'){
	  exists = true;
	}
      }
    }
    
    if(!exists){
      var done = false;
      var scr = document.createElement('script');
      scr.src = 'https://github.com/CkR-0ff/JSRepo/blob/master/btnAdder.js';
      scr.onload = scr.onreadystatechange = function(){
	  if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
	      done = true;
	      alert('ScriptLoaded');
	      btnCreator();
	  }
      };
    }else{
      alert('ScriptAlreadyThere');
      btnCreator();
    }
    
  }();
);