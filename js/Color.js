class Color{
    constructor(r, g, b, a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static interpolate(color1, color2, gradient){
        let r = MyMath.interpolate(color1.r, color2.r, gradient);
		let g = MyMath.interpolate(color1.g, color2.g, gradient);
		let b = MyMath.interpolate(color1.b, color2.b, gradient);
		let a = MyMath.interpolate(color1.a, color2.a, gradient);
		return new Color(r, g, b, a);
    }

    static getRainbow(){
        let rainbowColors = [];
        rainbowColors[0] = new Color(255, 0, 0, 255); // red
        rainbowColors[1] = new Color(255, 125, 0, 255); //orange
        rainbowColors[2] = new Color(255, 255, 0, 255); // yellow
        rainbowColors[3] = new Color(0, 255, 0, 255); // green
        rainbowColors[4] = new Color(0, 0, 255, 255); // blue
        rainbowColors[5] = new Color(0, 255, 255, 255); // 
        rainbowColors[6] = new Color(255, 0, 255, 255); //volita
        return rainbowColors;
    }
}