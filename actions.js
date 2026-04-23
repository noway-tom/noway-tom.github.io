// actions.js - Definition der verschiedenen Aktionen und Glücksräder für das Pokémon-Spiel

// Rad-Konfigurationen
const wheels = {
    main: {
        segments: 8,
        labels: ["Pokémon fangen", "Kampf", "Item finden", "Trainer treffen", "Evolution", "Heilen", "Spezial", "Nichts"],
        colors: ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ff99ff", "#99ffff", "#ffffff", "#cccccc"],
        actions: {
            0: () => switchToWheel('catch'), // Pokémon fangen -> Subrad
            1: () => switchToWheel('battle'), // Kampf -> Subrad
            2: () => switchToWheel('item'), // Item finden -> Subrad
            3: () => switchToWheel('trainer'), // Trainer treffen -> Subrad
            4: () => executeDirectAction("Evolution! Dein Pokémon entwickelt sich!"),
            5: () => executeDirectAction("Heilen! Alle Pokémon sind wieder fit!"),
            6: () => executeDirectAction("Spezialaktion: Doppelte Punkte!"),
            7: () => executeDirectAction("Nichts passiert. Versuche es nochmal!")
        }
    },
    catch: {
        segments: 6,
        labels: ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Eevee", "Mewtwo"],
        colors: ["#ffff00", "#ff4500", "#0000ff", "#00ff00", "#ff69b4", "#8a2be2"],
        actions: {
            0: () => executeDirectAction("Du hast ein Pikachu gefangen!"),
            1: () => executeDirectAction("Du hast ein Charmander gefangen!"),
            2: () => executeDirectAction("Du hast ein Squirtle gefangen!"),
            3: () => executeDirectAction("Du hast ein Bulbasaur gefangen!"),
            4: () => executeDirectAction("Du hast ein Eevee gefangen!"),
            5: () => executeDirectAction("Du hast ein Mewtwo gefangen! Wow!")
        }
    },
    battle: {
        segments: 4,
        labels: ["Sieg", "Niederlage", "Unentschieden", "Bonus"],
        colors: ["#00ff00", "#ff0000", "#ffff00", "#00ffff"],
        actions: {
            0: () => executeDirectAction("Sieg! Du hast den Kampf gewonnen!"),
            1: () => executeDirectAction("Niederlage! Besser trainieren!"),
            2: () => executeDirectAction("Unentschieden! Rematch?"),
            3: () => executeDirectAction("Bonus! Extra Erfahrungspunkte!")
        }
    },
    item: {
        segments: 5,
        labels: ["Pokeball", "Trank", "Stein", "TM", "Seltenes Item"],
        colors: ["#ff0000", "#00ff00", "#808080", "#ffff00", "#ff00ff"],
        actions: {
            0: () => executeDirectAction("Du findest eine Pokeball!"),
            1: () => executeDirectAction("Du findest einen Trank!"),
            2: () => executeDirectAction("Du findest einen Stein!"),
            3: () => executeDirectAction("Du findest eine TM!"),
            4: () => executeDirectAction("Du findest ein seltenes Item!")
        }
    },
    trainer: {
        segments: 3,
        labels: ["Freundlich", "Rival", "Champion"],
        colors: ["#90ee90", "#ffa500", "#ffd700"],
        actions: {
            0: () => executeDirectAction("Ein freundlicher Trainer gibt dir Tipps!"),
            1: () => executeDirectAction("Ein Rival fordert dich heraus!"),
            2: () => executeDirectAction("Der Champion testet deine Fähigkeiten!")
        }
    }
};

// Aktuelles Rad
let currentWheel = 'main';

// Funktion, um zu einem anderen Rad zu wechseln
function switchToWheel(wheelName) {
    if (wheels[wheelName]) {
        currentWheel = wheelName;
        // Hier könntest du das Rad neu zeichnen lassen
        console.log(`Wechsle zu Rad: ${wheelName}`);
        // Rufe eine Funktion auf, um das Rad zu aktualisieren
        updateWheel();
    } else {
        console.log("Unbekanntes Rad:", wheelName);
    }
}

// Funktion, um eine direkte Aktion auszuführen
function executeDirectAction(message) {
    showMessage(message);
    playSound('action');
    // Nach der Aktion zurück zum Hauptmenü oder bleib
    setTimeout(() => switchToWheel('main'), 2000); // Nach 2 Sekunden zurück
}

// Funktion, um eine Aktion basierend auf dem Segment auszuführen
function executeAction(segment) {
    const wheel = wheels[currentWheel];
    if (wheel && wheel.actions[segment]) {
        wheel.actions[segment]();
    } else {
        console.log("Unbekannte Aktion für Segment:", segment, "auf Rad:", currentWheel);
    }
}

// Hilfsfunktionen
function playSound(soundName) {
    console.log(`Spiele Sound: ${soundName}`);
    // Beispiel: const audio = new Audio(`assets/sounds/${soundName}.mp3`); audio.play();
}

function showMessage(message) {
    alert(message);
    // Oder füge es zu einem DOM-Element hinzu
}

// Exportiere die Funktionen
export { executeAction, switchToWheel, wheels, currentWheel };