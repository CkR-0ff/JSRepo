var zelems = [];
var zimgs = [];

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
  for(var i=0;i<links.length;i++){
    if(links[i].firstChild.nodeName == 'B'){	
      zelems.push(links[i].firstChild.innerHTML);
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
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    var jsn = {
      nm: el,
      path: global('%taskerJsDir') + (i+1) + global('%imgStandard'),
      torr: '',
      seed: '',
      date: '',
      type: ''
    };
    jsnObj.data.push(jsn);
  }
};

JSONify(zelems);

var jsnstring = JSON.stringify(jsnObj);