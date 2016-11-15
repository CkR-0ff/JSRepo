var callerItem = LL.getEvent().getItem();
alert(callerItem);
callerItem.getParent().removeItem(callerItem);