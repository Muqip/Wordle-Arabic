const words = ["تفاح", "موزة", "كتاب", "وردة", "سماء", "حليب", "شمس", "قمر"]; // كلمات عشوائية
const secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 6;

function createBoard() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < attempts; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.classList.add("letter-box");
            board.appendChild(box);
        }
    }
}

function submitGuess() {
    const input = document.getElementById("guess-input");
    const guess = input.value.trim();

    if (guess.length !== 5) {
        document.getElementById("message").textContent = "يجب أن تكون الكلمة 5 حروف!";
        return;
    }

    const board = document.getElementById("game-board");
    const rowStart = (6 - attempts) * 5;
    for (let i = 0; i < 5; i++) {
        const box = board.children[rowStart + i];
        box.textContent = guess[i];

        if (guess[i] === secretWord[i]) {
            box.classList.add("correct");
        } else if (secretWord.includes(guess[i])) {
            box.classList.add("present");
        } else {
            box.classList.add("absent");
        }
    }

    attempts--;
    input.value = "";

    if (guess === secretWord) {
        document.getElementById("message").textContent = "🎉 مبروك! لقد وجدت الكلمة!";
        input.disabled = true;
    } else if (attempts === 0) {
        document.getElementById("message").textContent = `😢 انتهت المحاولات! الكلمة كانت: ${secretWord}`;
        input.disabled = true;
    }
}

createBoard();
