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

// Add intersection observer for section animations
const sections = document.querySelectorAll('.lessons-section, .vocabulary-section, .practice-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add hover sound effect to phrases (optional)
const phrases = document.querySelectorAll('.phrase');
phrases.forEach(phrase => {
    phrase.addEventListener('mouseenter', () => {
        // You can add a subtle hover sound here if desired
    });
});
