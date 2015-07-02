javascript: (
  function Great(version) {
    var v = "1.4";
    if(version){
      v = version;
    }
    
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				alert('You now have jQuery!!! v.' + window.jQuery.fn.jquery);
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		alert('You Already have jQuery v.' + window.jQuery.fn.jquery);
	}
  }()
);

javascript: (
  function () {
    var btn = document.createElement('button');
    btn.id = 'downtheload';
    $('body').append(btn);
    
    $('#downtheload').click(function() {
      alert('Realy Download: /r');
      
    });
    
  }()
  
);

javascript: (
  function() {
    var thumbElements = document.getElementsByClassName("fileThumb");
    var linksArray = [];
    
    for(var i = 0; i < thumbElements.length; i++){
      linksArray.push(thumbElements[i].getAttribute("href"));    
    }
    
    alert('Download All These!?!?! \n' + linksArray.join('\n'));
    
    for(var i=0; i<linksArray.length; i++) {
      
      var adload = document.createElement('a');
      adload.href = linksArray[i];
      adload.download = 'newWebm' + i + '.webm';
    
      adload.click();
      
    }
    
  }()
);

javascript:(
  function(){
    
    var arr = [];
    arr.push('http://i.4cdn.org/wsg/1435130197407.webm');
    arr.push('http://i.4cdn.org/wsg/1434601458966.webm');
    arr.push('http://i.4cdn.org/wsg/1433980572491.webm');
    
    for(var i=0; i<arr.length; i++) {
         var iframe = $('<iframe style="visibility: visible;"></iframe>');
         $('body').append(iframe);
         var content = iframe[0].contentDocument;
         var form = '<form action="' + arr[i] + '" method="GET"></form>';
         content.write(form);
         $('form', content).submit();
         setTimeout((function(iframe) {
           return function() { 
             iframe.remove(); 
           }
         })(iframe), 2000);
       }
  }()
);


javascript:(
  function(){
    var adload = document.createElement('a');
    adload.href = 'http://i.4cdn.org/wsg/1435130197407.webm';
    adload.download = 'newPi6ka.webm';
    
    adload.click();
    
  }()
);

javascript:(
  function(){
    
  }()
);

javascript: (
  function () {
    
    var v = "1.4";
    var thumbElements = document.getElementsByClassName("fileThumb");
    var linksArray = [];
    
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				alert('now its there');
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		alert('already there' + window.jQuery.fn.jquery);
	}
    
    
    
        
    for(var i = 0; i < thumbElements.length; i++){
      linksArray.push(thumbElements[i].getAttribute("href"));    
    }
    alert(linksArray.join('/n '));
    var btn = document.createElement('button');
    btn.id = 'dwnldbtn';
    $('body').append(btn);
    
    
    $('#dwnldbtn').click(function() {
       alert('Realy Download: /r' + linksArray.join(', '));
       download(linksArray);
     });

     var download = function(arr) {
       for(var i=0; i<arr.length; i++) {
         var iframe = $('<iframe style="visibility: collapse;"></iframe>');
         $('body').append(iframe);
         var content = iframe[0].contentDocument;
         var form = '<form action="' + arr[i] + '" method="GET"></form>';
         content.write(form);
         $('form', content).submit();
         setTimeout((function(iframe) {
           return function() { 
             iframe.remove(); 
           }
         })(iframe), 2000);
       }
     }      
    
  }()
    
);


var trows = Math.floor(thumbElements.length/5)+1;
    var body=document.getElementsByTagName('body')[0];
    var tbl=document.createElement('table');
    tbl.style.width='100%';
    tbl.setAttribute('border','1');
    var tbdy=document.createElement('tbody');
    for(var i=0;i<trows;i++){
	var tr=document.createElement('tr');
	for(var j=0;j<5;j++){
	    
	    var td = document.createElement('td');
	    var vid = document.createElement('video');
	    vid.controls = true;
	    var sourceWEBM = document.createElement("source"); 
	    sourceWEBM.type = "video/webm";
	    sourceWEBM.src = "" + linksArray[(i*5)+j];
	    vid.appendChild(sourceWEBM);
	    td.appendChild(vid);
	    tr.appendChild(td);
	    }
	}
	tbdy.appendChild(tr);
	tbl.appendChild(tbdy);
	body.appendChild(tbl);

var vid = document.createElement('video');
	    vid.onmouseover = vid.play();
	    vid.onmouseout = vid.pouse();
	    vid.src = linksArray[(i*5)+j].substring(2);

javascript: (  function () {    var thumbElements = document.getElementsByClassName("fileThumb");    var linksArray = [];        for(var i = 0; i < thumbElements.length; i++){      linksArray.push(thumbElements[i].getAttribute("href"));        }            var trows = Math.floor(thumbElements.length/5)+1;    var body=document.getElementsByTagName('body')[0];    var tbl=document.createElement('table');    tbl.style.width='100%';    tbl.setAttribute('border','1');    var tbdy=document.createElement('tbody');    for(var i=0;i<trows;i++){var tr=document.createElement('tr');for(var j=0;j<5;j++){        var td=document.createElement('td');    var vid = document.createElement('video');    vid.onmouseover = vid.play();    vid.onmouseout = vid.pouse();    vid.src = substring(2,linksArray[(i*5)+j]);    td.appendChild(document.createTextNode(vid));    tr.appendChild(td);    }}tbdy.appendChild(tr);tbl.appendChild(tbdy);body.appendChild(tbl);alert(tbl.innerHTML);   }()    );