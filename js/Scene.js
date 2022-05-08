class Scene{
    constructor(ctx, width, height, camera){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.camera = camera;
        this.objects = [];
        // this.backbuffer = this.ctx.getImageData(0, 0, this.width, this.height);
        this.depthbuffer = new Array(this.width * this.height);

    }

    addObject(object){
        this.objects.push(object);
    }
    
    //TODO remove a object from objects array;
    // removeObject(object){

    // }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.backbuffer = this.ctx.getImageData(0, 0, this.width, this.height);
        for(var i = 0; i < this.depthbuffer.length; i++) {
            this.depthbuffer[i] = 10000000;
        }
    }

    project(vector, transformationMatrix) {
        let point = vector.multiplyMatrix(transformationMatrix.getMatrix());
        let x = point.x * this.width + this.width / 2.0;
        let y = -point.y * this.height + this.height / 2.0;
        return (new Vector3(Math.floor(x), Math.floor(y), vector.z));
    }

    render(){
        let viewMatrix = this.camera.getViewMatrix();
        let projectionMatrix = this.camera.getPerspectiveMatrix();

        for(let i = 0; i < this.objects.length; i++) {
            let o = this.objects[i];
            o.draw(this, viewMatrix, projectionMatrix);

        }
        this.ctx.putImageData(this.backbuffer, 0, 0);
    }
}