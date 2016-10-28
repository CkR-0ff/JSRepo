var treeArr = [];
var gitApiGet = function(repo, dir){
	flash('inGAG' + 'for ' + dir);
	var dLoadArr = [];
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.github.com/repos/CkR-0ff/' + repo + '/contents' + dir, false);
	xhr.send();
	if(xhr.status == 200){
		var jsn = JSON.parse(xhr.responseText);
		jsn.forEach(function(el,id,arr){
			if(el.type == "file"){
				dLoadArr.push({name: el.name, path: el.download_url});
			}
			else if(el.type == "dir"){
				gitApiGet(repo, dir + '/' + el.name);
			}
		});
	}
	treeArr.push({toDir: dir, paths: dLoadArr});
}
var writeTree = function (tree){
	flash('inWTF');
	tree.forEach(function(el){
		for(var i = 0; i < el.paths.length; i++){
			var res = tk.performTask('WrFilePar', priority+i, el.toDir + '/' + el.paths[i].name, el.paths[i].path);
			flash(res + ' ' +  el.toDir + '/' + el.paths[i].name);
		}
	});
}
gitApiGet('JSRepo', '');
writeTree(treeArr);