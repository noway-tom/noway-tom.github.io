const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const button = document.getElementById('spinbutton');

let rotation = 0;
let isSpinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    // Canvas zurücksetzen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Speichere den Canvas-Status
    ctx.save();

    // Verschiebe zum Mittelpunkt und rotiere
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Zeichne das Rad (Kreis)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Zeichne einen Rand
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Zeichne ein Muster (Linien)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius);
        ctx.stroke();
        ctx.rotate(Math.PI / 4);
    }

    // Stelle den Canvas-Status wieder her
    ctx.restore();

    // Zeichne die Nadel (Pfeil oben)
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(centerX, 35);
    ctx.lineTo(centerX - 15, 60);
    ctx.lineTo(centerX + 15, 60);
    ctx.fill();
}

function spin() {
    if (isSpinning) return;
    
    isSpinning = true;
    button.disabled = true;

    const spinDuration = 3000; // 3 Sekunden
    const startTime = Date.now();
    const spinAmount = Math.random() * 4 * Math.PI + 4 * Math.PI; // 2-4 vollständige Drehungen

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
        }
    }

    animate();
}

// Zeichne das Rad beim Start
drawWheel();

// Button-Event
button.addEventListener('click', spin);
