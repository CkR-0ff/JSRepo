var dLinks = [];
var dDirs = [];
var dLen = 0;
var gitApiGet = function(repo, dir){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.github.com/repos/CkR-0ff/' + repo + '/contents' + dir, false);
	xhr.send();
	if(xhr.status == 200){
		var jsn = JSON.parse(xhr.responseText);
		jsn.forEach(function(el,id,arr){
			if(el.type == "file"){
				dLinks.push(el.download_url);
				dDirs.push(dir+'/'+el.name);
			}
			else if(el.type == "dir"){
				gitApiGet(repo, dir + '/' + el.name);
			}
		});
		dLen = dLinks.length;
	}
}
gitApiGet('JSRepo', '');