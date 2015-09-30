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
    var tooltiper = null;
    
    if(!localStorage.RClck){
      localStorage.RClck = true;      
      document.onmousedown = function(e) { 
	e.preventDefault(); 
	var trg = e.target; 
	console.log('-->', trg); 
	trg.style.display = 'none';      
      };  
      
      var stl = document.createElement('style');      
      var txtnode = document.createTextNode('body:hover .coupontooltip {display: block;} .coupontooltip {display: none; background: #C8C8C8; margin-left: 5px; padding: 0px; position: absolute; z-index: 1000;} .onhvrbrd {border-style: solid; border-width: 1px; border-color:red}');      
      stl.appendChild(txtnode);      
      document.getElementsByTagName('head')[0].appendChild(stl);  
      
      tooltiper = document.createElement('div');      
      tooltiper.className = 'coupontooltip';      
      tooltiper.Id = 'coupontooltip';     
      
      document.getElementsByTagName('body')[0].appendChild(tooltiper);                  
      document.onmousemove = function(e) {  
	tooltiper.style.left = e.pageX + 'px';  
	tooltiper.style.top = e.pageY + 'px';  
	tooltiper.innerHTML = 'Tag Type: ' + e.path[0].tagName + '';  
	for(var i = 0; i<e.path[0].attributes.length; i++){      
	  tooltiper.innerHTML += '<br>' + e.path[0].attributes[i].name + ': ' + e.path[0].attributes[i].value;  
	}        
      };      
      document.onmouseover = function(e){  
	e.path[0].classList.add('onhvrbrd');      
      };      
      document.onmouseout = function(e){  
	e.path[0].classList.remove('onhvrbrd');      
      };          
    }else{      
      localStorage.removeItem('RClck');      
      document.oncontextmenu = function(e) {
	return true;      
      };            
      document.onmousemove = function(e) {
	return true;      
      };      
      document.onmouseover = function(e) {
	return true;      
      };      
      document.onmouseout = function(e) {
	return true;      
      };      
      var thetools = document.getElementsByClassName('coupontooltip');      
      for(var i = 0; i < thetools.length; i++){
	thetools[i].parentElement.removeChild(thetools[i]);      
      }    
    }  
  })();


//==========================================Del=Press=Hide=Element===========================================

  
javascript: (
  function (){
    var tooltiper = null;
    
    var selectedElement = null;
      if(!localStorage.RClck){
      localStorage.RClck = true;
      document.onkeypress = function(e) {
	
	if(e.keyCode == 46 || e.keyCode == 127){
	  var trg = selectedElement;
	}
	console.log('-->', trg);
	trg.style.display = 'none'; 
      };
      
      var stl = document.createElement('style');      
      var txtnode = document.createTextNode('body:hover .coupontooltip {display: block;} .coupontooltip {display: none; background: #C8C8C8; margin-left: 5px; padding: 0px; position: absolute; z-index: 1000;} .onhvrbrd {border-style: solid; border-width: 1px; border-color:red}');      
      stl.appendChild(txtnode);      
      document.getElementsByTagName('head')[0].appendChild(stl);  
      
      tooltiper = document.createElement('div');      
      tooltiper.className = 'coupontooltip';      
      tooltiper.Id = 'coupontooltip';     
      
      document.getElementsByTagName('body')[0].appendChild(tooltiper);                  
      document.onmousemove = function(e) {  
	tooltiper.style.left = e.pageX + 'px';  
	tooltiper.style.top = e.pageY + 'px';  
	tooltiper.innerHTML = 'Tag Type: ' + e.path[0].tagName + '';  
	for(var i = 0; i<e.path[0].attributes.length; i++){      
	  tooltiper.innerHTML += '<br>' + e.path[0].attributes[i].name + ': ' + e.path[0].attributes[i].value;  
	}        
      };      
      document.onmouseover = function(e){  
	e.path[0].classList.add('onhvrbrd');
	selectedElement = e.path[0];
      };      
      document.onmouseout = function(e){  
	e.path[0].classList.remove('onhvrbrd');      
      };          
    }else{      
      localStorage.removeItem('RClck');      
      document.oncontextmenu = function(e) {
	return true;      
      };            
      document.onmousemove = function(e) {
	return true;      
      };      
      document.onmouseover = function(e) {
	return true;      
      };      
      document.onmouseout = function(e) {
	return true;      
      };      
      var thetools = document.getElementsByClassName('coupontooltip');      
      for(var i = 0; i < thetools.length; i++){
	thetools[i].parentElement.removeChild(thetools[i]);      
      }    
    }  
  })();


//========================================Preserve=Page=URL=======================================================

javascript:(
  function(){
    var elemPath = [];
    document.oncontextmenu = function(e) { 
      e.preventDefault(); 
      var trg = e.target; 
      cycL(trg);
      var Stringif = JSON.stringify(elemPath);
      console.log(Stringif);
    };
    
    function elemPathToList(elem){
      var idx = whichChild(elem);
      var svObj = {
	'elemName': elem.nodeName,
	'posIdx': idx,
	'elemId': elem.id,
	'elemClass': elem.className
      };
      return svObj;
    }
    
    function cycL(elem){
      if(elem.nodeName != 'HTML'){
	var curElem = elemPathToList(elem);
	elemPath.push(curElem);
	cycL(elem.parentNode)
      }
    }
    
    function whichChild(elem){
      var  i= 0;
      while((elem=elem.previousSibling)!=null) ++i;
      return i;
    }
    
  }()
);



console.log('-->', trg);
console.log('-->', index);
console.log('-->', trg.parentNode.childNodes[index]);



//======================================================Elem Hider FromWeb=================================================================
javascript:(
  function(){
    if(window._rm_md){
      document.onmousedown=window._rm_md;
      window._rm_md=null;
    }else{
      window._rm_md=document.onmousedown||function(){};
      document.onmousedown=function(e){
	e=e||window.event;
	e.target.parentNode.removeChild(e.target);
      };
    }
  }
)();

//================================================ElemShow=================================================================


javascript: (
  function(){
    
    if(!stl){
      var stl = document.createElement('style');
      var txtnode = document.createTextNode("body:hover .coupontooltip {display: block;} .coupontooltip {display: none; background: #C8C8C8; margin-left: 5px; padding: 0px; position: absolute; z-index: 1000;} .onhvrbrd {border-style: solid; border-width: 1px; border-color:red}");
      stl.appendChild(txtnode);
      document.getElementsByTagName('head')[0].appendChild(stl);
    }else{
      document.removeChild(stl);
    }

    if(!tooltiper){
      var tooltiper = document.createElement('span');
      tooltiper.className = "coupontooltip";
      document.getElementsByTagName('body')[0].appendChild(tooltiper);
    }else{
      document.removeChild(tooltiper);
    }

    document.addEventListener('mousemove', fn, false);
    document.addEventListener('mouseover', fn2, false);
    document.addEventListener('mouseout', fn3, false);

    function fn(e) {
	tooltiper.style.left = e.pageX + 'px';
	tooltiper.style.top = e.pageY + 'px';
	tooltiper.innerHTML = 'Tag Type: &lt;' + e.path[0].tagName + '&gt;';
	for(var i = 0; i<e.path[0].attributes.length; i++){
	    tooltiper.innerHTML += '<br>' + e.path[0].attributes[i].name + ': ' + e.path[0].attributes[i].value;
	}
    }

    function fn2(e){
	e.path[0].classList.add('onhvrbrd');
    }

    function fn3(e){
	e.path[0].classList.remove('onhvrbrd');
    }
  }()
);