var zelems = [];

var zGet = function(zPagePath){
  flash('in zGet '+ zPagePath);
  var ret = readFile(zPagePath);
  return ret;
};

var respToDoc = function(resp){
  flash('in respToDoc ');
  var imp = document.implementation;
  var doc=imp.createHTMLDocument('');
  doc.open();
  doc.write(resp);
  doc.close();
  
  return doc;
};

var elemsToArr = function(doc){
  flash('in elemsToArr ' + doc);
  var bdy = doc.getElementsByTagName('body')[0];
  var links = bdy.querySelectorAll("a[href^='banan?id']");
  
  return links
};

var linksList = function(links){
  flash('in linksList '+links);
  for(var i=0;i<links.length;i++){
    if(links[i].firstChild.nodeName == 'B'){	
      zelems.push(links[i].firstChild.innerHTML);
    }
  }
  flash('z len: '+zelems.length +';\r\n z num 4:'+ zelems[3] + ';\r\n z -4: '+zelems[zelems.length-4]);
};

var rsp = zGet(global('%ZResp'));
var respdoc = respToDoc(rsp);
var linksarr = elemsToArr(respdoc);
linksList(linksarr);
