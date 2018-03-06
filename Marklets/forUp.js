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
  }