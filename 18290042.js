"use strict";
var translation;
var Tx = 0.0, Ty = 0.0;
var gl;
var red = 0.0;
var green = 0.0;
var blue = 0.0;
var myred;
var mygreen;
var myblue;
var theta = 0.0;
var thetaLoc;
var direction = true;
var s = 1.0;
var mys;
var delay = 100;

window.onload = function init() {

    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, .1);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    var program2 = initShaders(gl, "vertex-shader2", "fragment-shader");
    var program3 = initShaders(gl, "vertex-shader3", "fragment-shader");

    document.getElementById("ShaderSwitch").onclick = function (event) {
        switch (event.target.index) {
            case 0:
                gl.useProgram(program);
                myred = gl.getUniformLocation(program, "red");
                mygreen = gl.getUniformLocation(program, "green");
                myblue = gl.getUniformLocation(program, "blue");
                break;
            case 1:
                gl.useProgram(program2);
                myred = gl.getUniformLocation(program2, "red");
                mygreen = gl.getUniformLocation(program2, "green");
                myblue = gl.getUniformLocation(program2, "blue");
                break;
            case 2:
                gl.useProgram(program3);
                myred = gl.getUniformLocation(program3, "red");
                mygreen = gl.getUniformLocation(program3, "green");
                myblue = gl.getUniformLocation(program3, "blue");
                break;
        }
    };

    var vertices = [vec2(-0.5, -.5),
    vec2(-.5, .5),
    vec2(.5, -.5),
    vec2(.5, .5)
    
    ];

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    translation = gl.getUniformLocation(program2, "translation");
    mys = gl.getUniformLocation(program3, "s");

    document.getElementById("Oteleme").onclick = function () {
        Tx += 0.1;
    };

    document.getElementById("Oteleme2").onclick = function () {
        Ty += 0.1;
    };

    document.getElementById("Oteleme3").onclick = function () {
        Tx -= 0.1;
    };

    document.getElementById("Oteleme4").onclick = function () {
        Ty -= 0.1;
    };

    document.getElementById("Buyult").onclick = function () {
        s += 0.1;
    };

    document.getElementById("Kucult").onclick = function () {
        s -= 0.1;
    };

    document.getElementById("Color").onclick = function (event) {
        switch (event.target.index) {
            case 0:
                red = 1.0;
                green = 0.0;
                blue = 0.0;
                gl.uniform1f(myred, red);
                gl.uniform1f(mygreen, green);
                gl.uniform1f(myblue, blue);
                break;
            case 1:
                green = 1.0;
                red = 0.0;
                blue = 0.0;
                gl.uniform1f(myred, red);
                gl.uniform1f(mygreen, green);
                gl.uniform1f(myblue, blue);
                break;
            case 2:
                blue = 1.0;
                green = 0.0;
                red = 0.0;
                gl.uniform1f(myred, red);
                gl.uniform1f(mygreen, green);
                gl.uniform1f(myblue, blue);
                break;
        }
    };

    document.getElementById("Controls").onclick = function (event) {
        switch (event.target.index) {
            case 0:
                direction = true;
                theta += (direction ? -0.1 : 0.1);
                break;
            case 1:
                direction = false;
                theta += (direction ? -0.1 : 0.1);
                break;
        }};

        window.onkeydown = function (event) {
            var key = String.fromCharCode(event.keyCode);
            switch (key) {
                case '1':
                    direction = true;
                    theta += (direction ? -0.1 : 0.1);
                    break;
                case '2':
                    direction = false;
                    theta += (direction ? -0.1 : 0.1);
                    break;
            }
        };

        render();
    };

    function render() {
        setTimeout(function(){
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(thetaLoc, theta);
        gl.uniform4f(translation, Tx, Ty, 0.0, 1.0);
        gl.uniform1f(mys, s);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimFrame(render);}, delay);
    };