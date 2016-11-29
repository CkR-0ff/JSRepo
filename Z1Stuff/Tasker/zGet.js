var zelems = [];
var zimgs = [];
var torrlinks = [];

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

var parseTip = function(msg){
  var start = msg.indexOf("'");
  var end = msg.lastIndexOf("'");
  var tempCont = document.createElement('div');
  tempCont.innerHTML = msg.substr(start+1, end-start-1);
  var imgEl = tempCont.getElementsByTagName('img')[0];
  var link = imgEl.src.substr(imgEl.src.indexOf('http')+7);
  link = link.substring(0,link.lastIndexOf("'")-1);
  return link;
};

var linksList = function(links){
  var j = 0;
  for(var i=0;i<links.length;i++){
    if(links[i].firstChild.nodeName == 'B'){	
      
      var row = links[i].parentNode.parentNode;
      var typ = row.firstChild.firstChild.firstChild;
      var lee = row.lastChild;
      var see = lee.previousSibling;
      var siz = see.previousSibling.previousSibling;
      var dte = siz.previousSibling;
      
      var zel = {
        'nm': '' + links[i].firstChild.innerHTML,
        'path': '' + global('%taskerJsDir') + (j+1) + global('%imgStandard'),
        'torr': '' + links[i].nextSibling.nextSibling.href,
        'seed': 'Seed: ' + see.firstChild.firstChild.firstChild.innerHTML + ' / ' + 
                'Leech: ' + lee.firstChild.firstChild.innerHTML,
        'size': '',
        'date': '',
        'type': '' 
      };
      j++;
      flash('tuk4');
      zelems.push(zel);
      
      var imgLink = parseTip(links[i].getAttribute('onmouseover'));
      zimgs.push(imgLink);
      
    }
  }
};

var rsp = zGet(global('%ZResp'));
var respdoc = respToDoc(rsp);
var linksarr = elemsToArr(respdoc);
linksList(linksarr);
var zelcount = zelems.length;

var jsnObj = {data: []};

var JSONify = function(arr){
   jsnObj.data = arr;
};

JSONify(zelems);

var jsnstring = JSON.stringify(jsnObj);
