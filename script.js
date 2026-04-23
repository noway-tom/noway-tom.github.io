import { executeAction, switchToWheel, wheels, getCurrentWheel } from './actions.js';

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const button = document.getElementById('spinbutton');

let rotation = 0;
let isSpinning = false;

function drawWheel() {
    const wheel = wheels[getCurrentWheel()];
    const segments = wheel.segments;
    const labels = wheel.labels;
    const colors = wheel.colors;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    const anglePerSegment = 2 * Math.PI / segments;

    // Canvas zurücksetzen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Speichere den Canvas-Status
    ctx.save();

    // Verschiebe zum Mittelpunkt und rotiere
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Zeichne die Segmente
    for (let i = 0; i < segments; i++) {
        const startAngle = i * anglePerSegment;
        const endAngle = (i + 1) * anglePerSegment;

        // Segment zeichnen
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i] || '#7e7e7e';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label zeichnen
        const labelAngle = startAngle + anglePerSegment / 2;
        const labelX = Math.cos(labelAngle) * (radius * 0.7);
        const labelY = Math.sin(labelAngle) * (radius * 0.7);
        ctx.save();
        ctx.translate(labelX, labelY);
        ctx.rotate(labelAngle + Math.PI / 2); // +90 Grad für vertikalen Text
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i] || `Segment ${i}`, 0, 0);
        ctx.restore();
    }

    // Stelle den Canvas-Status wieder her
    ctx.restore();

    // Zeichne die Nadel (Pfeil oben)
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(centerX, 65);
    ctx.lineTo(centerX - 12, 30);
    ctx.lineTo(centerX + 12, 30);
    ctx.fill();
}

function spin() {
    if (isSpinning) return;
    
    isSpinning = true;
    button.disabled = true;

    const spinDuration = 6000; // 6 Sekunden
    const startTime = Date.now();
    const spinAmount = Math.random() * 4 * Math.PI + 4 * Math.PI + 4 * Math.PI; // Mindestens 3 Umdrehungen

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Easing-Funktion für sanfteres Abbremsen
        const easeOut = 1 - Math.pow(1 - progress, 3);
        rotation = spinAmount * easeOut;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            button.disabled = false;
            
            // Berechne das Segment basierend auf dem finalen Winkel
            const wheel = wheels[getCurrentWheel()];
            const segments = wheel.segments;
            const anglePerSegment = 2 * Math.PI / segments;
            const normalizedAngle = rotation % (2 * Math.PI);
            const segment = Math.floor(normalizedAngle / anglePerSegment);
            
            // Führe die entsprechende Aktion aus
            executeAction(segment);
        }
    }

    animate();
}

// Funktion, um das Rad zu aktualisieren (für Rad-Wechsel)
function updateWheel() {
    rotation = 0; // Reset rotation when switching wheels
    drawWheel();
}

// Funktion, um eine Nachricht anzuzeigen
function showMessage(message) {
    alert(message);
}

// Funktion, um einen Sound zu spielen
function playSound(soundType) {
    console.log(`Sound: ${soundType}`); // Placeholder für Soundwiedergabe
    // Hier könnten Sie einen Sound abspielen, z.B.:
    // const audio = new Audio(`assets/sounds/${soundType}.mp3`);
    // audio.play();
}

// Exportiere die Funktionen für actions.js
export { updateWheel, showMessage, playSound };

// Zeichne das Rad beim Start
drawWheel();

// Button-Event
button.addEventListener('click', spin);
