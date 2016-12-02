var sender = LL.getEvent().getItem();
var data = JSON.parse(sender.getTag('inData'));
if ( TaskerIntent.testStatus( this ).equals( TaskerIntent.Status.OK ) ) { 
	TaskerIntent intn = new TaskerIntent( "GetTorrent" );
	intn.addVariable( "%torlink", "value" );
	sendBroadcast( intn );
}