class DrawLine{

    draw(scene, transformMatrix, o){
        this.scene = scene;
        this.color = o.colors[0] == null ? new Color(0, 0, 0, 255) : o.colors[0];
        for(var index = 0; index < o.indices.length; index += 3) {
            let v1 = o.vertices[o.indices[index]];
            let v2 = o.vertices[o.indices[index + 1]];
            let v3 = o.vertices[o.indices[index + 2]];
            let pixelA = scene.project(v1, transformMatrix);
            let pixelB = scene.project(v2, transformMatrix);
            let pixelC = scene.project(v3, transformMatrix);
            this.drawLine(pixelA, pixelB);
            this.drawLine(pixelA, pixelC);
            this.drawLine(pixelB, pixelC);
        }
    }

    drawLine(p0, p1) {
        let x0 = p0.x >> 0;
        let y0 = p0.y >> 0;
        let x1 = p1.x >> 0;
        let y1 = p1.y >> 0;
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;
        while(true) {
            this.drawPoint(new Vector3(x0, y0), this.color);
            if((x0 == x1) && (y0 == y1)) {
                break;
            }
            let e2 = 2 * err;
            if(e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if(e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    drawPoint(point, color) {
        if(point.x >= 0 && point.y >= 0 && point.x < this.scene.width && point.y < this.scene.height) {
            this.putPixel(point.x, point.y, color);
        }
    }

    putPixel(x, y, color){
        let pixels = this.scene.backbuffer.data;
        let index = ((x >> 0) + (y >> 0) * this.scene.width) * 4;        
        pixels[index] = color.r;
        pixels[index + 1] = color.g;
        pixels[index + 2] = color.b;
        pixels[index + 3] = color.a;
    }
}