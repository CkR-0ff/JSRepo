var callerItem = LL.getEvent().getContainer();
alert(callerItem);
callerItem.getParent().removeItem(callerItem.getParent().getItemByName('ZamiPopUp'));