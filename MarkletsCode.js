javascript: (
  function (){
    var exists = false;
    var allScripts = document.getElementsByTagName('script');
    if(allScripts){
      for(var i = 0; i<allScripts.length; i++){
	if(allScripts[i].src == 'https://raw.githubusercontent.com/CkR-0ff/JSRepo/master/NeverStoper.js'){
	  exists = true;
	}
      }
    }
    
    if(!exists){
      var done = false;
      var scr = document.createElement('script');
      scr.src = 'https://raw.githubusercontent.com/CkR-0ff/JSRepo/master/NeverStoper.js';
      scr.onload = scr.onreadystatechange = function(){
	  if (!done && (!scr.readyState || scr.readyState == "loaded" || scr.readyState == "complete")) {
	      done = true;
	      roller();
	  }
      };
      document.getElementsByTagName("head")[0].appendChild(scr);
    }else{
      roller();
    }
    
  }()
);