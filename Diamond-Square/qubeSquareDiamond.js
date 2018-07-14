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
class Qube{
    constructor(p000, size){
        this.size   = size;
        this.mid    = size/2;
        this.center = new Point(p000.x+this.mid,p000.y+this.mid,p000.z+this.mid);
    }
    _p(xS, yS, zS){
        return new Point(
            this.center.x+xS*this.mid,//x
            this.center.y+yS*this.mid,//y
            this.center.z+zS*this.mid //z
        );
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
class Square{
    constructor(p000, size){
        this.size   = size;
        this.mid    = size/2;
        this.center = new Point(p000.x+this.mid,p000.y+this.mid,p000.z+this.mid);
    }
    //calculating centre points of the sides from matrix
    _pS(xS, yS, zS){
        return new Point(
            this.center.x + xS*this.mid,//x
            this.center.y + yS*this.mid,//y
            this.center.z + zS*this.mid //z
        );
    }
    //calculating surroundin poins for a centre point of a side
    _pE(pS, aS, bS, ext){
        let retPoint = new Point();
        if (pS.x !== this.center.x){
            retPoint.x = pS.x;
            retPoint.y = pS.y+aS*this.mid;
            retPoint.z = pS.z+bS*this.mid;
        }
        if (pS.y !== this.center.y){
            retPoint.x = pS.x+aS*this.mid;
            retPoint.y = pS.y;
            retPoint.z = pS.z+bS*this.mid;
        }
        if (pS.z !== this.center.z){
            retPoint.x = pS.x+aS*this.mid;
            retPoint.y = pS.y+bS*this.mid;
            retPoint.z = pS.z;
        }
        
        return retPoint;
    }
    get SidePoints(){return [
        this._pS( 0,-1, 0),
        this._pS( 0, 1, 0),
        this._pS(-1, 0, 0),
        this._pS( 1, 0, 0),
        this._pS( 0, 0,-1),
        this._pS( 0, 0, 1)
    ]}
    squarePointsFor(pS){
        return [
            this._pE(pS, -1, -1),
            this._pE(pS, -1,  1),
            this._pE(pS,  1, -1),
            this._pE(pS,  1,  1),
        ];
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