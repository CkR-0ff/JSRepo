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
      var lee = row.lastChild.previousSibling;
      var see = lee.previousSibling.previousSibling;
      var siz = see.previousSibling.previousSibling.previousSibling.previousSibling;
      var dte = siz.previousSibling.previousSibling;
      
//        flash(
//              'lee ' +lee.textContent + 
//              '\r\n see ' +see.textContent+
//              '\r\n siz ' +siz.textContent+
//              '\r\n lee ' +dte.firstChild.innerHTML
//        );
      
      var zel = {
        'nm': '' + links[i].firstChild.innerHTML,
        'path': '' + global('%taskerJsDir') + (j+1) + global('%imgStandard'),
        'torr': '' + row.querySelector('a[href^="/download"]').href.replace('file://', 'zamunda.net'),
         'seed': 'Seed: ' + see.textContent + ' / ' + 
                 'Leech: ' + lee.textContent,
         'size': '' + siz.textContent,
         'date': '' + dte.textContent,
        'type': '' + typ.title
      };
      j++;
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
