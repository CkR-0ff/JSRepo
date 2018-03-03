var width = 30;
var height = 30;

var blockSize = 10;
var wallWidth = 1;

var arr2 = Array(height).fill().map(() => Array(width).fill(0));

var DIRECTION = [
	"North","South","East ","West "
];
var randArray = function(arr){
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
var DIRECVAL = {
	"North":1,
	"South":2,
	"East ":4,
	"West ":8
};
var OPPOSIITE = {
	"North":"South",
	"South":"North",
	"East ":"West ",
	"West ":"East "
};
var DX = {
	"East ": 1,
	"West ": -1,
	"North": 0,
	"South": 0
};
var DY = {
	"East ": 0,
	"West ": 0,
	"North": 1,
	"South": -1
};

var setPassage = function(cX, cY, grid){
	var inarr = Array.from(DIRECTION);
	inarr = randArray(inarr);
	
	inarr.forEach(function(elem, idx, arr){
		var nX = cX + DX[elem];
		var nY = cY + DY[elem]
		
		if((nY>=0 && nY<grid.length) && (nX>=0 && nX<grid[nY].length) && grid[nY][nX] === 0){
			grid[cY][cX] |= DIRECVAL[elem];
			grid[nY][nX] |= DIRECVAL[OPPOSIITE[elem]];
			setPassage(nX,nY,grid);
		}
	});
	
};

var writeToConsole = function(arr2d){
	for(var x=0; x<arr2d.length; x++){
		var xStr = "|";
		for(var y=0; y<arr2d[x].length; y++){
			xStr += arr2d[x][y].toString(2).padStart(4,'0') + "|";
		}
		console.log(xStr + "---" + x);
	}
};
var writeLineMaze = function(arr){
	console.log('_'.repeat(width*2-1));
	for(var i=0; i<height; i++){
		var lineString = '|';
		for(var j=0; j<width; j++){
			lineString += (arr[i][j] & DIRECVAL["South"] != 0) ? " " : "_";
			if(arr[i][j] & DIRECVAL["East "] != 0){
				lineString += ((arr[i][j] | arr[i][j+1]) & DIRECVAL["South"] != 0) ? " " : "_";
			}else{
				lineString += "|";
			}
		}
		console.log(lineString);
	}
};
var writeOnCanvas = function(width,height,arr){
	var canvas = document.createElement('canvas');
	
	canvas.id = "CursorLayer";
	canvas.width = width*blockSize;
	canvas.height = height*blockSize;
	canvas.style.zIndex = 1000;
	canvas.style.position = "relative";
	canvas.style.border = "1px solid";
	
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	var ctx=canvas.getContext("2d");
	ctx.strokeStyle="#000000";
	ctx.lineWidth=wallWidth;
	debugger;
	ctx.beginPath();
	for(var i=0; i<width; i++){
		for(var j=0; j<height; j++){
			var mazeElem = arr[j][i].toString(2).padStart(4, '0');
			
			ctx.moveTo(i*blockSize,j*blockSize);
			if(mazeElem[0] === '0'){//west
				ctx.lineTo(i*blockSize, j*blockSize+blockSize);
			}else{
				ctx.moveTo(i*blockSize,j*blockSize+blockSize);
			}
			if(mazeElem[3] === '0'){//north
				ctx.lineTo(i*blockSize+blockSize, j*blockSize+blockSize);
			}else{
				ctx.moveTo(i*blockSize+blockSize,j*blockSize+blockSize);
			}
			if(mazeElem[1] === '0'){//east
				ctx.lineTo(i*blockSize+blockSize, j*blockSize);
			}else{
				ctx.moveTo(i*blockSize+blockSize,j*blockSize);
			}
			if(mazeElem[2] === '0'){//south
				ctx.lineTo(i*blockSize, j*blockSize);
			}else{
				ctx.moveTo(i*blockSize,j*blockSize);
			}
		}
	}
	ctx.stroke();
};

setPassage(0,0,arr2);

writeOnCanvas(width, height, arr2);