const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tailLength = 20;
const trailColor = '0, 255, 255'; // RGB value

const trail = [];

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < trail.length; i++) {
        const alpha = 1 - (i / trail.length); // Fades older trails
        ctx.save();
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, 10, 0, Math.PI * 1);
        ctx.fillStyle = `rgba(${trailColor}, ${alpha})`;
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    window.requestAnimationFrame(draw);
}

function addTrailPoint(x, y) {
    trail.push({ x, y });
    if (trail.length > tailLength) {
        trail.shift();
    }
}

let mouseX = 0, mouseY = 0;
const startDrawing = (e) => { // Fixed function name
    const newX = e.clientX;
    const newY = e.clientY;
    addTrailPoint(newX, newY);
    mouseX = newX;
    mouseY = newY;
};

canvas.addEventListener('mousemove', startDrawing); // Fixed event listener

window.onload = () => {
    window.requestAnimationFrame(draw);
};