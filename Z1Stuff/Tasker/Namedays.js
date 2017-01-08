var pageget = function(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET','https://imenidni.eu/', false);
	xhr.send();
	var resp;
	if(xhr.status === 200 || xhr.status === 0){
		resp = xhr.responseText;
	}
	return resp;
};

var pagetodoc = function(respText){
  var tempDoc
	if(respText){
		var imp = document.implementation;
		tempDoc = imp.createHTMLDocument();
		tempDoc.open();
		tempDoc.write(respText);
		tempDoc.close();
	}
	return tempDoc;
};

var getElems = function(doc){
	var nameBlocks = doc.getElementsByClassName('day');
	var preArray = [];
	for(var i = 0; i<nameBlocks.length; i++){
		var tempName = {
			day:'',
			date:'',
			desc:'',
			names:[]
		};
		tempName.day = nameBlocks[i].getElementsByClassName('date')[0].firstChild.innerHTML;
		tempName.date = nameBlocks[i].getElementsByClassName('date')[0].firstChild.getAttribute('content');
		tempName.desc = nameBlocks[i].getElementsByClassName('description')[0].firstChild.nextSibling.innerHTML;
		var dayNames = nameBlocks[i].querySelector('ul.names').children;
		for(var j = 0; j<dayNames.length; j++){
			tempName.names.push(dayNames[j].innerText);
		}
		preArray.push(tempName);
	}
	return preArray;
};

var pg = pageget();
var dc = pagetodoc(pg);
var arrObj = getElems(dc);
var jsn = JSON.stringify(arrObj);

