let questionIndex = 0;

const questions = [
    {
        question: "Oi mai lov, o jogo funciona assim, se vc acerta todas as pergunta você ganha um prêmio. (essa ta valendo já)",
        answers: ["A) Entendi meu amor lindo", "B) Tabom meu love como eu te amo", "A e B"]
    },
    {
        question: "Aonde foi nosso primeiro date?",
        answers: ["Smartfit", "Bluefit", "Bar do pedrão"]
    },
    {
        question: "Quando vamos fazer um ano e meio de namoro?",
        answers: ["11 de agosto de 2026", "11 de agosto de 2025", "10 de agosto de 2025"]
    },
    {
        question: "Onde foi nosso primeiro beijo?",
        answers: ["Academia", "Praça do japão", "Rep. Argentina"]
    },
    {
        question: "Quais foram os sabores de pizza que a gente pediu quando começamos a namorar?",
        answers: [ "Calabresa e 4 queijos", "Bacon com cheddar e 4 queijos", "Franco com catupiry e calabresa"]
    },
    {
        question: "E qual o vinho desse dia?",
        answers: ["Não lembro nem fudendo", "Campo largo", "Chilano"]
    },
    {
        question: "Qual o nome da minha tia?",
        answers: ["Cristina", "Milena",  "Tatiane"]
    }
];

const correctAnswers = [
    "A e B",
    "Smartfit",
    "10 de agosto de 2025",
    "Rep. Argentina",
    "Bacon com cheddar e 4 queijos",
    "Chilano",
    "Milena"
];

const selectedAnswers = [];

document.getElementById("submitBtn").addEventListener("click", function() {
    saveSelectedAnswer();
    if (questionIndex === questions.length - 1) {
        displayResults();
    } else {
        questionIndex = (questionIndex + 1) % questions.length;
        updateQuestion();
    }
});

document.getElementById("backBtn").addEventListener("click", function() {
    saveSelectedAnswer();
    questionIndex = (questionIndex - 1 + questions.length) % questions.length;
    updateQuestion();
});

function updateQuestion() {
    const questionElement = document.querySelector(".pergunta p");
    const answersElement = document.querySelector(".alternativas ul");

    questionElement.textContent = questions[questionIndex].question;
    
    // Clear previous answers
    answersElement.innerHTML = "";

    // Add new answers
    questions[questionIndex].answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="answer" id="answer${index}" value="${answer}">
                        <label for="answer${index}">${answer}</label>`;
        answersElement.appendChild(li);
    });

    // Restore previous selection if any
    if (selectedAnswers[questionIndex] !== undefined) {
        document.querySelector(`input[value="${selectedAnswers[questionIndex]}"]`).checked = true;
    }

    // Change button text on last question
    const submitBtn = document.getElementById("submitBtn");
    if (questionIndex === questions.length - 1) {
        submitBtn.textContent = "Avançar";
    } else {
        submitBtn.textContent = "Enviar";
    }
}

function saveSelectedAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        selectedAnswers[questionIndex] = selected.value;
    }
}

function displayResults() {
    let resultMessage = "Respostas selecionadas:\n\n";
    selectedAnswers.forEach((answer, index) => {
        resultMessage += `Pergunta ${index + 1}: ${answer}\n`;
    });

    // Check if the answers are correct
    const allCorrect = selectedAnswers.every((answer, index) => answer === correctAnswers[index]);

    if (allCorrect) {
        resultMessage += "\nParabéns! Você acertou todas as perguntas!\n";
        // Show popup with image and text
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.padding = "20px";
        popup.style.backgroundColor = "#fff";
        popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        popup.style.textAlign = "center";
        popup.innerHTML = `<p>Parabéns! Você acertou todas as perguntas! E ganhou o seguinte vale:</p>
                           <img src="mnt/data/image.png" alt="Premio" style="max-width: 100%; height: auto;">
                           <button onclick="document.body.removeChild(this.parentElement)">Fechar</button>`;
        document.body.appendChild(popup);
    } else {
        resultMessage += "\nTente novamente!\n";
    }

    alert(resultMessage);
}

// Initialize the first question
updateQuestion();
