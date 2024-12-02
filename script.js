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
        question: "How do you say 'water' in Hausa?",
        options: ["Nama", "Ruwa", "Shinkafa", "Abinci"],
        correct: 1
    },
    {
        question: "What is the Hausa word for 'five'?",
        options: ["Daya", "Biyu", "Uku", "Biyar"],
        correct: 3
    },
    {
        question: "How do you say 'Good evening' in Hausa?",
        options: ["Ina kwana", "Barka da safe", "Barka da yamma", "Sai anjima"],
        correct: 2
    }
];

let currentQuestion = 0;
const quizContainer = document.querySelector('.quiz-container');
const questionDiv = document.getElementById('quiz-question');
const optionsDiv = document.getElementById('quiz-options');
const checkButton = document.getElementById('check-answer');
const nextButton = document.getElementById('next-question');
const feedbackDiv = document.getElementById('quiz-feedback');

function displayQuestion(index) {
    const question = quizQuestions[index];
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
}

function selectOption(index) {
    const options = optionsDiv.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

checkButton.addEventListener('click', () => {
    const selectedOption = optionsDiv.querySelector('.selected');
    if (!selectedOption) {
        feedbackDiv.textContent = 'Please select an answer!';
        return;
    }
    
    const selectedIndex = Array.from(optionsDiv.children).indexOf(selectedOption);
    const correct = selectedIndex === quizQuestions[currentQuestion].correct;
    
    if (correct) {
        feedbackDiv.textContent = 'Correct! Well done!';
        feedbackDiv.style.color = '#2e7d32';
    } else {
        feedbackDiv.textContent = `Incorrect. The correct answer is: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}`;
        feedbackDiv.style.color = '#c62828';
    }
    
    checkButton.style.display = 'none';
    nextButton.style.display = 'block';
    nextButton.textContent = currentQuestion === quizQuestions.length - 1 ? 'Restart Quiz' : 'Next Question';
});

nextButton.addEventListener('click', () => {
    if (nextButton.textContent === 'Start Quiz' || nextButton.textContent === 'Restart Quiz') {
        currentQuestion = 0;
    } else {
        currentQuestion++;
    }
    
    if (currentQuestion < quizQuestions.length) {
        displayQuestion(currentQuestion);
    }
});

// Add some CSS for quiz options
const style = document.createElement('style');
style.textContent = `
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
    
    #quiz-question h3 {
        color: #8b4513;
        margin-bottom: 1.5rem;
    }
    
    #quiz-feedback {
        margin-top: 1rem;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
