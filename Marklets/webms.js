/////////////////////////////////------------------------------------------------///////////////////////////////////////////////////

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

//================================WEBM=Downloader=With=NamesList.txt=========================================

javascript: (
  function() {
    var fileElements = document.getElementsByClassName("file-info");
    var linksArray = [];
    var nameRep = [];
    
    for(var i = 0; i < fileElements.length; i++){
      var infA = fileElements[i].getElementsByTagName("a")[0];
      var full = infA.getElementsByClassName("fnswitch")[0];
      var objkt = "";
      if(full){
	objkt = full.getElementsByClassName("fnfull")[0].innerHTML;
      }else{
	objkt = infA.innerHTML;
      }
      nameRep.push(infA.href.split('/').pop() + "\n" + objkt);
      infA.href = infA.href.substring(5);
      infA.download = objkt;
      infA.click();
    }
    
    var blbText = nameRep.join('\n');
    
    var data = new Blob([blbText], {type: 'text/plain'});
    var textFile = window.URL.createObjectURL(data);
    
    var adload = document.createElement('a');
    adload.href = textFile;
    adload.download = "NamesLinks.txt";
    adload.click();
    
  }()
);

//=================================================Just=Add=Down======================================================


javascript: (
  function() {
    var fileElements = document.getElementsByClassName("file-info");
    var linksArray = [];
    var nameRep = [];
    
    for(var i = 0; i < fileElements.length; i++){
      var infA = fileElements[i].getElementsByTagName("a")[0];
      var full = infA.getElementsByClassName("fnswitch")[0];
      var objkt = "";
      if(full){
	objkt = full.getElementsByClassName("fnfull")[0].innerHTML;
      }else{
	objkt = infA.innerHTML;
      }
      nameRep.push(infA.href.split('/').pop() + "\n" + objkt);
      infA.href = infA.href.substring(5);
      infA.download = objkt+"";;
    }
  }()
);



//================================Download=From=Blob=========================================

javascript: (
  function() {
    var blblb = "IyEvdXNyL2Jpbi9wZXJsIC13CgpvcGVuIG15ICRoYW5kbGUsICc8JywgJ05hbWVzTGlua3MudHh0JzsKY2hvbXAobXkgQGxpbmVzID0gPCRoYW5kbGU+KTsKY2xvc2UgJGhhbmRsZTsKbXkgJWhzaCA9IEBsaW5lczsKZm9yZWFjaCBteSAka2V5IChrZXlzICVoc2ggKSB7CiAgICByZW5hbWUgJGtleSwgJWhzaHska2V5fTsKICAgIHdhcm4gJ1JlbmFtZWQgeycgLiAka2V5IC4gJ30gdG8geycgLiAlaHNoeyRrZXl9IC4gJ30nOwp9";
    
    function dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString = dataURI;
      
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
	  ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:'text/plain'});
    }
    
    var data = dataURItoBlob(blblb);
    var textFile = window.URL.createObjectURL(data);
    
    var adload = document.createElement('a');
    adload.href = textFile;
    adload.download = "Rentry.pl";
    adload.click();
    
  }()
);