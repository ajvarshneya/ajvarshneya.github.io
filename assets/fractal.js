function getWaypoints(start, end){
    let waypoints=[];
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    for(let i = 0 ; i <= TIME_STEPS; i++){
        let x = start.x + dx * i / TIME_STEPS;
        let y = start.y + dy * i / TIME_STEPS;
        waypoints.push({x: x, y: y});
    }
    return(waypoints);
}

function animateLine(waypoints, t) {
    if (t < waypoints.length - 1) {
        window.requestAnimationFrame(function() {
            animateLine(waypoints, t+1)
        });
    }
    let x1 = waypoints[t-1].x;
    let y1 = waypoints[t-1].y;
    let x2 = waypoints[t].x;
    let y2 = waypoints[t].y;
    renderLine(x1,y1,x2,y2)
}

function renderLine(x1,y1,x2,y2) {
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min; 
}

function getBranchChance(depth) {
    // More branches at low depth and high depth
    chance = 4 * (depth/MAX_DEPTH - 7/12) ** 2
    // return 0.40
    return chance
}

function drawPlant(start, depth, angle) {
    if (depth >= MAX_DEPTH) { return }
    if (Math.random() > getBranchChance(depth)) { return }

	depth = depth + 1;
	let length = MAX_LINE_LENGTH / depth;
	
    let turnAngle = toRadians(randomRange(TURN_ANGLE_MIN, TURN_ANGLE_MAX));
    
    start = drawLine(start, angle, length);
	drawPlant(start, depth, angle + turnAngle);
    drawPlant(start, depth, angle);
    
	start = drawLine(start, angle, length);
    drawPlant(start, depth, angle + turnAngle);
    
    angle -= turnAngle;
	start = drawLine(start, angle, length);
	drawPlant(start, depth, angle);
}

function drawLine(start, angle, length) {
    let end = nextVertex(start, angle, length);
    waypoints = getWaypoints(start, end);
    animateLine(waypoints, 1)
    numLines += 1;
	return end;
}

function nextVertex(start, angle, length) {
    return {
        x: start.x + length * Math.cos(angle), 
        y: start.y + length * Math.sin(angle)
    };
}

const TIME_STEPS = 2;
const MAX_DEPTH = 20;
const LINE_COLOR = "#3A5F0B";
// const LINE_COLOR = "white";
const TURN_ANGLE_MIN = 10;
const TURN_ANGLE_MAX = 35;

let canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let context = canvas.getContext("2d");
context.strokeStyle = LINE_COLOR;
context.lineWidth = "1px";

const MAX_LINE_LENGTH = Math.sqrt(canvas.clientWidth * canvas.clientHeight) / 13;
const START_POINT = {x: canvas.clientWidth * 1/2, y: canvas.clientHeight * 1/2};
const START_ANGLE = toRadians(270);
const START_DEPTH = 0;

var numLines = 0;
// while (numLines < 10) {
    // numLines = 0;
    drawPlant(START_POINT, START_DEPTH, START_ANGLE);
// }