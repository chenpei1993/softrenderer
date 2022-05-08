class Camera{
    constructor(position, lookAt, up, fov, near, far, aspect){
        this.position = position;
        this.lookAt = lookAt;
        this.up = up;
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.aspect = aspect;
        //TODO cache?
        this.perspectiveMatrix = [];
    }

    getViewMatrix(){
        let z = this.lookAt.subtract(this.position);
        z = z.normalize();
        let x = this.up.cross(z);
        x = x.normalize();
        let y = z.cross(x);

        y = y.normalize();
        var px = -x.dot(this.position);
        var py = -y.dot(this.position);
        var pz = -z.dot(this.position);
        return Matrix.fromValues(   x.x, y.x, z.x, 0,
                                    x.y, y.y, z.y, 0,
                                    x.z, y.z, z.z, 0,
                                    px, py, pz, 1);
    }


    /*
    * Perspective Matrix
    *   1/(aspect * tan(fov/2)) 0               0                           0   
    *   0                       1/tan(fov/2)    0                           0    
    *   0                       0               fear/(near - far)           1
    *   0                       0               (near*far)/(near - far)     0                           
    */
    getPerspectiveMatrix() {
        let matrix = Matrix.zero();
        let tan = 1.0 / (Math.tan(this.fov * 0.5));
        matrix.matrix[0] = tan / this.aspect;
        matrix.matrix[1] = matrix.matrix[2] = matrix.matrix[3] = 0.0;

        matrix.matrix[5] = tan;
        matrix.matrix[4] = matrix.matrix[6] = matrix.matrix[7] = 0.0;

        matrix.matrix[8] = matrix.matrix[9] = 0.0;
        matrix.matrix[10] = -this.far / (this.near - this.far);
        matrix.matrix[11] = 1.0;

        matrix.matrix[12] = matrix.matrix[13] = matrix.matrix[15] = 0.0;
        matrix.matrix[14] = (this.near * this.far) / (this.near - this.far);
        return matrix;
    }
}