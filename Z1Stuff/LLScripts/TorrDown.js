if ( TaskerIntent.testStatus( this ).equals( TaskerIntent.Status.OK ) ) {
		  TaskerIntent intn = new TaskerIntent( "GetTorrent" );
      intn.addVariable( "%name", "value" );
		  sendBroadcast( intn );
	}