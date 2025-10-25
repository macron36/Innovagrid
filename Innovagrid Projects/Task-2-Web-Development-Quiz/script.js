const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property controls text size?",
        options: [
            "text-style",
            "font-size", 
            "text-size",
            "font-style"
        ],
        correct: 1
    },
    {
        question: "Which language runs in web browsers?",
        options: [
            "Java",
            "C++", 
            "Python",
            "JavaScript"
        ],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System", 
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<h6>",
            "<heading>", 
            "<h1>",
            "<head>"
        ],
        correct: 2
    },
    {
        question: "Which property changes background color in CSS?",
        options: [
            "color",
            "bgcolor", 
            "background-color",
            "background"
        ],
        correct: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function = myFunction()",
            "function myFunction()", 
            "function:myFunction()",
            "create myFunction()"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "<!-- -->", 
            "/* */",
            "#"
        ],
        correct: 0
    },
    {
        question: "Which HTML attribute is used for inline styles?",
        options: [
            "class",
            "styles", 
            "style",
            "font"
        ],
        correct: 2
    },
    {
        question: "How do you select an element with id 'demo' in CSS?",
        options: [
            ".demo",
            "#demo", 
            "demo",
            "*demo"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById('question');
const optionsGrid = document.getElementById('options-grid');
const nextBtn = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');
const resultsContainer = document.getElementById('results-container');
const quizContainer = document.getElementById('question-container');
const finalScoreElement = document.getElementById('final-score');
const resultMessageElement = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

function showQuestion() {
    resetState();
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    // Update button text based on question number
    if (currentQuestion === 0) {
        nextBtn.textContent = "Start Quiz";
    } else if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Finish Quiz";
    } else {
        nextBtn.textContent = "Next Question";
    }
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(index));
        optionsGrid.appendChild(button);
    });
    
    updateProgress();
}

function resetState() {
    answered = false;
    nextBtn.style.display = 'none';
    while (optionsGrid.firstChild) {
        optionsGrid.removeChild(optionsGrid.firstChild);
    }
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;
    
    const correctIndex = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.option');
    
    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[correctIndex].classList.add('correct');
    }
    
    nextBtn.style.display = 'block';
}

function updateProgress() {
    const progress = ((currentQuestion) / questions.length) * 100;
    progressElement.style.width = `${progress}%`;
}

function showResults() {
    quizContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    resultsContainer.style.display = 'block';
    progressElement.style.width = '100%';
    
    finalScoreElement.textContent = `${score}/${questions.length}`;
    
    let message = "";
    if (score === questions.length) {
        message = "Perfect! You're a web development expert! 🎉";
    } else if (score >= questions.length * 0.7) {
        message = "Excellent! You know your stuff! 👏";
    } else if (score >= questions.length * 0.5) {
        message = "Good job! Keep learning! 💪";
    } else {
        message = "Keep practicing! You'll get better! 🌟";
    }
    resultMessageElement.textContent = message;
}

nextBtn.addEventListener('click', () => {
    if (currentQuestion === 0 && !answered) {
        // First click on "Start Quiz" - show first question properly
        showQuestion();
        return;
    }
    
    if (!answered && currentQuestion > 0) return;
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    showQuestion();
});

// Initialize the quiz
showQuestion();