var DIRECTIONS 	= ['OUT','IN','CW','CCW'];
var DIRECTVALS 	= {'OUT':1,'IN':2,'CW':4,'CCW':8};
var OPPOSIITES 	= {'OUT':'IN','IN':'OUT','CW':'CCW','CCW':'CW'};

var MoveX 		= {'OUT':0,'IN':0,'CW':-1,'CCW':1};
var MoveY 		= {'OUT':1,'IN':-1,'CW':0,'CCW':0};

var secCell = function(){
	return Math.random() >= 0.5;
};

var randomizeArray = function(arr){
	arrIn = Array.from(arr)
	var len = arrIn.length;
	var retArr = [];
	while(arrIn.length > 0){
		var rndElem = Math.floor(Math.random()*arrIn.length);
		retArr.push(arrIn[rndElem]);
		arrIn.splice(rndElem, 1);
	}
	return retArr;
};

var createCellArray = function(initCells, tracks){
	var tracksArrar = [];
	var numOfCells = initCells/2;
	
	for(var i=2; i<tracks+2; i++){
		if(i && !(i & (i - 1)) && i !== 1){
			numOfCells = numOfCells*2;
		}
		var cellsInTrack = Array(numOfCells).fill(0);
		tracksArrar.push(cellsInTrack);
	}
	return tracksArrar;
};

var checkIsInc = function(num){
	var numStr = num.toString(2);
	if(numStr[numStr.length-1] === '0'){
		if(!numStr.substring(0, numStr.length-1).includes('0')){
			return true;
		}
	}
	return false;
};

var setPassage = function(cX, cY, grid){
	var randDirs = randomizeArray(DIRECTIONS);
	//debugger;
	randDirs.forEach(function(elem, idx, arr){
		nX = cX + MoveX[elem];
		nY = cY + MoveY[elem];
		
		if(nY>=0 && nY<grid.length){
			if(nX<0){
				nX = grid[nY].length -1;
			}
			if(nX>=grid[nY].length){
				nX = 0;
			}
			if(cY<nY && checkIsInc(nY)){
				nX = (secCell()) ?  nX*2 + 1: nX*2;
			}else if(cY>nY && checkIsInc(cY)){
				nX = Math.floor(nX/2);
			}
			if(grid[nY][nX] === 0){
				grid[cY][cX] |= DIRECTVALS[elem];
				grid[nY][nX] |= DIRECTVALS[OPPOSIITES[elem]];
				setPassage(nX,nY, grid);
			}
		}
	});
};

var incOnCanvas = function(cellSize, grid){
	var canvas = document.createElement('canvas');
	
	canvas.id = "cnvsElem1";
	canvas.width = grid[grid.length-1].length*cellSize;
	canvas.height = 500;
	canvas.style.zIndex = 1000;
	canvas.style.position = "relative";
	canvas.style.top = 0;
	canvas.style.border = "1px solid";
	
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	var ctx=canvas.getContext("2d");
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth=1;
	debugger;
	
	var multY = 0;
	var baseY = 0;
	var baseX = 0;
	
	
	for(var y = 0; y<grid.length; y++){
		var multiplier = canvas.width/grid[y].length;
		ctx.beginPath();
		for(var x= 0; x<grid[y].length; x++){
			
			var mazeElem = grid[y][x].toString(2).padStart(4, '0');
			baseX = x*multiplier;
			
			ctx.moveTo(baseX,baseY);
			if(mazeElem[1] === '0'){//ccw
				ctx.lineTo(baseX,baseY+multiplier);
			}else{
				ctx.moveTo(baseX,baseY+multiplier);
			}
			
			if(mazeElem[3] === '0'){//out
				ctx.lineTo(baseX+multiplier,baseY+multiplier);
			}else{
				ctx.moveTo(baseX+multiplier,baseY+multiplier);
			}
			
			if(mazeElem[0] === '0'){//cw
				ctx.lineTo(baseX+multiplier,baseY);
			}else{
				ctx.moveTo(baseX+multiplier,baseY);
			}
			
			if(mazeElem[2] === '0'){//in
				ctx.lineTo(baseX,baseY);
			}else{
				ctx.moveTo(baseX,baseY);
			}
		}
		ctx.stroke();
		baseY += multiplier;
	}
};

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
var getRads = function(ang){
	return ang*Math.PI/180;
};
var polyBuilder = function(innerRadius, radiusInc, arr){
	
	var canvas = document.createElement('canvas');
	
	canvas.id = "cnvsElem2";
	canvas.width = 500;
	canvas.height = 500;
	canvas.style.zIndex = 1000;
	canvas.style.position = "relative";
	canvas.style.top = 0;
	canvas.style.border = "1px solid";
	
	var x0 = canvas.width/2;
	var y0 = canvas.height/2;
	
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	var ctx=canvas.getContext("2d");
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth=1;
	
	radius = innerRadius;
	
	for(i=0;i<arr.length;i++){
		var AngInc = 360/arr[i].length;
		ctx.beginPath();
		//ctx.moveTo(x0+radius,y0);
		//debugger;
		for(j=0;j<arr[i].length;j++){
			var ang = j*AngInc;
			var mazeElem = arr[i][j].toString(2).padStart(4, '0');
			
			var x = x0 + radius*Math.cos(getRads(ang));
			var y = y0 + radius*Math.sin(getRads(ang));
			ctx.moveTo(x,y);
			
			x = x0 + (radius+radiusInc)*Math.cos(getRads(ang));
			y = y0 + (radius+radiusInc)*Math.sin(getRads(ang));
			if(mazeElem[1] === '0'){//ccw
				ctx.lineTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			x = x0 + (radius+radiusInc)*Math.cos(getRads(ang+AngInc));
			y = y0 + (radius+radiusInc)*Math.sin(getRads(ang+AngInc));
			if(mazeElem[3] === '0'){//out
				ctx.lineTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			x = x0 + radius*Math.cos(getRads(ang+AngInc));
			y = y0 + radius*Math.sin(getRads(ang+AngInc));
			if(mazeElem[0] === '0'){//cw
				ctx.lineTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			x = x0 + radius*Math.cos(getRads(ang));
			y = y0 + radius*Math.sin(getRads(ang));
			if(mazeElem[2] === '0'){//in
				ctx.lineTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
		}
		radius += radiusInc;
		ctx.stroke();
	}
	
};

var drawCyrc = function(innerRadius, radiusInc, arr){
	
	var canvas = document.createElement('canvas');
	
	canvas.id = "cnvsElem3";
	canvas.width = 500;
	canvas.height = 500;
	canvas.style.zIndex = 1000;
	canvas.style.position = "relative";
	canvas.style.top = 0;
	canvas.style.border = "1px solid";
	
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	var ctx=canvas.getContext("2d");
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth=1;
	
	var x0 = canvas.width/2;
	var y0 = canvas.height/2;
	
	radius = innerRadius;
	for(i=0;i<arr.length;i++){
		var AngInc = 360/arr[i].length;
		
		for(j=0;j<arr[i].length;j++){
			var ang = 360-j*AngInc;
			var mazeElem = arr[i][j].toString(2).padStart(4, '0');
			
			ctx.beginPath();
			var x = x0 + radius*Math.cos(getRads(ang));
			var y = y0 + radius*Math.sin(getRads(ang));
			ctx.moveTo(x,y);
			
			x = x0 + (radius+radiusInc)*Math.cos(getRads(ang));
			y = y0 + (radius+radiusInc)*Math.sin(getRads(ang));
			if(mazeElem[1] === '0'){//ccw
				ctx.lineTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			
			x = x0 + (radius+radiusInc)*Math.cos(getRads(ang-AngInc));
			y = y0 + (radius+radiusInc)*Math.sin(getRads(ang-AngInc));
			if(mazeElem[3] === '0'){//out
				ctx.arc(x0,y0,radius+radiusInc, getRads(ang), getRads(ang-AngInc), true);
				ctx.moveTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			
			x = x0 + radius*Math.cos(getRads(ang-AngInc));
			y = y0 + radius*Math.sin(getRads(ang-AngInc));
			if(mazeElem[0] === '0'){//cw
				ctx.lineTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			
			x = x0 + radius*Math.cos(getRads(ang));
			y = y0 + radius*Math.sin(getRads(ang));
			if(mazeElem[2] === '0'){//in
				ctx.arc(x0,y0,radius, getRads(ang-AngInc), getRads(ang), false);
				ctx.moveTo(x,y);
			}else{
				ctx.moveTo(x,y);
			}
			ctx.stroke();
		}
		radius += radiusInc;
	}
};

var nGrid = createCellArray(9, 20);
setPassage(0, 0, nGrid);
incOnCanvas(7, nGrid);
polyBuilder(20, 5, nGrid);
drawCyrc(20, 5, nGrid);

//function paints:laby_bu/start  /function paints:firelab/bu/start
//MC Seed: 7033729486952459499