// Vocabulary data
const vocabulary = [
    { hausa: 'Sannu', english: 'Hello' },
    { hausa: 'Na gode', english: 'Thank you' },
    { hausa: 'Yaya kake?', english: 'How are you? (to male)' },
    { hausa: 'Yaya kike?', english: 'How are you? (to female)' },
    { hausa: 'Lafiya lau', english: 'Fine' },
    { hausa: 'Sai anjima', english: 'See you later' },
    { hausa: 'Barka da yamma', english: 'Good evening' },
    { hausa: 'Barka da safe', english: 'Good morning' },
    { hausa: 'Ina kwana', english: 'Good night' },
    { hausa: 'Ruwa', english: 'Water' }
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
