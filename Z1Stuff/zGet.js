var zelems = [];

var zGet = function(zPagePath){
  var ret = readFile(zPagePath);
  return ret;
};

var respToDoc = function(resp){
  var imp = document.implementation;
  var doc=imp.createHTMLDocument('');
  doc.open();
  doc.write(resp);
  doc.close();
  
  return doc;
};

var elemsToArr = function(doc){
  var bdy = doc.getElementsByTagName('body')[0];
  var links = bdy.querySelectorAll("a[href^='banan?id']");
  
  return links
};

var linksList = function(links){
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
