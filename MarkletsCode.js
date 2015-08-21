javascript: (
  function (){
    var exists = false;
    var allScripts = document.getElementsByTagName('script');
    if(allScripts){
      for(var i = 0; i<allScripts.length; i++){
	if(allScripts[i].src == 'https://rawgit.com/CkR-0ff/JSRepo/master/NeverStoper.js'){
	  exists = true;
	}
      }
    }
    
    if(!exists){
      var done = false;
      var scr = document.createElement('script');
      scr.src = 'https://rawgit.com/CkR-0ff/JSRepo/master/NeverStoper.js';
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


//===========================================DrDrop==================================================

function DnDFileController(selector, onDropCallback) {
  var el_ = document.querySelector(selector);

  this.dragenter = function(e) {
    e.stopPropagation();
    e.preventDefault();
    el_.classList.add('dropping');
  };

  this.dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  this.dragleave = function(e) {
    e.stopPropagation();
    e.preventDefault();
    //el_.classList.remove('dropping');
  };

  this.drop = function(e) {
    e.stopPropagation();
    e.preventDefault();

    el_.classList.remove('dropping');

    onDropCallback(e.dataTransfer.files, e);
  };

  el_.addEventListener('dragenter', this.dragenter, false);
  el_.addEventListener('dragover', this.dragover, false);
  el_.addEventListener('dragleave', this.dragleave, false);
  el_.addEventListener('drop', this.drop, false);
};

var callBFunc = function(files) {  
  var f = files[0];

  if (!f.type.match('application/json')) {
    alert('Not a JSON file!');
  }

  var reader = new FileReader();
    reader.onloadend = function(e) {
    var result = JSON.parse(this.result);
    console.log(result);
  };
  reader.readAsText(f);
}

var dnd = new DnDFileController('body', callBFunc);

//==========================================Right=Click=Hide=Element===========================================

javascript: (
  function (){
    if(!localStorage.RClck){
      localStorage.RClck = true;
      document.oncontextmenu = function(e) { 
	e.preventDefault(); 
	var trg = e.target; 
	console.log('-->', trg); 
	trg.style.display = "none";
      }
    }else{
      localStorage.removeItem("RClck");
      document.oncontextmenu = function(e) {
	return true;
      }
    }
  }()
);






