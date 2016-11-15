var caller = LL.getEvent().getItem();
//alert(caller.getTag('shData'));
var calData = JSON.parse(caller.getTag('shData'));
var dsc = LL.getDesktopByName('MainDesk');
var pan = dsc.getItemByName("thepan");
var pancon = pan.getContainer();
var inte = new Intent();
var itmCon = pancon.addPanel(10, 10, 100, 100);
//var itmCon = itmPan.getContainer();
var prEdit = itmCon.getProperties().edit();
prEdit.setBoolean('i.onGrid', false);
prEdit.commit();
var imgBack = LL.createImage(calData.path);
//alert(imgBack.getWidth() + 'X' + imgBack.getHeight());
if (imgBack.getWidth() < imgBack.getHeight()) {
  itmCon.setSize(((pancon.getHeight()) / imgBack.getHeight()) * (imgBack.getWidth()), pancon.getHeight());
} else {
  itmCon.setSize(((pancon.getWidth()) / imgBack.getWidth()) * (imgBack.getHeight()), pancon.getWidth());
}

itmCon.setPosition((pancon.getWidth() - itmCon.getWidth()) / 2, (pancon.getHeight() - itmCon.getHeight()) / 2);
pancon.setItemZIndex(itmCon.getId(), 21);
itmCon.setBoxBackground(imgBack, 'nsf');
itmCon.setScale(0.8, 0.8);