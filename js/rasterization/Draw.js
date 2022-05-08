class DrawMode{

    static LINE = "line";

    static TRIANGLE = "triangle";

    static getDrawMode(mode){

        if(mode == this.LINE){
            return new DrawLine();
        }else if(mode == this.TRIANGLE){
            return new DrawTriangle();
        }else {
            return null;
        }
    }
}
