class DrawTriangle{

    draw(scene, transformMatrix, o){
        this.scene = scene;
        for(let index = 0; index < o.indices.length; index += 3) {
            let v1 = o.vertices[o.indices[index]];
            let v2 = o.vertices[o.indices[index + 1]];
            let v3 = o.vertices[o.indices[index + 2]];
            let pixelA = new Pixel(this.scene.project(v1, transformMatrix), o.colors[o.indices[index]]);
            let pixelB = new Pixel(this.scene.project(v2, transformMatrix), o.colors[o.indices[index + 1]]);
            let pixelC = new Pixel(this.scene.project(v3, transformMatrix), o.colors[o.indices[index + 2]]);
            if(this.isCcw(pixelA.vector, pixelB.vector, pixelC.vector)){
                this.drawTriangle(pixelA, pixelB, pixelC);
            }

        }
    }

    isCcw(v0, v1, v2) {
        return (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x) >= 0;
    }

    drawScanLine(p1, p2){
        let x1 = p1.vector.x;
        let x2 = p2.vector.x;
        let flag = x2 > x1 ? 1 : -1;
        let factor = 0;
        for(let x = x1, i = 0; i < (x2 - x1) * flag + 1; i++,x+=flag){
            if(x2 != x1){
                factor = (x - x1) / (x2 - x1);
            }
            let color = Color.interpolate(p1.color, p2.color, factor);
            let z = MyMath.interpolate(p1.vector.z, p2.vector.z, factor);

            this.putPixel(x, p1.vector.y, z, color);
        }
        
    }

    drawTriangle(p1, p2, p3){
        let temp;
        if(p1.vector.y > p2.vector.y) {
            temp = p2;
            p2 = p1;
            p1 = temp;
        }
        if(p2.vector.y > p3.vector.y) {
            temp = p2;
            p2 = p3;
            p3 = temp;
        }
        if(p1.vector.y > p2.vector.y) {
            temp = p2;
            p2 = p1;
            p1 = temp;
        }

        let middleFactor = (p2.vector.y - p1.vector.y) / (p3.vector.y - p1.vector.y);
        let middle = MyMath.interpolatePixel(p1, p3, middleFactor);
        let startY = p1.vector.y;
        let endY = p2.vector.y;
        for(let y = startY; y <= endY; ++y){
            let factor = 0;
            if(endY != startY){
                factor = (y - startY) / (endY - startY);
            }
            let ps = MyMath.interpolatePixel(p1, p2, factor);
            let pe = MyMath.interpolatePixel(p1, middle, factor);
            this.drawScanLine(ps,pe);
        }
        startY = p2.vector.y;
        endY = p3.vector.y;
        for(let y = startY; y <= endY; ++y){
            let factor = 0;
            if(endY != startY){
                factor = (y - startY) / (endY - startY);
            }
            let ps = MyMath.interpolatePixel(p2, p3, factor);
            let pe = MyMath.interpolatePixel(middle, p3, factor);
            this.drawScanLine(ps,pe);
        }

    }

    putPixel(x, y, z, color){
        let pixels = this.scene.backbuffer.data;
        let index = ((x >> 0) + (y >> 0) * this.scene.width) * 4;
        if(this.scene.depthbuffer[index] < z) {
            return;
        }
        this.scene.depthbuffer[index] = z;
        pixels[index] = color.r;
        pixels[index + 1] = color.g;
        pixels[index + 2] = color.b;
        pixels[index + 3] = color.a;
    }

    drawPoint(point, color) {
        if(point.x >= 0 && point.y >= 0 && point.x < this.scene.width && point.y < this.scene.height) {
            this.putPixel(point.x, point.y, point.z, color);
        }
    }

}