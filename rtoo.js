javascript: (
  function(){
    var t={},e=!0;
    if("object"==typeof this.artoo && (artoo.settings.reload||(artoo.log.verbose("artoo already exists within this page. No need to inject him again."),artoo.loadSettings(t),artoo.exec(),e=!1)),e){
      var o=document.getElementsByTagName("body")[0];
      o||(o=document.createElement("body"),document.documentElement.appendChild(o));
      var a=document.createElement("script");
      console.log("artoo.js is loading..."),
	     a.src="//medialab.github.io/artoo/public/dist/artoo-latest.min.js",
	     a.type="text/javascript",
	     a.id="artoo_injected_script",
	     a.setAttribute("settings",JSON.stringify(t)),
	     o.appendChild(a)
    }
    }).call(this);