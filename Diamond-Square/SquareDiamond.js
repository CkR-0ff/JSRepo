class DiamondGenerator {
	constructor(n, errVal){
		this.n = n;
		this.errVal = errVal;
		this.gridSize = Math.pow(2,n) + 1;
		
		this.mainArr = new Array(this.gridSize).fill(null).map(() =>Array(this.gridSize).fill(0));
		this.setCorners();
	}
	get err(){
		return this.errVal*(Math.round(Math.random()) * 2 - 1);
	}
	
	getAverageDiamond(dot, len){
		//debugger;
		let avg = 0;
		let dev = 0;
		if(dot[1] !== 0){
			avg += this.mainArr[dot[0]][dot[1]-len/2];
			dev++;
		}
		if(dot[0] !== 0){
			avg += this.mainArr[dot[0]-len/2][dot[1]];
			dev++;
		}
		if(dot[1] < this.gridSize-1){
			avg += this.mainArr[dot[0]][dot[1]+len/2];
			dev++;
		}
		if(dot[0] < this.gridSize-1){
			avg += this.mainArr[dot[0]+len/2][dot[1]];
			dev++
		}
		
		return avg/dev;
	}
	
	setCorners(){
		this.mainArr[0][0] = Math.ceil(Math.random()*200);
		this.mainArr[0][this.gridSize-1] = Math.ceil(Math.random()*200);
		this.mainArr[this.gridSize-1][0] = Math.ceil(Math.random()*200);
		this.mainArr[this.gridSize-1][this.gridSize-1] = Math.ceil(Math.random()*200);
	}
	
	stepSquare(x, y, len){
		//debugger;
		let tl = this.mainArr[x*len][y*len];
		let tr = this.mainArr[x*len+len][y*len];
		let bl = this.mainArr[x*len][y*len+len];
		let br = this.mainArr[x*len+len][y*len+len];
		this.mainArr[x*len+len/2][y*len+len/2] = Math.ceil((tl+tr+bl+br)/4+this.err);
	}
	stepDiamond(x, y, len){
		//debugger;
		let leftPos = [x*len+len/2, y*len];
		let rightPos = [x*len+len/2, y*len+len];
		let topPos = [x*len, y*len+len/2];
		let bottomPos = [x*len+len, y*len+len/2];
		
		this.mainArr[topPos[0]][topPos[1]] = Math.max(Math.ceil(this.getAverageDiamond(topPos, len)+this.err),0);
		this.mainArr[bottomPos[0]][bottomPos[1]] = Math.max(Math.ceil(this.getAverageDiamond(bottomPos, len)+this.err),0);
		this.mainArr[leftPos[0]][leftPos[1]] = Math.max(Math.ceil(this.getAverageDiamond(leftPos, len)+this.err),0);
		this.mainArr[rightPos[0]][rightPos[1]] = Math.max(Math.ceil(this.getAverageDiamond(rightPos, len)+this.err),0);
	}
	iterate(iteration){
		let subSqrCountSide = Math.pow(2,iteration);
		let subSqrLen = (this.gridSize-1)/subSqrCountSide;
		//debugger;
		
		for(let y = 0; y < subSqrCountSide; y+=1){
			for(let x = 0; x < subSqrCountSide; x+=1){
				this.stepSquare(x, y, subSqrLen);
				this.stepDiamond(x, y, subSqrLen);
			}
		}
	}
	
	start(){
		for(let i=0; i<this.n; i++){
			this.iterate(i);
			this.errVal = this.errVal/1.5;
		}
	}
}

function putCanv(){

	let diam = new DiamondGenerator(12, 55);
	diam.start();

	var canv = document.createElement('canvas');
	canv.id="heatmap";
	canv.width = diam.gridSize;
	canv.height = diam.gridSize;
	document.body.appendChild(canv);
	
	let ctx = canv.getContext("2d");
	let imgData = ctx.getImageData(0,0,canv.width,canv.height);
	let data = imgData.data;
	debugger;
	for (let i = 0; i < diam.gridSize; i++) {
		for (let j = 0; j < diam.gridSize*4; j+=4) {
			let pixPos = i*diam.gridSize*4+j;
			data[pixPos] = diam.mainArr[j/4][i];
			data[pixPos+1] = 255-diam.mainArr[j/4][i];
			data[pixPos+2] = 0;
			data[pixPos+3] = 255;
		}
	}

	ctx.putImageData(imgData, 0, 0);
}