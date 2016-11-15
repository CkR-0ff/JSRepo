var dsc = LL.getDesktopByName('MainDesk');
var wg = dsc.getItemByName('Wgt');
wg.setLabel(wg.getIntent().toUri(1), true);
//LL.save();