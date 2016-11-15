var dsc = LL.getDesktopByName('MainDesk');
var wg = dsc.getItemByName('Wgt');
wg.setLabel(wg.getIntent().toUri(0), true);
//LL.save();