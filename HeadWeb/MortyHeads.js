let mortyArray = mortyHeads;
    
class Tools{
    constructor(){

    }
    static RandomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static isInRange(val, min, max){
        return (val<max && val>min)
    }

    static pointAngle(point, origin){
        let yO = origin.y-point.y;
        let xO = origin.x-point.x;
        if(yO<0){
            return Math.atan2(Math.abs(yO), xO);
        }else{
            return Math.PI*2 - Math.atan2(Math.abs(yO), xO);
        }
    }
    static ellipsRadius(angle, a, b){
        let r = a*b/Math.sqrt(Math.pow(b*Math.cos(angle),2)+Math.pow(a*Math.sin(angle),2));
        return r;
    }
    static pointOnSuperEllipse2(angle, a, b, n){
        let radius = a*b/Math.pow(Math.pow(Math.abs(b*Math.cos(angle)),n)+Math.pow(Math.abs(a*Math.sin(angle)),n),1/n);
        let pos = new Position(radius*Math.cos(angle), radius*Math.sin(angle));

        return pos;
    }


    static dataURLtoBlob (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
    static downloadCanvas (canvas, name){
        var link = document.createElement("a");
        var imgData = canvas.toDataURL({
            format: 'png',
            multiplier: 4});
        var strDataURI = imgData.substr(22, imgData.length);
        var blob = this.dataURLtoBlob(imgData);
        var objurl = URL.createObjectURL(blob);

        link.download = name;

        link.href = objurl;
    
        link.click();
    } 
}

class Position{
    constructor(x, y){
        this.x =x;
        this.y =y;
    }
}
class Size{
    constructor(width, height){
        this.w = width;
        this.h = height;
        if (!height) {
            this.h = width;
        }
    }
}
class Rotation{
    constructor(angle){
        this.ang = angle;
    }
    get angRad(){
        return (Math.PI/180)*this.ang;
    }
}

class Mount{
    constructor(position, size, rotation){
        this.pos = position;
        this.size = size;
        this.rot = rotation;
    }
    get tl(){
        return new Position(this.pos.x, this.pos.y);
    }
    get tr(){
        return new Position(this.pos.x+this.size.w, this.pos.y);
    }
    get bl(){
        return new Position(this.pos.x, this.pos.y+this.size.h);
    }
    get br(){
        return new Position(this.pos.x+this.size.w, this.pos.y+this.size.h);
    }
    intersects(mount){
        //debugger;
        if (((mount.pos.x > this.pos.x+this.size.w) || (mount.pos.y > this.pos.y+this.size.h)) || 
            ((mount.pos.x+mount.size.w < this.pos.x) || (mount.pos.y+mount.size.h < this.pos.y))) {
            return false;
        }
        return true;
    }
}

class WebDrawer{
    constructor(imgArray){
        this.imgArray = imgArray;
        this.mountsArray = new Array(imgArray.length);
        this.width = 6000;
        this.height = 7500;
        this.minSize = 175;
        this.maxSize = 500;
        this.rotAngl = 120;
        this.ellParam = 4;
    }
    hitsArray(mount){
        let ret = false;
        this.mountsArray.forEach(element => {
            if(element.intersects(mount) || mount.intersects(element)){
                ret = true;
            }
        });
        //debugger;
        return ret;
    }
    isOutOfEllips(mount, nL = 2){
        let a = this.width/2;
        let b = this.height/2;
        let n = nL;
        let origin = new Position(a,b);

        let angTl = Tools.pointAngle(mount.tl, origin);
        let angTr = Tools.pointAngle(mount.tr, origin);
        let angBl = Tools.pointAngle(mount.bl, origin);
        let angBr = Tools.pointAngle(mount.br, origin);

        
        if (mount.tl.x<origin.x && mount.tl.y<origin.y) {
                let pTl = Tools.pointOnSuperEllipse2(angTl,a,b, n);
                if (mount.tl.x<pTl.x+origin.x && mount.tl.y<pTl.y+origin.y) {
                    return true;
                }
        }
        
        if (mount.tr.x>origin.x && mount.tr.y<origin.y) {
                let pTr = Tools.pointOnSuperEllipse2(angTr,a,b, n);
                if (mount.tr.x>pTr.x+origin.x && mount.tr.y<pTr.y+origin.y) {
                    return true;
                }
        }
        
        if (mount.bl.x<origin.x && mount.bl.y>origin.y) {
                let pBl = Tools.pointOnSuperEllipse2(angBl,a,b, n);
                if (mount.bl.x<pBl.x+origin.x && mount.bl.y>pBl.y+origin.y) {
                    return true;
                }
        }
        
        if (mount.br.x>origin.x && mount.br.y>origin.y) {
                let pBr = Tools.pointOnSuperEllipse2(angBr,a,b, n);
                if (mount.br.x>pBr.x+origin.x && mount.br.y>pBr.y+origin.y) {
                    return true;
                }
        }
        return false;
    }
    getRandomMount(){
        return new Mount(
            new Position(
                Tools.RandomRange(0, this.width), 
                Tools.RandomRange(0, this.height)
            ),
            new Size(
                Tools.RandomRange(this.minSize,this.maxSize)
            ),
            new Rotation(
                Tools.RandomRange(-this.rotAngl,this.rotAngl)
            )
        );
    }

    createMounts(ellParam = this.ellParam){
        this.mountsArray = new Array(this.imgArray.length);
        for(let i = 0; i < this.imgArray.length; i++) {
            let mount = this.getRandomMount();
            if(i>=0 && i<=14){
                mount.size.w=500;
                mount.size.h=500;
            }
            while (this.hitsArray(mount) || this.isOutOfEllips(mount,ellParam)) {
                mount = this.getRandomMount();
            }
            this.mountsArray[i] = mount;
        }
    }
}

class CanvasDrawer{
    constructor(drawer){
        this.drawer = drawer;
        this.lineWidth = 10;
        this.linkRange = 500;
    }
    getCanvas(){
        let canv = document.getElementById("faceCanvas");
        if (!canv) {
            canv = document.createElement('canvas');
            canv.id="faceCanvas";
            canv.width = this.drawer.width;
            canv.height = this.drawer.height;
            canv.style.display = "block";
            document.body.appendChild(canv);
        }
        return canv;
    }
    loadImages(){
        mortyArray.forEach(elem=>{
            let img = document.createElement('img');
            img.src = elem.data;
            img.setAttribute("class", "iconsMorty");
            img.style.display = "none";
            document.body.appendChild(img);
        });
    }
    drawLinks(range){
        let canv = this.getCanvas();
        let ctx = canv.getContext('2d');
        ctx.strokeStyle = 'rgba(50,255,50,255)';
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        for (let i = 0; i < this.drawer.mountsArray.length; i++) {
            const cur = this.drawer.mountsArray[i];
            ctx.moveTo(cur.pos.x+cur.size.w/2,cur.pos.y+cur.size.h/2);
            for (let j = 0; j < this.drawer.mountsArray.length; j++) {
                const sub = this.drawer.mountsArray[j];
                if (Tools.isInRange(sub.pos.x+sub.size.w/2,cur.pos.x+cur.size.w/2-range,cur.pos.x+cur.size.w/2+range) &&
                    Tools.isInRange(sub.pos.y+sub.size.w/2,cur.pos.y+cur.size.h/2-range,cur.pos.y+cur.size.h/2+range) ) {
                    ctx.lineTo(sub.pos.x+sub.size.w/2,sub.pos.y+sub.size.w/2);
                    ctx.moveTo(cur.pos.x+cur.size.w/2,cur.pos.y+cur.size.h/2);
                }
            }
        }
        ctx.stroke();
    }
    drawWeb(){
        let canv = this.getCanvas();
        let ctx = canv.getContext('2d');

        this.drawer.mountsArray.forEach(elem=>{
            
            ctx.strokeStyle = 'rgba(50,255,50,255)';
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = 'rgba(0,0,0,255)';
            ctx.beginPath();
            ctx.arc(elem.pos.x+elem.size.w/2,elem.pos.y+elem.size.h/2,elem.size.h/2,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();  
            
        });
    }
    removeBlacks(ctx){
        let imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        let data = imgData.data;

        for (let y = 0; y < ctx.canvas.height; y++) {
            for (let x = 0; x < ctx.canvas.width*4; x+=4) {
                let pixPos = y*ctx.canvas.width*4+x;
                if(data[pixPos  ] === 0 && data[pixPos+1] === 0 && data[pixPos+2] === 0){
                    data[pixPos+3] = 0;
                }
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }
    drawFaces(){
        let canv = this.getCanvas();
        let ctx = canv.getContext('2d');

        let imgs = document.getElementsByClassName('iconsMorty');

        this.drawer.mountsArray.forEach((elem,idx) => {
            ctx.save(); 

            ctx.translate(elem.pos.x+elem.size.w/2, elem.pos.y+elem.size.h/2);
            ctx.rotate(elem.rot.angRad);
            ctx.translate(-(elem.pos.x+elem.size.w/2), -(elem.pos.y+elem.size.h/2)); // translate back
            
            ctx.drawImage(imgs[idx], elem.pos.x, elem.pos.y, elem.size.w, elem.size.h);
            
            ctx.restore();
        });
    }
    downloadImg(x = 137, linkRange = this.linkRange){
        let canv = this.getCanvas();
        let ctx = canv.getContext('2d');

        ctx.clearRect(0,0,canv.width, canv.height);
        this.drawLinks(linkRange);
        this.drawWeb();
        this.removeBlacks(ctx);
        this.drawFaces();
        Tools.downloadCanvas(canv, "Mortys C-" + x + ".png");
    }
    downloadMulti(start, count, startEll, increment){
        let ellParam = startEll;
        let inc = increment;

        for (let z = start; z <= start+count; z++) {
            this.drawer.createMounts(ellParam+=inc);
            this.downloadImg(z, 500);
        }
    }
}

let drawer = new WebDrawer(mortyArray);
let canvDraw = new CanvasDrawer(drawer);
//canvDraw.drawer.createMounts(2.5);
//canvDraw.loadImages();

//canvDraw.drawLinks(300);
//canvDraw.drawWeb();
//canvDraw.drawFaces();
//canvDraw.downloadImg();
//canvDraw.downloadMulti(137, 10, 4, 0);