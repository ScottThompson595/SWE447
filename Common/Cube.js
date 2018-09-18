
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           //Top Face
           -0.5, 0.5, -0.5 //0
		   0.5, 0.5, -0.5 //1
		   0.5, 0.5, 0.5 //2
		   -0.5, 0.5, 0.5 //3
		   
		   //Left Face
		   -0.5, -0.5, 0.5 //7
		   -0.5, -0.5, -0.5 //4
		   -0.5, 0.5, -0.5 //0
		   -0.5, 0.5, 0.5 //3
		   
		   //Back Face
		   0.5, -0.5, 0.5 //6
		   -0.5, -0.5, 0.5 //7
		   -0.5, 0.5, 0.5 //3
		   0.5, 0.5, 0.5 //2
		   
		   //Right Face
		   0.5, -0.5, -0.5 //5
		   0.5, -0.5, 0.5 //6
		   0.5, 0.5, 0.5 //2
		   0.5, 0.5, -0.5 //1
		   
		   //Front Face
		   -0.5, -0.5, -0.5 //4
		   0.5, -0.5, -0.5 //5
		   0.5, 0.5, -0.5 //1
		   -0.5, 0.5, -0.5 //0
		   
		   //Bottom Face
		   -0.5, -0.5, 0.5 //7
		   0.5, -0.5, 0.5 //6
		   0.5, -0.5, -0.5 //5
		   -0.5, -0.5, -0.5 //4
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            //Top
            0, 1, 3
			3, 1, 2
			
			//Left
			7, 4, 3
			3, 4, 0
			
			//Back
			6, 7, 2
			2, 7, 3
			
			//Right
			5, 6, 1
			1, 6, 2
			
			//Front
			4, 5, 0
			0, 5, 1
			
			//Bottom
			7, 6, 4
			4, 6, 5
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
