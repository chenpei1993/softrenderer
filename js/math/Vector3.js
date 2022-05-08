class Vector3{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static zero(){
        return new Vector3(0, 0, 0);
    }

    copy() { 
        return new Vector3(this.x, this.y, this.z); 
    }

    length() { 
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); 
    }
    
    sqrLength() { 
        return this.x * this.x + this.y * this.y + this.z * this.z; 
    }

    normalize() { 
        let inv = 1/this.length(); 
        return new Vector3(this.x * inv, this.y * inv, this.z * inv); 
    }

    negate() { 
        return new Vector3(-this.x, -this.y, -this.z); 
    }

    add(v) { 
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); 
    }
    subtract(v) { 
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); 
    }
    
    multiply(f) { 
        return new Vector3(this.x * f, this.y * f, this.z * f); 
    }

    divide(f) { 
        let invf = 1/f; 
        return new Vector3(this.x * invf, this.y * invf, this.z * invf); 
    }

    dot(v) { 
        return this.x * v.x + this.y * v.y + this.z * v.z; 
    }

    cross(v) { 
        return new Vector3(-this.z * v.y + this.y * v.z, this.z * v.x - this.x * v.z, -this.y * v.x + this.x * v.y); 
    }

    multiplyMatrix(matrix){
        var x = (this.x * matrix[0]) + (this.y * matrix[4]) + (this.z * matrix[8]) + matrix[12];
        var y = (this.x * matrix[1]) + (this.y * matrix[5]) + (this.z * matrix[9]) + matrix[13];
        var z = (this.x * matrix[2]) + (this.y * matrix[6]) + (this.z * matrix[10]) + matrix[14];
        var w = (this.x * matrix[3]) + (this.y * matrix[7]) + (this.z * matrix[11]) + matrix[15];
        return new Vector3(x / w, y / w, z / w);
    }
        
}