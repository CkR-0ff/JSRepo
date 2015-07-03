javascript: (
  function (){
    var exists = false;
    var allScripts = document.getElementsByTagName('script');
    if(allScripts){
      for(var i = 0; i<allScripts.length; i++){
	if(allScripts[i].src == 'https://rawgit.com/CkR-0ff/JSRepo/master/btnAdder.js'){
	  exists = true;
	}
      }
    }
    
    if(!exists){
      var done = false;
      var scr = document.createElement('script');
      scr.src = 'https://rawgit.com/CkR-0ff/JSRepo/master/btnAdder.js';
      scr.onload = scr.onreadystatechange = function(){
	  if (!done && (!scr.readyState || scr.readyState == "loaded" || scr.readyState == "complete")) {
	      done = true;
	      btnAdderScript();
	  }
      };
      document.getElementsByTagName("head")[0].appendChild(scr);
    }else{
      btnAdderScript();
    }
    
  }()
);