var dsc = LL.getCurrentDesktop();
var pan = dsc.getItemByName("thepan");
var pancon = pan.getContainer();
var itms = pancon.getItems();
for (var i = 0; i < itms.length; i++) {
  pancon.removeItem(itms.getAt(i));
}