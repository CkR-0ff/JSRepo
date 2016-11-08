function XHRImgLoad(path){
  var blob;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, false);
  xhr.responseType('arraybuffer');
  xhr.send();
  flash(xhr.status);
  if (xhr.status === 200) {
    blob = new Blob([xhr.response], {type: "image/jpg"});
  }
  return blob;
}