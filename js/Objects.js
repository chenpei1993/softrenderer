class Objects{

    static getCube(){
        let cube = new Object("cube", 8);
        let vertices = [];
        vertices[0] = new Vector3(-1, 1, 1);
        vertices[1] = new Vector3(1, 1, 1);
        vertices[2] = new Vector3(-1, -1, 1);
        vertices[3] = new Vector3(1, -1, 1);
        vertices[4] = new Vector3(-1, 1, -1);
        vertices[5] = new Vector3(1, 1, -1);
        vertices[6] = new Vector3(1, -1, -1);
        vertices[7] = new Vector3(-1, -1, -1);
        cube.setVertices(vertices);

        let indices = [];
        indices = indices.concat(0, 1, 2);
        indices = indices.concat(1, 2, 3);

        indices = indices.concat(1, 3, 6);
        indices = indices.concat(1, 5, 6);

        indices = indices.concat(0, 1, 4);
        indices = indices.concat(1, 4, 5);

        indices = indices.concat(2, 3, 7);
        indices = indices.concat(3, 6, 7);

        indices = indices.concat(0, 2, 7);
        indices = indices.concat(0, 4, 7);
 
        indices = indices.concat(4, 5, 6);
        indices = indices.concat(4, 6, 7);
        cube.setIndices(indices);

        let colors = [];
        // colors[0] = new Color(255, 0, 0, 255); //red
        // colors[1] = new Color(0, 255, 0, 255); //green
        // colors[2] = new Color(0, 0, 255, 255); // blue
        // colors[3] = new Color(255, 255, 255, 255); // white

        // colors[4] = new Color(255, 255, 0, 255); //red
        // colors[5] = new Color(0, 255, 255, 255); //green
        // colors[6] = new Color(255, 0, 255, 255); // blue
        // colors[7] = new Color(0, 0, 0, 255); // white

        colors[0] = new Color(255, 0, 0, 255); //red
        colors[1] = new Color(255, 0, 0, 255); //green
        colors[2] = new Color(255, 0, 0, 255); // blue
        colors[3] = new Color(255, 0, 0, 255); // white

        colors[4] = new Color(255, 0, 0, 255); //red
        colors[5] = new Color(255, 0, 0, 255); //green
        colors[6] = new Color(255, 0, 0, 255); // blue
        colors[7] = new Color(255, 0, 0, 255); // white


        cube.colors = colors;
        return cube;
    }

    static getTerrian(){
        let terrian = new Object("terrian", 4);
        let vertices = [];
        vertices[0] = new Vector3(-2, -2, -2);
        vertices[1] = new Vector3(2, -2, -2);
        vertices[2] = new Vector3(-2, -2, 2);
        vertices[3] = new Vector3(2, -2, 2);

        terrian.setVertices(vertices);

        let indices = [];
        // indices = indices.concat(0, 1, 2);
        indices = indices.concat(1, 2, 3);
        terrian.setIndices(indices);

        let colors = [];
        colors[0] = new Color(0, 255, 0, 255); //red
        colors[1] = new Color(0, 255, 0, 255); //green
        colors[2] = new Color(0, 255, 0, 255); // blue
        colors[3] = new Color(0, 255, 0, 255); // white

        terrian.colors = colors;
        return terrian;
    }


    static getSinTerrian(){
        let terrian = new Object("terrian", 4);
        let vertices = [];
        let num = 16;
        let rLen = num;
        let cLen = num;
        let vLen = rLen * cLen;
        let iLen = (rLen-1)*cLen;
        this.tempIndices = [];
        let rStart = num / -2;		
        let cStart = num / -2;
        let cInc = num / (cLen-1);
        let rInc = num / (rLen-1);
        for(let i=0; i < vLen; i++){
			let cRow = Math.floor(i / cLen);	//Current Row
			let cCol = i % cLen;				//Current Column
			let h = Math.sin(cRow) * 4;

			//Create Vertices,x,y,z
            vertices.push(new Vector3(cStart+cCol*cInc, 0.2 + h, rStart+cRow*rInc));
            
			//Create the index, We stop creating the index before the loop ends creating the vertices.
			if(i < iLen){
				this.tempIndices.push(cRow * cLen + cCol, (cRow+1) * cLen + cCol);

				if(cCol == cLen-1 && i < iLen-1){
                    this.tempIndices.push( (cRow+1) * cLen + cCol, (cRow+1) * cLen)
                }
			}
        }
        let indices = [];
        for(let i = 0; i < this.tempIndices.length - 2; i++){
            indices.push(this.tempIndices[i]);
            indices.push(this.tempIndices[i + 1]);
            indices.push(this.tempIndices[i + 2]);
        }


        terrian.setVertices(vertices);

        // indices = indices.concat(0, 1, 2);
        // indices = indices.concat(1, 2, 3);
        terrian.setIndices(indices);
        let colors = [];
        let rainbow = Color.getRainbow();

        for(let i=0; i < vLen; i++){
            let index = ((vertices[i].y + 4) * 6 / 8) >> 0;
            colors[i] = rainbow[index];
        }

        console.log(vertices);
        console.log(colors);

        terrian.colors = colors;
        return terrian;
    }

}