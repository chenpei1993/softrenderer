class Matrix{
    
    constructor(matrix){
        this.matrix = matrix;
    }

    static fromValues(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
        let result = [];
        result[0] = initialM11;
        result[1] = initialM12;
        result[2] = initialM13;
        result[3] = initialM14;

        result[4] = initialM21;
        result[5] = initialM22;
        result[6] = initialM23;
        result[7] = initialM24;

        result[8] = initialM31;
        result[9] = initialM32;
        result[10] = initialM33;
        result[11] = initialM34;

        result[12] = initialM41;
        result[13] = initialM42;
        result[14] = initialM43;
        result[15] = initialM44;
        return new Matrix(result);
    };

    static zero(){
        return new Matrix([ 0, 0, 0, 0, 
                            0, 0, 0, 0, 
                            0, 0, 0, 0, 
                            0, 0, 0, 0]);
    }

    static identity() {
        return new Matrix([ 1.0,    0,      0,      0,
                            0,      1.0,    0,      0, 
                            0,      0,      1.0,    0,
                            0,      0,      0,      1.0]);
    }

    static rotationX(radian) {
        let result = Matrix.zero();
        let s = Math.sin(radian);
        let c = Math.cos(radian);
        result.matrix[0] = 1.0;
        result.matrix[15] = 1.0;
        result.matrix[5] = c;
        result.matrix[10] = c;
        result.matrix[9] = -s;
        result.matrix[6] = s;
        return result;
    };
    
    static rotationY(radian) {
        let result = Matrix.zero();
        let s = Math.sin(radian);
        let c = Math.cos(radian);
        result.matrix[5] = 1.0;
        result.matrix[15] = 1.0;
        result.matrix[0] = c;
        result.matrix[2] = -s;
        result.matrix[8] = s;
        result.matrix[10] = c;
        return result;
    }

    static rotationZ(radian) {
        let result = Matrix.zero();
        let s = Math.sin(radian);
        let c = Math.cos(radian);
        result.matrix[10] = 1.0;
        result.matrix[15] = 1.0;
        result.matrix[0] = c;
        result.matrix[1] = s;
        result.matrix[4] = -s;
        result.matrix[5] = c;
        return result;
    };

    

    static rotationYawPitchRoll(yaw, pitch, roll) {
        return Matrix.rotationZ(roll).multiply(Matrix.rotationX(pitch)).multiply(Matrix.rotationY(yaw));
    };


    static translation(x, y, z) {
        var result = Matrix.identity();
        result.matrix[12] = x;
        result.matrix[13] = y;
        result.matrix[14] = z;
        return result;
    };

    getMatrix(){
        return this.matrix;
    }

    multiply(other) {
        var result = Matrix.zero();
        result.matrix[0] = this.matrix[0] * other.matrix[0] + this.matrix[1] * other.matrix[4] + this.matrix[2] * other.matrix[8] + this.matrix[3] * other.matrix[12];
        result.matrix[1] = this.matrix[0] * other.matrix[1] + this.matrix[1] * other.matrix[5] + this.matrix[2] * other.matrix[9] + this.matrix[3] * other.matrix[13];
        result.matrix[2] = this.matrix[0] * other.matrix[2] + this.matrix[1] * other.matrix[6] + this.matrix[2] * other.matrix[10] + this.matrix[3] * other.matrix[14];
        result.matrix[3] = this.matrix[0] * other.matrix[3] + this.matrix[1] * other.matrix[7] + this.matrix[2] * other.matrix[11] + this.matrix[3] * other.matrix[15];
        result.matrix[4] = this.matrix[4] * other.matrix[0] + this.matrix[5] * other.matrix[4] + this.matrix[6] * other.matrix[8] + this.matrix[7] * other.matrix[12];
        result.matrix[5] = this.matrix[4] * other.matrix[1] + this.matrix[5] * other.matrix[5] + this.matrix[6] * other.matrix[9] + this.matrix[7] * other.matrix[13];
        result.matrix[6] = this.matrix[4] * other.matrix[2] + this.matrix[5] * other.matrix[6] + this.matrix[6] * other.matrix[10] + this.matrix[7] * other.matrix[14];
        result.matrix[7] = this.matrix[4] * other.matrix[3] + this.matrix[5] * other.matrix[7] + this.matrix[6] * other.matrix[11] + this.matrix[7] * other.matrix[15];
        result.matrix[8] = this.matrix[8] * other.matrix[0] + this.matrix[9] * other.matrix[4] + this.matrix[10] * other.matrix[8] + this.matrix[11] * other.matrix[12];
        result.matrix[9] = this.matrix[8] * other.matrix[1] + this.matrix[9] * other.matrix[5] + this.matrix[10] * other.matrix[9] + this.matrix[11] * other.matrix[13];
        result.matrix[10] = this.matrix[8] * other.matrix[2] + this.matrix[9] * other.matrix[6] + this.matrix[10] * other.matrix[10] + this.matrix[11] * other.matrix[14];
        result.matrix[11] = this.matrix[8] * other.matrix[3] + this.matrix[9] * other.matrix[7] + this.matrix[10] * other.matrix[11] + this.matrix[11] * other.matrix[15];
        result.matrix[12] = this.matrix[12] * other.matrix[0] + this.matrix[13] * other.matrix[4] + this.matrix[14] * other.matrix[8] + this.matrix[15] * other.matrix[12];
        result.matrix[13] = this.matrix[12] * other.matrix[1] + this.matrix[13] * other.matrix[5] + this.matrix[14] * other.matrix[9] + this.matrix[15] * other.matrix[13];
        result.matrix[14] = this.matrix[12] * other.matrix[2] + this.matrix[13] * other.matrix[6] + this.matrix[14] * other.matrix[10] + this.matrix[15] * other.matrix[14];
        result.matrix[15] = this.matrix[12] * other.matrix[3] + this.matrix[13] * other.matrix[7] + this.matrix[14] * other.matrix[11] + this.matrix[15] * other.matrix[15];
        return result;
    }
}