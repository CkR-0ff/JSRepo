var sender = LL.getEvent().getItem();
var trLink = sender.getTag('torrLink');
if ( TaskerIntent.testStatus( this ).equals( TaskerIntent.Status.OK ) ) { 
	TaskerIntent intn = new TaskerIntent( "GetTorrent" );
	intn.addVariable( "%torrlink", trLink );
	intn.sendBroadcast( intn );
}