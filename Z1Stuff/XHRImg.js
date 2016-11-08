function XHRImgLoad(path){
  var img;
  var xhr = new XMLHttpRequest();
  xhr.responseType('image/*');
  xhr.open("GET", path, false);
  xhr.send();
  if (xhr.status == 200) {
    img = xhr.response;
  }
  return img;
}