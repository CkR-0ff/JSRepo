function gitApiGet(repo, folder){
	var dLoadArr = [];
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.github.com/repos/CkR-0ff/' + repo + '/contents/' + folder, false);
	xhr.send();
	if(xhr.status == 200){
		var jsn = JSON.parse(xhr.responseText);
		jsn.forEach(function(el,id,arr){
			if(el.type == "file"){
				dLoadArr.push(el.download_url);
			}
			else if(el.type == "folder"){
				gitApiGet(repo, el.name);
			}
		});
		console.log(jsn);
	}
}