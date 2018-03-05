Object.defineProperties(Number.prototype, {
    isPowerOf2 : {
		get: function() {
        	return this.valueOf() && !(this.valueOf() & (this.valueOf() - 1));
    	} 
	},
	isAccumPowerOf2 : {
		get : function(){
			return (this.valueOf()+2).isPowerOf2;
		}
	}
});

var _labStore = {
	DIRECTIONS 	: ['OUT','IN','CW','CCW'],
	DIRECTVALS 	: {'OUT':1,'IN':2,'CW':4,'CCW':8},
	OPPOSIITES 	: {'OUT':'IN','IN':'OUT','CW':'CCW','CCW':'CW'},

	MoveX 		: {'OUT':0,'IN':0,'CW':-1,'CCW':1},
	MoveY 		: {'OUT':1,'IN':-1,'CW':0,'CCW':0},
	
	MAZECELLS	: [],
	MAZEPATH	: [],
	DIMENTIONS	: {X:4, Y:20},
	
	tC:{
		s: {X:0, Y:0},
		c: {X:0, Y:0},
		n: {X:0, Y:0}
	},
		
	get rndBool(){
		return Math.random() >= 0.5;
	},
	get rndDIRECTIONS(){
		arrIn = Array.from(this.DIRECTIONS);
		var retArr = [];
		while(arrIn.length > 0){
			var rndElem = Math.floor(Math.random()*arrIn.length);
			retArr.push(arrIn[rndElem]);
			arrIn.splice(rndElem, 1);
		}
		return retArr;
	},
	get isFullMaze(){
		var isFull = true;
		this.MAZECELLS.forEach(function(elem,idx,arr){
			if(elem.includes(0))
				isFull = false;
		});
		return isFull;
	},
	initCyrcleCells	: function(){
		this.MAZECELLS = [];
		var numOfCells = this.DIMENTIONS.X/2;
		
		for(var i=2; i<this.DIMENTIONS.Y+2; i++){
			if(i.isPowerOf2){
				numOfCells = numOfCells*2;
			}
			var cellsInTrack = Array(numOfCells).fill(0);
			this.MAZECELLS.push(cellsInTrack);
		}
	},
	initRectangleCells : function(){
		this.MAZECELLS = [];
		
		for(var i=0; i<this.DIMENTIONS.Y; i++){
			var cellsInTrack = Array(this.DIMENTIONS.X).fill(0);
			this.MAZECELLS.push(cellsInTrack);
		}
	},
	pathBuilder : function(){
		if(this.MAZECELLS.length<=0){
			this.MAZEPATH = [];
			this.initCyrcleCells();
		}
		//debugger;
		if(this.MAZEPATH.length<=0){
			var rndDirs = this.rndDIRECTIONS;
			rndDirs.splice(rndDirs.indexOf('IN'),1);
			var newCell = {pos:this.tC.c, dirs:rndDirs};
			this.MAZEPATH.push(newCell);
		}
		
		var curCell = this.MAZEPATH[this.MAZEPATH.length-1];
		while(curCell.dirs.length>0){
			var curDir = curCell.dirs.pop();
			
			this.tC.n.X = curCell.pos.X + this.MoveX[curDir];
			this.tC.n.Y = curCell.pos.Y + this.MoveY[curDir];
			
			if(this.tC.n.Y>=0 && this.tC.n.Y<this.MAZECELLS.length){
				if(curCell.pos.Y<this.tC.n.Y && this.tC.n.Y.isAccumPowerOf2){
					this.tC.n.X = (this.rndBool) ?  this.tC.n.X*2 + 1: this.tC.n.X*2;
				}else if(curCell.pos.Y>this.tC.n.Y && curCell.pos.Y.isAccumPowerOf2){
					this.tC.n.X = Math.floor(this.tC.n.X/2);
				}
				if(this.tC.n.X<0){
					this.tC.n.X = this.MAZECELLS[this.tC.n.Y].length -1;
				}
				if(this.tC.n.X>=this.MAZECELLS[this.tC.n.Y].length){
					this.tC.n.X = 0;
				}
				if(this.MAZECELLS[this.tC.n.Y][this.tC.n.X] === 0){
					this.MAZECELLS[curCell.pos.Y][curCell.pos.X] |= this.DIRECTVALS[curDir];
					this.MAZECELLS[this.tC.n.Y][this.tC.n.X] |= this.DIRECTVALS[this.OPPOSIITES[curDir]];
					
					var ndirs = this.rndDIRECTIONS;
					ndirs.splice(ndirs.indexOf(this.OPPOSIITES[curDir]),1);
					
					var npos = JSON.parse(JSON.stringify(this.tC.n))
					
					var newCell = {pos:npos, dirs:ndirs};
					this.MAZEPATH.push(newCell);
					break;
					//setPassage(this.tC.n.X,this.tC.n.Y, grid);
				}else{
					this.tC.n.X = curCell.pos.X;
					this.tC.n.Y = curCell.pos.Y;
					continue;
				}
			}else{
				this.tC.n.X = curCell.pos.X;
				this.tC.n.Y = curCell.pos.Y;
				continue;
			}
		}
		if(this.MAZEPATH[this.MAZEPATH.length-1].dirs.length<=0){
			this.MAZEPATH.pop();
		}
		//console.log(this.MAZECELLS);
	},
	setExits : function(){
		if(this.isFullMaze){
			this.MAZECELLS[this.MAZECELLS.length-1][0] |= this.DIRECTVALS['OUT']
			this.MAZECELLS[0][0] |= this.DIRECTVALS['IN']
		}
	},
	direcMazePopulate : function(){
		this.initCyrcleCells();
		while(!this.isFullMaze){
			this.pathBuilder();
		}
	}
	
};

var _labDrawer = {
	Store			: undefined,
	
	CANVAS			: undefined,
	CTX				: undefined,
	
	InnerRadius		: 7, 
	RadiusIncrement	: 7, 
		
	LineColor		: "#FF0000",
	LineWidth		: 1,
	CanvasWidth		: 500,
	CanvasHeight	: 500,
	
	ClearMaze		: true,
	
	get canvas()	{
		if(!this.CANVAS){
			this.CANVAS = document.getElementById('mazeCanvas');
		
			if(!this.CANVAS){
				this.CANVAS = document.createElement('canvas');
			
				this.CANVAS.id = "mazeCanvas";
				this.CANVAS.style.zIndex = 1000;
				this.CANVAS.style.position = "relative";
				this.CANVAS.style.top = 0;
				this.CANVAS.style.border = "1px solid";
				
				var body = document.getElementsByTagName("body")[0];
				body.appendChild(this.CANVAS);
			}
			this.CANVAS.height = this.CANVAS.clientHeight;
			this.CANVAS.width  = this.CANVAS.clientHeight;
			return this.CANVAS;
		}else{
			this.CANVAS.height = this.CANVAS.clientHeight;
			this.CANVAS.width  = this.CANVAS.clientHeight;
			return this.CANVAS;
		}
	},
	get newCtx()	{
		var canv = this.canvas;
		this.CTX = canv.getContext('2d');
		this.CTX.strokeStyle=this.LineColor;
		this.CTX.fillStyle=this.LineColor;
		this.CTX.lineWidth=this.LineWidth;
		return this.CTX;
	},
	get ctx()		{
		if(!this.CTX){
			var canv = this.canvas;
			this.CTX = canv.getContext('2d');
			this.CTX.strokeStyle=this.LineColor;
			this.CTX.lineWidth=this.LineWidth;
		}
		return this.CTX;
	},
	set store(value)		{
		this.Store = value;
	},
	getRads			: function(ang){
		return ang*Math.PI/180;
	},
	redrawMaze		: function(){
		var ctx = this.newCtx;
		var arr = [];

		// ctx.canvas.width  = ctx.canvas.clientWidth;
  		// ctx.canvas.height = ctx.canvas.clientHeight;
		
		if(!this.Store){
			alert('Set Initiated Maze First!');
			return;
		}else{
			arr = this.Store.MAZECELLS;
		}
		
		if(this.ClearMaze){
			ctx.clearRect(0,0,this.CANVAS.width,this.CANVAS.height);
		}
		//ctx.fillStyle = "black";
		//ctx.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
		
		var x0 = this.CANVAS.width/2;
		var y0 = this.CANVAS.height/2;
		
		radius 		= this.InnerRadius;
		radiusInc 	= this.RadiusIncrement;
		for(i=0;i<arr.length;i++){
			var AngInc = 360/arr[i].length;
			
			for(j=0;j<arr[i].length;j++){
				var ang = 360-j*AngInc;
				var mazeElem = arr[i][j].toString(2).padStart(4, '0');
				
				var angR 	= this.getRads(ang);
				var angIncR = this.getRads(ang-AngInc);
				
				var radInc	= radius+radiusInc;
				
				ctx.beginPath();
				var x = x0 + radius*Math.cos(angR);
				var y = y0 + radius*Math.sin(angR);
				ctx.moveTo(x,y);
				
				x = x0 + radInc*Math.cos(angR);
				y = y0 + radInc*Math.sin(angR);
				if(mazeElem[1] === '0'){//ccw
					ctx.lineTo(x,y);
				}else{
					ctx.moveTo(x,y);
				}
				
				x = x0 + radInc*Math.cos(angIncR);
				y = y0 + radInc*Math.sin(angIncR);
				if(mazeElem[3] === '0'){//out
					if(i===arr.length-1)
						ctx.arc(x0,y0,radInc, angR, angIncR, true);
					ctx.moveTo(x,y);
				}else{
					ctx.moveTo(x,y);
				}
				
				x = x0 + radius*Math.cos(angIncR);
				y = y0 + radius*Math.sin(angIncR);
				if(mazeElem[0] === '0'){//cw
					ctx.lineTo(x,y);
				}else{
					ctx.moveTo(x,y);
				}
				
				x = x0 + radius*Math.cos(angR);
				y = y0 + radius*Math.sin(angR);
				if(mazeElem[2] === '0'){//in
					ctx.arc(x0,y0,radius, angIncR, angR, false);
					ctx.moveTo(x,y);
				}else{
					ctx.moveTo(x,y);
				}
				ctx.stroke();
			}
			radius += radiusInc;
		}
	},
	drawOverMaze	: function(){
		this.ClearMaze = false;
		this.redrawMaze();
		this.ClearMaze = true;
	}
	
};

var _mazeController = {
	STORE			: undefined,
	DRAWER			: undefined,
	
	IntervalId		: undefined,
	Fps				: 60,
	
	//drawer setters
	set InnerRadius(value){
		this.DRAWER.InnerRadius = parseInt(value);
	}, 
	get InnerRadius(){
		return this.DRAWER.InnerRadius;
	},
	set RadiusIncrement(value){
		this.DRAWER.RadiusIncrement = parseInt(value);
	}, 
	set LineColor(value){
		this.DRAWER.LineColor = value;
	},
	set LineWidth(value){
		this.DRAWER.LineWidth = parseInt(value);
	},
	set fps(value){
		this.Fps = parseInt(value);
		if(this.IntervalId){
			this.mazeAnimateStop();
			this.mazeAnimate();
		}
		document.getElementById("lblFps").innerText = "fps(" + value + ")";
	},
	
	init			: function(store, drawer){
		this.STORE = store;
		this.DRAWER = drawer;
		
		this.STORE.initCyrcleCells();
		this.DRAWER.Store = this.STORE;
	},
	makeStep		: function(){
		if(!this.STORE || !this.DRAWER){
			alert('Please Initiate the Controller!');
			return;
		}
		//debugger;
		this.STORE.pathBuilder();
		this.STORE.setExits();
		this.DRAWER.redrawMaze();
		if(this.STORE.isFullMaze && this.IntervalId){
			this.mazeAnimateStop();
		}
	},
	mazeAnimate		: function(){
		this.IntervalId = setInterval(function(){
			_mazeController.makeStep();
		},1000/this.Fps);
	},
	mazeAnimateStop	: function(){
		clearInterval(this.IntervalId);
		this.IntervalId = 0;
	}
};

_labStore.DIMENTIONS.X = 10;
_labStore.DIMENTIONS.Y = 30;

_labDrawer.LineWidth = 1;
_labDrawer.RadiusIncrement = 8;

_mazeController.init(_labStore, _labDrawer);
//_mazeController.STORE.direcMazePopulate();
//_mazeController.mazeAnimate(50);

//_mazeController.mazeAnimateStop();