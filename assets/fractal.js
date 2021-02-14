// shitty code lol 
// all rights reserved gg A.J. Varshneya

// Polyfill
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
       return window.setTimeout(callback, 1000 / 60);
    });
}

// Utility
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min; 
}

// Drawing lines
function drawNextLine(start, angle, length, callback) {
    numLines += 1;
    const end = nextVertex(start, angle, length);
    waypoints = getWaypoints(start, end);
    drawLine(waypoints, 1, callback)
	return end;
}

// Gets the next connecting vertex
function nextVertex(start, angle, length) {
    return {
        x: start.x + length * Math.cos(angle), 
        y: start.y + length * Math.sin(angle)
    };
}

// Computes waypoints between start/end for a smooth animation
function getWaypoints(start, end){
    const waypoints = [];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    for(i = 0 ; i <= TICKS_PER_LINE; i++){
        const x = start.x + dx * i / TICKS_PER_LINE;
        const y = start.y + dy * i / TICKS_PER_LINE;
        waypoints.push({x: x, y: y});
    }
    return(waypoints);
}

// Draws line segment on schedules another on next frame
// If line is finished, continues with next line or plant (via callback)
function drawLine(waypoints, t, callback) {
    if (t < waypoints.length - 1) {
        raf = window.requestAnimationFrame(() => {
            drawLine(waypoints, t+1, callback)
        });
    } else {
        raf = window.requestAnimationFrame(() => {
            callback();
        });
    }
    const x1 = waypoints[t-1].x;
    const y1 = waypoints[t-1].y;
    const x2 = waypoints[t].x;
    const y2 = waypoints[t].y;
    renderLine(x1,y1,x2,y2);
}

function renderLine(x1,y1,x2,y2) {
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
}

// Recursive plant structure
function drawPlant(start, depth, angle, callback) {
    deepest = Math.max(depth, deepest);
    if (stopDrawing) { return }
    if (depth >= maxDepth) { return }
    if (Math.random() > getBranchChance(depth)) { return }

	depth = depth + 1;
	const length = depth < 3
        ? maxLineLength / (depth + 2)
        : maxLineLength / depth;
	
    const turnAngle = getTurnAngle(depth);
    
    // Callback death xD
    const start1 = drawNextLine(start, angle, length, () => {
        const start2 = drawNextLine(start1, angle, length, () => {
            const start3 = drawNextLine(start2, angle - turnAngle, length, () => {
                drawPlant(start1, depth, angle + turnAngle, () =>  {
                    drawPlant(start1, depth, angle, () =>  {
                        drawPlant(start2, depth, angle + turnAngle, () =>  {
                            drawPlant(start3, depth, angle - turnAngle, () => {});
                        });
                    });
                });
            });
        });
    });
    callback();
}

// The plants are stochastic and this controls how often to branch
function getBranchChance(depth) {
    if (depth == 0) {
        return 1;
    }
    if (depth == 1) {
        return 1;
    }
    if (depth == 2) {
        return 1;
    }
    if (depth == 3) {
        return 0.8;
    }
    if (depth == 4) {
        return 0.8;
    }
    return 7/12;
    // if (depth == 5) {
    //     return 0.7;
    // }
    // return 0.5;
    // if (depth == 6) {
    //     return 0.2;
    // }
    // if (depth == 7) {
    //     return 0.7;
    // }
    // if (depth == 8) {
    //     return 0.2;
    // }
    // if (depth == 9) {
    //     return 0.7;
    // }
    // if (depth == 10) {
    //     return 0.7;
    // }
    // if (depth == 11) {
    //     return 0.7;
    // }
    // return 0.50

    // Quadratic so we get more branches at low depth and high depth, fewer at middle depth
    // return 1/8 * (depth/(2 * MIN_BRANCH_DEPTH) - 1/2) ** 2 + 13/24;
    
}

function getTurnAngle(depth) {
    // if (depth < 2) {
    //     const options = [toRadians(randomRange(30, 40)), toRadians(randomRange(-30, -40))]
    //     return options[Math.floor(randomRange(options.length))]
    // }
    return toRadians(randomRange(10, 32));
    if (depth == 0) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 1) {
        return toRadians(randomRange(10, 20))
    }
    if (depth == 2) {
        return toRadians(randomRange(15, 20))
    }
    if (depth == 3) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 4) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 5) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 6) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 7) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 8) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 9) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 10) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 11) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 12) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 13) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 14) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 15) {
        return toRadians(randomRange(10, 28))
    }
    if (depth == 16) {
        return toRadians(randomRange(10, 28))
    }
    return toRadians(randomRange(10, 28));
}

// const LINE_COLOR = "#4F7942"; // fern
// const LINE_COLOR = "#3EB489"; // mint
// const LINE_COLOR = "#00A86B"; // jade
const LINE_COLOR = "#01796F"; // pine

const TICKS_PER_LINE = 4;
const MIN_BRANCH_DEPTH = 10

const START_ANGLE = toRadians(270);
const START_DEPTH = 0;

var numLines = 0;
var maxLineLength = 0
var maxDepth = 0;

var context = null
var canvas = null
var raf = null
var stopDrawing = false

var deepest = 0;

function render() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    const clientHeight = document.getElementById('control-height').clientHeight;
    const desiredHeight = 2 * clientHeight - window.innerHeight
    canvas.height = desiredHeight;


    context = canvas.getContext("2d");
    context.strokeStyle = LINE_COLOR;
    context.lineWidth = "1px";
        
    maxLineLength = Math.sqrt(canvas.width * canvas.height) / 6;
    maxDepth = Math.min(16, Math.sqrt(canvas.width * canvas.height) / 48);

    let startPoint = {x: -canvas.width*2/20, y: canvas.height*22/20};
    drawPlant(startPoint, 0 /* depth */, toRadians(270) /* start angle */, function(){});

    startPoint = {x: canvas.width*22/20, y: -canvas.height*2/20};
    drawPlant(startPoint, 0 /* depth */, toRadians(90) /* start angle */, function(){});

    startPoint = {x: canvas.width*22/20, y: canvas.height*22/20};
    drawPlant(startPoint, 0 /* depth */, toRadians(180) /* start angle */, function(){});

    startPoint = {x: -canvas.width*2/20, y: -canvas.height*2/20};
    drawPlant(startPoint, 0 /* depth */, toRadians(0) /* start angle */, function(){});
}

render();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
window.onresize = function() {
    if (window.innerWidth != window.windowWidth
        || window.innerHeight != window.windowHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        }
}