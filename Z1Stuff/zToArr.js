var zelems = [];
var resp = "";
var imp = undefined;
var xhr = undefined;
var doc = undefined;
xhr = new XMLHttpRequest();
xhr.open('GET', '/sdcard/Tasker/TJSFs/zResp.html', false);
xhr.send();
if(xhr.status == 0){
	resp = xhr.response;
}
flash(zelems.length + " elems gets")
imp = document.implementation;
doc=imp.createHTMLDocument('nnd');
doc.open();
doc.write(resp);
doc.close();
var bdy = $(doc.getElementsByTagName('body')[0]);
var links = $(bdy).find("a[href^='banan?id']");
flash(links[10].innerHTML);
for(var i=0;i<links.length;i++){
	if(links[i].firstChild.nodeName == 'B'){	
		zelems.push(links[i].firstChild.innerHTML);
	}
}
