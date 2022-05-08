class MyMath{
    static clamp (value, min, max) {
        if (typeof min === "undefined") { min = 0; }
        if (typeof max === "undefined") { max = 1; }
        return Math.max(min, Math.min(value, max));
    }

    static interpolate (min, max, gradient) {
        return min + (max - min) * MyMath.clamp(gradient);
    }

    static interpolateVector3 (min, max, gradient) {
        let x = MyMath.interpolate(min.x, max.x, gradient);
        let y = MyMath.interpolate(min.y, max.y, gradient);
        let z = MyMath.interpolate(min.z, max.z, gradient);
        return new Vector3(x, y, z);
    }

    static interpolatePixel (min, max, gradient) {
        let color = Color.interpolate(min.color, max.color, gradient);
        let v = MyMath.interpolateVector3(min.vector, max.vector, gradient);
        return new Pixel(v, color);
    }

    // static project(vector, transformationMatrix) {
    //     let point = vector.multiplyMatrix(transformationMatrix.getMatrix());
    //     let x = point.x * this.width + this.width / 2.0;
    //     let y = -point.y * this.height + this.height / 2.0;
    //     return (new Vector3(Math.floor(x), Math.floor(y), vector.z));
    // }

}