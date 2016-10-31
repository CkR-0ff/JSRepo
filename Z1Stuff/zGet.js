var zelems = [];

var zGet = function(zPagePath){
  flash('in zGet '+ zPagePath);
  var ret;
  xhr = new XMLHttpRequest();
  xhr.open('GET', zPagePath, false);
  xhr.send();
  if(xhr.status === 0){
    ret = xhr.response;
  }
  
  return ret;
};

var respToDoc = function(resp){
  flash('in respToDoc ' + resp);
  var imp = document.implementation;
  var doc=imp.createHTMLDocument('');
  doc.open();
  doc.write(resp);
  doc.close();
  
  return doc;
};

var elemsToArr = function(doc){
  flash('in elemsToArr ' + doc);
  var bdy = $(doc.getElementsByTagName('body')[0]);
  var links = $(bdy).find("a[href^='banan?id']");
  
  return links
};

var linksList = function(links){
  flash('in linksList '+links);
  for(var i=0;i<links.length;i++){
    if(links[i].firstChild.nodeName == 'B'){	
      zelems.push(links[i].firstChild.innerHTML);
    }
  }
};

var rsp = zGet(global('%ZResp'));
var respdoc = respToDoc(rsp);
var linksarr = elemsToArr(respdoc);
linksList(linksarr);
