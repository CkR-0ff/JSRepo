var sender = LL.getEvent().getItem();
var trLink = sender.getTag('torrLink');
var intn = new TaskerIntent( "GetTorrent" );
		intn.addParameter(trLink);
LL.sendTaskerIntent(intn, false);