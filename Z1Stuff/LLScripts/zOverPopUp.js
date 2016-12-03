var caller = LL.getEvent().getItem();
var calData = JSON.parse(caller.getTag('shData'));
var dsc = LL.getDesktopByName('MainDesk');
var pan = dsc.getItemByName("thepan");
var pancon = pan.getContainer();
var allItems = pancon.getItems();
var highZ = 0;
for (var index = 0; index < allItems.getLength(); index++) {
  var element = allItems.getAt(index);
  if(pancon.getItemZIndex(element.getId()) > highZ){
    highZ = pancon.getItemZIndex(element.getId());
  }
}
var inte = new Intent();
var itmPan = pancon.addPanel(10, 10, 100, 100);
itmPan.setName('ZamiPopUp');
var itmCon = itmPan.getContainer();

var conPrEdit = itmCon.getProperties().edit();
  conPrEdit.setString("gridPColumnMode", "NUM");
  conPrEdit.setString("gridPRowMode", "NUM");
  conPrEdit.setInteger("gridPColumnNum", 4);
  conPrEdit.setInteger("gridPRowNum", 24);
  conPrEdit.setEventHandler('bgDoubleTap',EventHandler.RUN_SCRIPT,LL.getScriptByName('DblTapClose').getId());
  conPrEdit.commit();

var prEdit = itmPan.getProperties().edit();
  prEdit.setBoolean('i.onGrid', false);
  prEdit.setString('i.pinMode','Y');
  prEdit.commit();
var imgBack = LL.createImage(calData.path);
//alert(imgBack.getWidth() + 'X' + imgBack.getHeight());
if (imgBack.getWidth() < imgBack.getHeight()) {
  itmPan.setSize(((pancon.getHeight()) / imgBack.getHeight()) * (imgBack.getWidth()), pancon.getHeight());
} else {
  itmPan.setSize(((pancon.getWidth()) / imgBack.getWidth()) * (imgBack.getHeight()), pancon.getWidth());
}
itmPan.setPosition((pancon.getWidth() - itmPan.getWidth()) / 2, (pancon.getHeight() - itmPan.getHeight()) / 2);
pancon.setItemZIndex(itmPan.getId(), highZ+1);
itmPan.setBoxBackground(imgBack, 'nsf');
itmPan.setScale(0.8, 0.8);

//create top shortcut for Title
var intent = new Intent();
var popTitle = itmCon.addShortcut(calData.nm, intent, 0, 0);
popTitle.getProperties().edit()
  .setBoolean('i.onGrid', false)
  .setBoolean('i.enabled',false)
  .setBoolean("s.iconVisibility", false)
  .setInteger('s.labelMaxLines', 3)
  .setFloat('s.labelFontSize', 20)
  .commit();
popTitle.setSize(itmPan.getWidth()-10, itmPan.getHeight()/8);
popTitle.setPosition(5,0);


//creating the info and bottons grid...
  // download button
var intent = new Intent(Intent.parseUri("#Intent;component=net.pierrox.lightning_launcher_extreme/net.pierrox.lightning_launcher.activities.Dashboard;i.a=35;S.d=8;end", 0).setAction(Intent.ACTION_VIEW));
var popDownIcon = itmCon.addShortcut('', intent, 0, 0);
popDownIcon.setTag('torrLink', calData.torr);
var downImg = LL.createImage('sdcard/Tasker/TJSFs/downImg.png');
popDownIcon.getProperties().edit()
  .setBoolean('i.onGrid', true)
  .setBoolean('s.iconVisibility', true)
  .setBoolean('s.labelVisibility', false)
  .commit();
popDownIcon.setCell(0,21,1,24);
popDownIcon.setImage(downImg);

  //all info

var intent = new Intent();
var popSeed = itmCon.addShortcut(calData.seed, intent, 0, 0);
popSeed.getProperties().edit()
  .setBoolean('i.onGrid', true)
  .setBoolean('i.enabled', false)
  .setBoolean("s.iconVisibility", false)
  .setInteger('s.labelMaxLines', 1)
  .commit();
popSeed.setCell(1,20,3,21);

var intent = new Intent();
var popSeed = itmCon.addShortcut(calData.size, intent, 0, 0);
popSeed.getProperties().edit()
  .setBoolean('i.onGrid', true)
  .setBoolean('i.enabled', false)
  .setBoolean("s.iconVisibility", false)
  .setInteger('s.labelMaxLines', 1)
  .commit();
popSeed.setCell(1,21,3,22);

var intent = new Intent();
var popSeed = itmCon.addShortcut(calData.date, intent, 0, 0);
popSeed.getProperties().edit()
  .setBoolean('i.onGrid', true)
  .setBoolean('i.enabled', false)
  .setBoolean("s.iconVisibility", false)
  .setInteger('s.labelMaxLines', 1)
  .commit();
popSeed.setCell(1,22,3,23);

var intent = new Intent();
var popSeed = itmCon.addShortcut(calData.type, intent, 0, 0);
popSeed.getProperties().edit()
  .setBoolean('i.onGrid', true)
  .setBoolean('i.enabled', false)
  .setBoolean("s.iconVisibility", false)
  .setInteger('s.labelMaxLines', 1)
  .commit();
popSeed.setCell(1,23,3,24);

  //torrent type



  //
