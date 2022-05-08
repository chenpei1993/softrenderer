class Object{
    constructor(name){
        this.name = name;
        this.vertices = [];
        this.rotation = Vector3.zero();
        this.position = Vector3.zero();
        this.indices = [];
        this.colors = [];
        this.drawMode = DrawMode.LINE;
        
    }

    setPosition(postion){
        this.position = postion;
    }

    getPosition(){
        return this.position;
    }

    setRotation(rotation){
        this.rotation = rotation;
    }

    getRotation(){
        return this.rotation;
    }

    setVertices(vertices){
        this.vertices = vertices;
    }

    getVertices(){
        return this.vertices;
    }

    setIndices(indices){
        this.indices = indices;
    }

    getIndices(){
        return this.indices;
    }

    getDrawMode(){
        return this.drawMode;
    }

    setDrawMode(drawMode){
        this.drawMode = drawMode;
    }

    draw(scene, viewMatrix, projectionMatrix){
        let worldMatrix = Matrix.rotationYawPitchRoll(this.getRotation().y, this.getRotation().x, this.getRotation().z)
                    .multiply(Matrix.translation(this.getPosition().x, this.getPosition().y, this.getPosition().z));

        let transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
        let mode = DrawMode.getDrawMode(this.drawMode);
        mode.draw(scene, transformMatrix, this);
        
    }
}