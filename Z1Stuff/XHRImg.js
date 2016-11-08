function XHRImgLoad(path){
  var img;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, false);
  xhr.responseType('blob');
  xhr.send();
  flash(xhr.status);
  if (xhr.status == 200) {
    img = xhr.response;
  }
  return URL.createObjectURL(img);
}