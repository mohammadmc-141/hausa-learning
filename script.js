// Vocabulary data
const vocabulary = [
    // Greetings
    { hausa: 'Sannu', english: 'Hello' },
    { hausa: 'Na gode', english: 'Thank you' },
    { hausa: 'Yaya kake?', english: 'How are you? (to male)' },
    { hausa: 'Yaya kike?', english: 'How are you? (to female)' },
    { hausa: 'Lafiya lau', english: 'Fine' },
    { hausa: 'Sai anjima', english: 'See you later' },
    { hausa: 'Barka da yamma', english: 'Good evening' },
    { hausa: 'Barka da safe', english: 'Good morning' },
    { hausa: 'Ina kwana', english: 'Good night' },
    
    // Numbers
    { hausa: 'Daya', english: 'One' },
    { hausa: 'Biyu', english: 'Two' },
    { hausa: 'Uku', english: 'Three' },
    { hausa: 'Hudu', english: 'Four' },
    { hausa: 'Biyar', english: 'Five' },
    { hausa: 'Shida', english: 'Six' },
    { hausa: 'Bakwai', english: 'Seven' },
    { hausa: 'Takwas', english: 'Eight' },
    { hausa: 'Tara', english: 'Nine' },
    { hausa: 'Goma', english: 'Ten' },
    
    // Food and Drinks
    { hausa: 'Abinci', english: 'Food' },
    { hausa: 'Ruwa', english: 'Water' },
    { hausa: 'Shinkafa', english: 'Rice' },
    { hausa: 'Nama', english: 'Meat' },
    { hausa: 'Waina', english: 'Bread' },
    { hausa: 'Madara', english: 'Milk' },
    { hausa: 'Kifi', english: 'Fish' },
    { hausa: 'Wake', english: 'Beans' },
    
    // Common Words
    { hausa: 'Yau', english: 'Today' },
    { hausa: 'Gobe', english: 'Tomorrow' },
    { hausa: 'Jiya', english: 'Yesterday' },
    { hausa: 'Kai/Ke', english: 'You' },
    { hausa: 'Ni', english: 'I/Me' },
    { hausa: 'Shi', english: 'He' },
    { hausa: 'Ita', english: 'She' },
    { hausa: 'Mu', english: 'We' }
];

// Flashcard functionality
let currentWordIndex = 0;
const flashcardFront = document.querySelector('.flashcard-front p');
const flashcardBackHausa = document.querySelector('.flashcard-back .hausa');
const flashcardBackEnglish = document.querySelector('.flashcard-back .english');
const nextWordBtn = document.getElementById('next-word');

function updateFlashcard() {
    const currentWord = vocabulary[currentWordIndex];
    flashcardFront.textContent = 'Click to reveal';
    flashcardBackHausa.textContent = currentWord.hausa;
    flashcardBackEnglish.textContent = currentWord.english;
}

nextWordBtn.addEventListener('click', () => {
    currentWordIndex = (currentWordIndex + 1) % vocabulary.length;
    updateFlashcard();
});

// Initialize flashcard
updateFlashcard();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to lesson cards on scroll
const lessonCards = document.querySelectorAll('.lesson-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

lessonCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Quiz functionality
const quizQuestions = [
    // Greetings
    {
        question: "How do you say 'Hello' in Hausa?",
        options: ["Sannu", "Na gode", "Yau", "Ruwa"],
        correct: 0
    },
    {
        question: "What does 'Na gode' mean?",
        options: ["Good morning", "How are you?", "Thank you", "Goodbye"],
        correct: 2
    },
    {
        question: "How do you say 'Good evening' in Hausa?",
        options: ["Ina kwana", "Barka da safe", "Barka da yamma", "Sai anjima"],
        correct: 2
    },
    {
        question: "What does 'Sai an jima' mean?",
        options: ["Good night", "See you later", "How are you", "Thank you"],
        correct: 1
    },
    {
        question: "How do you say 'Good morning' in Hausa?",
        options: ["Barka da yamma", "Sai anjima", "Ina kwana", "Barka da safe"],
        correct: 3
    },

    // Numbers
    {
        question: "What is the Hausa word for 'five'?",
        options: ["Daya", "Biyu", "Uku", "Biyar"],
        correct: 3
    },
    {
        question: "How do you say 'seven' in Hausa?",
        options: ["Shida", "Bakwai", "Takwas", "Tara"],
        correct: 1
    },
    {
        question: "What number is 'Goma' in English?",
        options: ["Eight", "Nine", "Ten", "Six"],
        correct: 2
    },
    {
        question: "How do you say 'three' in Hausa?",
        options: ["Uku", "Biyu", "Hudu", "Daya"],
        correct: 0
    },
    {
        question: "What is 'Takwas' in English?",
        options: ["Six", "Seven", "Nine", "Eight"],
        correct: 3
    },

    // Food and Drinks
    {
        question: "How do you say 'water' in Hausa?",
        options: ["Nama", "Ruwa", "Shinkafa", "Abinci"],
        correct: 1
    },
    {
        question: "What does 'Abinci' mean?",
        options: ["Water", "Bread", "Food", "Rice"],
        correct: 2
    },
    {
        question: "What is 'Nama' in English?",
        options: ["Meat", "Fish", "Rice", "Beans"],
        correct: 0
    },
    {
        question: "How do you say 'bread' in Hausa?",
        options: ["Shinkafa", "Kifi", "Wake", "Waina"],
        correct: 3
    },
    {
        question: "What does 'Madara' mean?",
        options: ["Water", "Juice", "Tea", "Milk"],
        correct: 3
    },

    // Time and Common Words
    {
        question: "How do you say 'today' in Hausa?",
        options: ["Yau", "Gobe", "Jiya", "Kullum"],
        correct: 0
    },
    {
        question: "What does 'Gobe' mean?",
        options: ["Yesterday", "Today", "Tomorrow", "Now"],
        correct: 2
    },
    {
        question: "How do you say 'I/Me' in Hausa?",
        options: ["Kai", "Ni", "Shi", "Mu"],
        correct: 1
    },
    {
        question: "What does 'Mu' mean in English?",
        options: ["You", "He", "She", "We"],
        correct: 3
    },
    {
        question: "How do you say 'she' in Hausa?",
        options: ["Shi", "Ita", "Ni", "Kai"],
        correct: 1
    }
];

// Quiz state
let currentQuestion = 0;
let currentScore = 0;
let bestScores = {
    beginner: 0,
    intermediate: 0,
    advanced: 0
};

// Load best scores from localStorage if available
const savedScores = localStorage.getItem('hausaQuizBestScores');
if (savedScores) {
    bestScores = JSON.parse(savedScores);
    document.getElementById('best-score').textContent = bestScores[document.getElementById('difficulty').value];
}

// Quiz elements
const quizContainer = document.querySelector('.quiz-container');
const questionDiv = document.getElementById('quiz-question');
const optionsDiv = document.getElementById('quiz-options');
const checkButton = document.getElementById('check-answer');
const nextButton = document.getElementById('next-question');
const feedbackDiv = document.getElementById('quiz-feedback');
const difficultySelect = document.getElementById('difficulty');
const currentScoreSpan = document.getElementById('current-score');
const totalQuestionsSpan = document.getElementById('total-questions');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsBottomSpan = document.getElementById('total-questions-bottom');
const progressFill = document.getElementById('progress-fill');

// Difficulty settings
const difficultySettings = {
    beginner: {
        questionCount: 5,
        timeLimit: 30, // seconds per question
        categories: ['Greetings']
    },
    intermediate: {
        questionCount: 10,
        timeLimit: 20,
        categories: ['Greetings', 'Numbers', 'Food and Drinks']
    },
    advanced: {
        questionCount: 15,
        timeLimit: 15,
        categories: ['Greetings', 'Numbers', 'Food and Drinks', 'Time and Common Words']
    }
};

let currentQuestions = [];
let timer = null;
let timeLeft = 0;

// Filter questions by difficulty
function filterQuestionsByDifficulty(difficulty) {
    const settings = difficultySettings[difficulty];
    const filteredQuestions = quizQuestions.filter(q => {
        const category = q.category || 'Greetings'; // Default to Greetings if no category
        return settings.categories.includes(category);
    });
    
    // Shuffle and take required number of questions
    return shuffleArray(filteredQuestions).slice(0, settings.questionCount);
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start timer
function startTimer() {
    const difficulty = difficultySelect.value;
    timeLeft = difficultySettings[difficulty].timeLimit;
    updateTimerDisplay();
    
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(true); // Force check answer when time is up
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const timerDisplay = document.querySelector('.timer-display') || document.createElement('div');
    timerDisplay.className = 'timer-display';
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    
    if (!document.querySelector('.timer-display')) {
        questionDiv.insertBefore(timerDisplay, questionDiv.firstChild);
    }
    
    if (timeLeft <= 5) {
        timerDisplay.style.color = '#c62828';
    } else {
        timerDisplay.style.color = '#8b4513';
    }
}

// Update progress
function updateProgress() {
    const progress = (currentQuestion / currentQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
    totalQuestionsBottomSpan.textContent = currentQuestions.length;
}

// Display question
function displayQuestion(index) {
    const question = currentQuestions[index];
    questionDiv.innerHTML = `<h3>${question.question}</h3>`;
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('quiz-option');
        button.addEventListener('click', () => selectOption(i));
        optionsDiv.appendChild(button);
    });
    
    checkButton.style.display = 'block';
    nextButton.style.display = 'none';
    feedbackDiv.textContent = '';
    
    startTimer();
    updateProgress();
}

// Start quiz
function startQuiz() {
    currentQuestion = 0;
    currentScore = 0;
    const difficulty = difficultySelect.value;
    currentQuestions = filterQuestionsByDifficulty(difficulty);
    
    currentScoreSpan.textContent = currentScore;
    totalQuestionsSpan.textContent = currentQuestions.length;
    
    displayQuestion(currentQuestion);
    updateProgress();
}

// Check answer
function checkAnswer(timeUp = false) {
    clearInterval(timer);
    
    const selectedOption = optionsDiv.querySelector('.selected');
    if (!selectedOption && !timeUp) {
        feedbackDiv.textContent = 'Please select an answer!';
        return;
    }
    
    const selectedIndex = timeUp ? -1 : Array.from(optionsDiv.children).indexOf(selectedOption);
    const correct = selectedIndex === currentQuestions[currentQuestion].correct;
    
    if (correct) {
        currentScore++;
        currentScoreSpan.textContent = currentScore;
        feedbackDiv.textContent = 'Correct! Well done!';
        feedbackDiv.style.color = '#2e7d32';
    } else {
        feedbackDiv.textContent = timeUp ? 
            'Time\'s up! ' : 
            'Incorrect. ' + 
            `The correct answer is: ${currentQuestions[currentQuestion].options[currentQuestions[currentQuestion].correct]}`;
        feedbackDiv.style.color = '#c62828';
    }
    
    // Update best score if needed
    const difficulty = difficultySelect.value;
    if (currentScore > bestScores[difficulty]) {
        bestScores[difficulty] = currentScore;
        localStorage.setItem('hausaQuizBestScores', JSON.stringify(bestScores));
        document.getElementById('best-score').textContent = currentScore;
    }
    
    checkButton.style.display = 'none';
    nextButton.style.display = 'block';
    nextButton.textContent = currentQuestion === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next Question';
}

// Select option
function selectOption(index) {
    const options = optionsDiv.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

// Event listeners
checkButton.addEventListener('click', () => checkAnswer());

nextButton.addEventListener('click', () => {
    if (nextButton.textContent === 'Start Quiz' || nextButton.textContent === 'Finish Quiz') {
        startQuiz();
    } else {
        currentQuestion++;
        if (currentQuestion < currentQuestions.length) {
            displayQuestion(currentQuestion);
        }
    }
});

difficultySelect.addEventListener('change', () => {
    document.getElementById('best-score').textContent = bestScores[difficultySelect.value];
    if (nextButton.textContent !== 'Start Quiz') {
        startQuiz();
    }
});

// Add styles for new elements
const style = document.createElement('style');
style.textContent = `
    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: #f5e6d3;
        border-radius: 5px;
    }
    
    .difficulty-selector select {
        padding: 0.5rem;
        border: 2px solid #8b4513;
        border-radius: 5px;
        background-color: #fff;
        color: #8b4513;
        font-size: 1rem;
    }
    
    .score-display {
        text-align: right;
        color: #8b4513;
        font-weight: bold;
    }
    
    .quiz-progress {
        margin: 1rem 0;
    }
    
    #progress-bar {
        width: 100%;
        height: 10px;
        background-color: #f5e6d3;
        border-radius: 5px;
        margin-bottom: 0.5rem;
    }
    
    #progress-fill {
        width: 0%;
        height: 100%;
        background-color: #8b4513;
        border-radius: 5px;
        transition: width 0.3s ease;
    }
    
    .timer-display {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #8b4513;
    }
    
    .quiz-option {
        display: block;
        width: 100%;
        padding: 1rem;
        margin: 0.5rem 0;
        text-align: left;
        background-color: #fff;
        border: 2px solid #8b4513;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .quiz-option:hover {
        background-color: #f5e6d3;
    }
    
    .quiz-option.selected {
        background-color: #deb887;
        color: #8b4513;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Start with beginner difficulty
startQuiz();
