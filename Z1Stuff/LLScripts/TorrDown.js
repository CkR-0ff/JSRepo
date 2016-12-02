var sender = LL.getEvent().getItem();
var trLink = sender.getTag('torrLink');
var intn = new TaskerIntent( "GetTorrent" );
		intn.addVariable( "%torrlink", trLink );
LL.sendTaskerIntent(intn, false);