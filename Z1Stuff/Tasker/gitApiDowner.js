var dlinks = [];
var ddirs = [];
var dlen = 0;
var gitApiGet = function(repo, dir){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.github.com/repos/CkR-0ff/' + repo + '/contents' + dir, false);
	xhr.send();
	if(xhr.status == 200){
		var jsn = JSON.parse(xhr.responseText);
		jsn.forEach(function(el,id,arr){
			if(el.type == "file"){
				dlinks.push(el.download_url.replace('.githubusercontent', 'git'));
				ddirs.push(dir+'/'+el.name);
			}
			else if(el.type == "dir"){
				gitApiGet(repo, dir + '/' + el.name);
			}
		});
		dlen = dlinks.length;
	}
}
gitApiGet('JSRepo', 'Z1Stuff');