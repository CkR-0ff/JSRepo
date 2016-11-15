var dta = LL.getEvent().getData();
var obj = JSON.parse(dta);
var dsc = LL.getDesktopByName('MainDesk');
var pan = dsc.getItemByName("thepan");
var pancon = pan.getContainer();
//alert(pancon.getWidth());
var overZ = 0;
for (var i = 0; i < obj.data.length; i++) {
  //alert(obj.data[i].path);
  var inte = new Intent();
  var itmLen = pancon.getItems().getLength();
  var itmPan = pancon.addPanel((itmLen % 4) * 270, (Math.floor(itmLen / 4) * 480), 270, 480);
  if (pancon.getItemZIndex(itmPan.getId()) > overZ) {
    overZ = pancon.getItemZIndex(itmPan.getIdk());
  }
  var imgBack = LL.createImage(obj.data[i].path);
  itmPan.setBoxBackground(imgBack, 'nsf');
  var itmCon = itmPan.getContainer();
  var itmProp = itmCon.getProperties().edit();
  itmProp.setString("gridPColumnMode", "NUM");
  itmProp.setString("gridLColumnMode", "NUM");
  itmProp.setString("gridPRowMode", "NUM");
  itmProp.setString("gridLRowMode", "NUM");
  itmProp.setInteger("gridPColumnNum", 1);
  itmProp.setInteger("gridLColumnNum", 1);
  itmProp.setInteger("gridPRowNum", 5);
  itmProp.setInteger("gridLRowNum", 5);
  itmProp.commit();
  var nItem = itmCon.addShortcut(obj.data[i].nm, inte, 0, 0);
  nItem.setIntent(Intent.parseUri("#Intent;component=net.pierrox.lightning_launcher_extreme/net.pierrox.lightning_launcher.activities.Dashboard;i.a=35;S.d=6;end", 0).setAction(Intent.ACTION_VIEW));
  nItem.setCell(0, 0, 1, 1, true);
  nItem.setTag('shData', JSON.stringify(obj.data[i]));
  //alert(nItem.getTag('shData'));
  var pr = nItem.getProperties().edit();
  pr.setBoolean("s.iconVisibility", false);
  pr.setBoolean("i.enabled", true);
  pr.commit();
}
alert(overZ);