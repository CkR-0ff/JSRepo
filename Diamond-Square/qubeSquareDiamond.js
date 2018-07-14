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
}

class Point{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
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
    get Points(){return [
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
        let retPoint = netPoint();
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
    /* valVal(val){
        if(!isNaN(val)){
            
        }
    } */
    setP(x, y, z, val){
        this.arr[x][y][z] = Math.floor(val);
    }
    getP(x, y, z){
        return this.arr[x][y][z];
    }

    set corners(_val){
        setP(0,         0,          0,          _val[0][0][0]) ;setP(0,         this.max,   0,          _val[0][1][0]);
        setP(this.max,  0,          0,          _val[1][0][0]) ;setP(this.max,  this.max,   0,          _val[1][1][0]);
        setP(0,         0,          this.max,   _val[0][0][1]) ;setP(0,         this.max,   this.max,   _val[0][1][1]);
        setP(this.max,  0,          this.max,   _val[1][0][1]) ;setP(this.max,  this.max,   this.max,   _val[1][1][1]);
    }
}

class StageBuilder{
    constructor(stage){
        this.stage = stage;
    }

    setRandomCorners(){
        let cornGrid = Tools.MultiArr(Tools.Rnd, 2,2,2);
        this.stage.corners = cornGrid;
    }
}