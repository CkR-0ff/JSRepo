class Tools{
    static MultiArr(initVal, ...dimentions){
        function iter(dim){
            var curDime = dim.shift();
            var curArr  = new Array(curDime);
            for(var i=0;i<curDime;i++){
                if(dim.length>0)
                    curArr[i] = iter(Array.from(dim));
                else
                    curArr[i] = (typeof(initVal) === "function" ? initVal() : initVal);
            }
            return curArr;
        }
        return iter(dimentions);
    }
    static Arr3D(initVal, size){
        return new Array(size).fill(null).map(
            ()=>Array(size).fill(null).map(
                ()=>Array(size).fill((typeof(initVal) === "function" ? initVal() : initVal))
            )
        );
    }
    static Rnd(){
        return Math.floor(Math.random()*256);
    }
    static get rnd(){
        return Math.floor(Math.random()*256);
    }
    static rndSign(){
        return Math.round(Math.random()) * 2 - 1;
    }
}

class Point{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    isInCube(max){
        if ((this.x>=0 && this.x<max) && 
            (this.y>=0 && this.y<max) &&
            (this.z>=0 && this.z<max)) {
           return true;
        }
        return false;
    }
}
class Shape{
    constructor(p000, size){
        this.size   = size;
        this.mid    = size/2;
        this.center = new Point(p000.x+this.mid,p000.y+this.mid,p000.z+this.mid);
    }
    //calculating centre points of the sides from matrix
    _p(xS, yS, zS){
        return new Point(
            this.center.x+xS*this.mid,//x
            this.center.y+yS*this.mid,//y
            this.center.z+zS*this.mid //z
        );
    }
}
class Qube extends Shape{
    constructor(p000, size){
        super(p000, size);
    }
    get CenterPoint(){
        return this.center;
    }
    get qubePoints(){return [
        this._p(-1,-1,-1),
        this._p( 1,-1,-1),
        this._p(-1,-1, 1),
        this._p( 1,-1, 1),
        this._p(-1, 1,-1),
        this._p( 1, 1,-1),
        this._p(-1, 1, 1),
        this._p( 1, 1, 1)
    ]}
}
class Square extends Shape{
    constructor(p000, size){
        super(p000, size);
    }
    get SidePoints(){return [
        this._p( 0,-1, 0),
        this._p( 0, 1, 0),
        this._p(-1, 0, 0),
        this._p( 1, 0, 0),
        this._p( 0, 0,-1),
        this._p( 0, 0, 1)
    ]}
    //calculating square's surroundin poins for a centre point of a side by matrix
    _pS(pS, aS, bS, cS){
        let retPoint = new Point();
        if (pS.x !== this.center.x){
            retPoint.x = pS.x+cS*this.mid;
            retPoint.y = pS.y+aS*this.mid;
            retPoint.z = pS.z+bS*this.mid;
        }
        if (pS.y !== this.center.y){
            retPoint.x = pS.x+aS*this.mid;
            retPoint.y = pS.y+cS*this.mid;
            retPoint.z = pS.z+bS*this.mid;
        }
        if (pS.z !== this.center.z){
            retPoint.x = pS.x+aS*this.mid;
            retPoint.y = pS.y+bS*this.mid;
            retPoint.z = pS.z+cS*this.mid;
        }
        
        return retPoint;
    }

    squarePointsFor(pS){
        return [
            this._pS(pS, -1, -1,  0),
            this._pS(pS, -1,  1,  0),
            this._pS(pS,  1, -1,  0),
            this._pS(pS,  1,  1,  0),
            this._pS(pS,  0,  0, -1),
            this._pS(pS,  0,  0,  1)
        ];
    }
    
}
class Diamond extends Shape{
    constructor(p000, size){
        super(p000, size);
    }
    get EdgePoints(){return [
        this._p(-1, 0,-1),this._p( 1, 0,-1),
        this._p( 1, 0, 1),this._p(-1, 0, 1),
        this._p( 0,-1,-1),this._p( 1,-1, 0),
        this._p( 0,-1, 1),this._p(-1,-1, 0),
        this._p( 0, 1,-1),this._p( 1, 1, 0),
        this._p( 0, 1, 1),this._p(-1, 1, 0)
    ]}
    _pD(pD, aD, bD, cD){
        let retPoint = new Point();
        if(pD.x === this.center.x){
            retPoint.x = pD.x+cD*this.mid;
            retPoint.y = pD.y+bD*this.mid;
            retPoint.z = pD.z+aD*this.mid;
        }
        if(pD.y === this.center.y){
            retPoint.x = pD.x+aD*this.mid;
            retPoint.y = pD.y+cD*this.mid;
            retPoint.z = pD.z+bD*this.mid;
        }
        if(pD.z === this.center.z){
            retPoint.x = pD.x+aD*this.mid;
            retPoint.y = pD.y+bD*this.mid;
            retPoint.z = pD.z+cD*this.mid;
        }
        return retPoint;
    }
    diamondPointFor(pD){
        return [
            this._pD(pD,-1, 0, 0),this._pD(pD, 0, 0,-1),
            this._pD(pD, 1, 0, 0),this._pD(pD, 0, 0, 1),
            this._pD(pD, 0,-1, 0),this._pD(pD, 0, 1, 0),
            this._pD(pD,-1,-1, 0),this._pD(pD, 1,-1, 0),
            this._pD(pD, 1, 1, 0),this._pD(pD,-1, 1, 0),
        ]
    }
}

class QubeStage{
    constructor(n, dev){
        this.n = n;
        this.deviation = dev;
        this.size = Math.pow(2,n)+1;
        this.max = this.size-1;

        this.arr = Tools.MultiArr(0, this.size, this.size, this.size);
    }
    setP(pt, val){
        this.arr[pt.x][pt.y][pt.z] = Math.floor(val);
    }
    getP(pt){
        return this.arr[pt.x][pt.y][pt.z];
    }

    set corners(_val){
        this.setP(new Point(0       ,  0,           0       ),   _val[0][0][0]);
        this.setP(new Point(0       ,  this.max,    0       ),   _val[0][1][0]);
        this.setP(new Point(this.max,  0,           0       ),   _val[1][0][0]);
        this.setP(new Point(this.max,  this.max,    0       ),   _val[1][1][0]);
        this.setP(new Point(0       ,  0,           this.max),   _val[0][0][1]);
        this.setP(new Point(0       ,  this.max,    this.max),   _val[0][1][1]);
        this.setP(new Point(this.max,  0,           this.max),   _val[1][0][1]);
        this.setP(new Point(this.max,  this.max,    this.max),   _val[1][1][1]);
    }
}

class StageBuilder{
    constructor(stage){
        this.stage = stage;
    }

    rndSignDeviation(sum, divisor){
        let rndSign = Tools.rndSign();
        let dev = (sum/divisor)+rndSign*this.stage.deviation;

        return dev;
    }

    setRandomCorners(){
        let cornGrid = Tools.MultiArr(Tools.Rnd, 2,2,2);
        this.stage.corners = cornGrid;
    }

    doQubeStepFor(qube){
        let centPoint = qube.center;
        let sum       = 0;
        let divisor   = 0;

        for (let i = 0; i < qube.qubePoints.length; i++) {
            let pt = qube.qubePoints[i];
            
            if (pt.isInCube(this.stage.size)) {
                let val = this.stage.getP(pt);
                sum+=val;
                divisor++;
            }
        }

        let centVal = this.rndSignDeviation(sum, divisor);
        this.stage.setP(centPoint, centVal);
    }
    doSquareStepFor(square){
        for (let i = 0; i < square.SidePoints.length; i++) {
            let sum     = 0;
            let divisor = 0;

            let sidePoint = square.SidePoints[i];
            let squarePoints = square.squarePointsFor(sidePoint);
            for (let j = 0; j < squarePoints.length; j++) {
                let pt = squarePoints[j];
                if (pt.isInCube(this.stage.size)) {
                    let val = this.stage.getP(pt);
                    sum+=val;
                    divisor++;
                }
            }

            let sideVal = this.rndSignDeviation(sum, divisor);
            this.stage.setP(sidePoint, sideVal);
        }
    }
    doDiamondStepFor(diamond){
        for (let i = 0; i < diamond.EdgePoints.length; i++) {
            let sum     = 0;
            let divisor = 0;
            
            let edgePoint = diamond.EdgePoints[i];
            let diamondPoints = diamond.diamondPointFor(edgePoint);
            for (let j = 0; j < diamondPoints.length; j++) {
                let pt = diamondPoints[j];
                if (pt.isInCube(this.stage.size)) {
                    let val = this.stage.getP(pt);
                    sum+=val;
                    divisor++;
                }
            }

            let edgeVal = this.rndSignDeviation(sum, divisor);
            this.stage.setP(edgePoint, edgeVal);
        }
    }

    iterate(iteration){
        let subFactor = Math.pow(2,iteration);
        let subLength = this.stage.max/subFactor;

        let coordLoop = function(stepCall){
            for (let z = 0; z < subFactor; z++) {
                for (let y = 0; y < subFactor; y++) {
                    for (let x = 0; x < subFactor; x++) {
                        stepCall(x,y,z, subLength);
                    }
                }
            }
        }
        
        coordLoop((x,y,z, len)=>{
            let point = new Point(x*len,y*len,z*len);
            let qube  = new Qube(point, len);
            this.doQubeStepFor(qube);
        });
        coordLoop((x,y,z, len)=>{
            let point = new Point(x*len,y*len,z*len);
            let square = new Square(point, len)
            this.doSquareStepFor(square);
        });
        coordLoop((x,y,z, len)=>{
            let point = new Point(x*len,y*len,z*len);
            let diamond = new Diamond(point, len);
            this.doDiamondStepFor(diamond);
        });
    }

    iterator(){
        for(let i=0; i<this.stage.n; i++){
			this.iterate(i);
			this.stage.deviation = this.stage.deviation/1.5;
		}
    }
}