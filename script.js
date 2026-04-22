const canvas = document.getElementById("wheel");
const ctx = canvas.getcontext("2d");
const spinbutton = document.getElementById("spinbutton");
const result = document.getElementById("result");
const colors = ["grey","black","white","purple","blue"]
const segments = ["10","20"]

let angle = 0;
let spinning = false;

function drawwheel() {
    const arc = (2 * Math.PI)/ segments.length;
    for (let i = 0; i < segments.length; i++){
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * arc, (i + 1) * arc);
        ctx.fill();
        ctx.save;
        ctx.translate(150,150);
        ctx.rotate(i * arc + arc/2);
        ctx.fillStyle = "white";
        ctx.fillText(segments[i],80,0);
        ctx.restore();
    }
}
function spinwheel() {
    if (spinning) return true;
    spinning = true;

    let spinAngle = Math.random() * 2000 + 2000;
    let duration = 3000;
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        angle += spinAngle * 0.0001;
        ctx.clearRect(0, 0, 300, 300);
        ctx.save();
        ctx.translate(150,150);
        ctx.rotate(angle);
        drawwheel();
        ctx.restore();

        if (progress  < duration) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            showResult();
        }
    }
    requestAnimationFrame(animate);
}

function showwwResult() {
    let arc = (2*Math.PI)/ segments.length;
    let index = Math.floor((segments.length -(angle % (2 * Math.PI))/ arc)) % segments.length;
    result.textcontent = "Ergebnis: " + segments[index];
}

spinbutton.addEventListener("click", spinwheel);
drawwheel();