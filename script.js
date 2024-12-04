// DOM Elements and State
let currentLanguage = 'english';
let currentLessonId = null;
let currentSlide = 0;

// Track completed lessons
let completedLessons = new Set();

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
    { hausa: 'Ina kwana', english: 'Good night' }
];

// Lesson data
const lessonData = {
    1: {
        title: {
            english: "Greetings",
            hausa: "Gaisuwa"
        },
        slides: [
            {
                hausa: "Sannu",
                english: "Hello",
                usage: "General greeting, can be used any time of day"
            },
            {
                hausa: "Barka da safe",
                english: "Good morning",
                usage: "Used in the morning"
            },
            {
                hausa: "Barka da rana",
                english: "Good afternoon",
                usage: "Used during the afternoon"
            },
            {
                hausa: "Barka da yamma",
                english: "Good evening",
                usage: "Used in the evening"
            }
        ]
    },
    2: {
        title: {
            english: "Numbers 1-10",
            hausa: "Lissafi 1-10"
        },
        slides: [
            {
                hausa: "Daya",
                english: "One (1)",
                usage: "Basic number one"
            },
            {
                hausa: "Biyu",
                english: "Two (2)",
                usage: "Basic number two"
            },
            {
                hausa: "Uku",
                english: "Three (3)",
                usage: "Basic number three"
            },
            {
                hausa: "Hudu",
                english: "Four (4)",
                usage: "Basic number four"
            }
        ]
    },
    3: {
        title: {
            english: "Family Members",
            hausa: "Dangin Iyali"
        },
        slides: [
            {
                hausa: "Mahaifi",
                english: "Father",
                usage: "Your father"
            },
            {
                hausa: "Mahaifiya",
                english: "Mother",
                usage: "Your mother"
            },
            {
                hausa: "Yaya",
                english: "Elder brother",
                usage: "Your elder brother"
            },
            {
                hausa: "'Yar'uwa",
                english: "Sister",
                usage: "Your sister"
            }
        ]
    },
    4: {
        title: {
            english: "Colors",
            hausa: "Launuka"
        },
        slides: [
            {
                hausa: "Ja",
                english: "Red",
                usage: "Basic color red"
            },
            {
                hausa: "Ruwan toka",
                english: "Blue",
                usage: "Basic color blue"
            },
            {
                hausa: "Kore",
                english: "Green",
                usage: "Basic color green"
            },
            {
                hausa: "Fari",
                english: "White",
                usage: "Basic color white"
            }
        ]
    },
    5: {
        title: {
            english: "Basic Phrases",
            hausa: "Kalmomi na yau da kullum"
        },
        slides: [
            {
                hausa: "Na gode",
                english: "Thank you",
                usage: "To express gratitude"
            },
            {
                hausa: "Yaya kake/kike?",
                english: "How are you?",
                usage: "kake (male), kike (female)"
            },
            {
                hausa: "Lafiya lau",
                english: "Fine",
                usage: "Response to 'how are you?'"
            },
            {
                hausa: "Ba komai",
                english: "You're welcome",
                usage: "Response to 'thank you'"
            }
        ]
    }
};

// UI translations
const translations = {
    english: {
        welcome: "Welcome to Hausa Learning",
        welcomeText: "Start your journey to learn one of Africa's most widely spoken languages!",
        lessons: "Learning Path",
        vocabulary: "Vocabulary",
        practice: "Practice",
        start: "Start",
        finish: "Finish",
        next: "Next",
        previous: "Previous",
        backToLessons: "Back to Lessons",
        slideCounter: "Slide %current% of %total%"
    },
    hausa: {
        welcome: "Barka da zuwa Koyon Hausa",
        welcomeText: "Fara tafiya don koyon daya daga cikin harsuna mafi yawan magana a Afrika!",
        lessons: "Hanyar Koyarwa",
        vocabulary: "Kalmomi",
        practice: "Yi Koyi",
        start: "Fara",
        finish: "Kammala",
        next: "Na gaba",
        previous: "Na baya",
        backToLessons: "Komawa Darussan",
        slideCounter: "Darasi %current% na %total%"
    }
};

// Function to update UI language
function updateLanguage(language) {
    console.log('Updating language to:', language);
    currentLanguage = language;
    document.body.setAttribute('data-language', language);
    
    // Update buttons
    document.getElementById('english-mode').classList.toggle('active', language === 'english');
    document.getElementById('hausa-mode').classList.toggle('active', language === 'hausa');
    
    // Update main heading and text
    document.querySelector('.hero h2').textContent = translations[language].welcome;
    document.querySelector('.hero p').textContent = translations[language].welcomeText;
    document.querySelector('#lessons h2').textContent = translations[language].lessons;
    
    // Update navigation links
    document.querySelector('a[href="#lessons"]').textContent = translations[language].lessons;
    document.querySelector('a[href="#vocabulary"]').textContent = translations[language].vocabulary;
    document.querySelector('a[href="#practice"]').textContent = translations[language].practice;
    
    // Update lesson islands
    document.querySelectorAll('.lesson-island').forEach(island => {
        const lessonId = island.getAttribute('data-lesson');
        const signpost = island.querySelector('.signpost');
        
        if (lessonId === 'start') {
            signpost.textContent = translations[language].start;
        } else if (lessonId === 'finish') {
            signpost.textContent = translations[language].finish;
        } else {
            const lesson = lessonData[lessonId];
            if (lesson) {
                signpost.textContent = lesson.title[language];
            }
        }
    });
    
    // Update current lesson if one is open
    if (currentLessonId) {
        const lessonViewer = document.getElementById('lesson-viewer');
        if (!lessonViewer.classList.contains('hidden')) {
            showSlide(currentSlide);
        }
    }
}

// Function to check if a lesson is available
function isLessonAvailable(lessonId) {
    const id = parseInt(lessonId);
    return id === 1 || completedLessons.has(id - 1);
}

// Function to show locked message
function showLockedMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.style.backgroundColor = '#FF6B6B';
    message.textContent = currentLanguage === 'english' ? 
        '🔒 Complete the previous lesson first!' : 
        '🔒 Ka kammala darasin da ya gabata da farko!';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// Function to start a lesson
function startLesson(lessonId) {
    currentLessonId = parseInt(lessonId);
    const lesson = lessonData[currentLessonId];
    const lessonViewer = document.getElementById('lesson-viewer');
    const completeButton = document.getElementById('complete-lesson');
    const backButton = document.getElementById('back-to-lessons');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const currentLessonTitle = document.getElementById('current-lesson-title');
    
    if (!lesson) {
        console.error('Lesson not found:', lessonId);
        return;
    }
    
    // Update lesson title
    currentLessonTitle.textContent = lesson.title[currentLanguage];
    
    // Hide complete button initially
    completeButton.style.display = 'none';
    
    // Show lesson viewer
    lessonViewer.classList.remove('hidden');
    
    // Reset to first slide
    currentSlide = 0;
    showSlide(currentSlide);
    
    // Add event listeners
    backButton.onclick = () => {
        lessonViewer.classList.add('hidden');
        currentLessonId = null;
    };
    
    prevButton.onclick = () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    };
    
    nextButton.onclick = () => {
        const totalSlides = lesson.slides.length;
        if (currentSlide < totalSlides - 1) {
            showSlide(currentSlide + 1);
        }
    };
}

function showSlide(slideIndex) {
    const lesson = lessonData[currentLessonId];
    const lessonContent = document.getElementById('lesson-content');
    const slideCounter = document.getElementById('slide-counter');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const completeButton = document.getElementById('complete-lesson');
    const totalSlides = lesson.slides.length;
    
    // Update slide content
    const slideContent = lesson.slides[slideIndex];
    lessonContent.innerHTML = `
        <div class="lesson-slide">
            <h2>${slideContent.hausa}</h2>
            <p>${slideContent.english}</p>
            <p>${slideContent.usage}</p>
        </div>
    `;
    
    // Update slide counter
    slideCounter.textContent = `${slideIndex + 1} / ${totalSlides}`;
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Update button states
    prevButton.disabled = slideIndex === 0;
    nextButton.disabled = slideIndex === totalSlides - 1;
    
    // Show complete button only on the last slide
    completeButton.style.display = (slideIndex === totalSlides - 1) ? 'block' : 'none';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add language switch event listeners
    document.getElementById('english-mode').addEventListener('click', () => updateLanguage('english'));
    document.getElementById('hausa-mode').addEventListener('click', () => updateLanguage('hausa'));
    
    // Add click listeners to lesson islands
    document.querySelectorAll('.lesson-island').forEach(island => {
        const lessonId = island.getAttribute('data-lesson');
        if (lessonId !== 'start' && lessonId !== 'finish') {
            island.addEventListener('click', () => {
                const id = parseInt(lessonId);
                if (id === 1 || completedLessons.has(id - 1)) {
                    startLesson(id);
                } else {
                    const message = document.createElement('div');
                    message.className = 'completion-message';
                    message.style.backgroundColor = '#FF6B6B';
                    message.textContent = currentLanguage === 'english' ? 
                        '🔒 Complete the previous lesson first!' : 
                        '🔒 Ka kammala darasin da ya gabata da farko!';
                    document.body.appendChild(message);
                    setTimeout(() => message.remove(), 3000);
                }
            });
        }
    });
    
    // Add complete lesson button listener
    document.getElementById('complete-lesson').addEventListener('click', () => {
        const lessonViewer = document.getElementById('lesson-viewer');
        const currentIsland = document.querySelector(`.lesson-island[data-lesson="${currentLessonId}"]`);
        
        if (currentIsland) {
            // Mark current lesson as completed
            currentIsland.classList.add('completed');
            completedLessons.add(currentLessonId);
            
            // Make next lesson available
            const nextLessonId = currentLessonId + 1;
            const nextIsland = document.querySelector(`.lesson-island[data-lesson="${nextLessonId}"]`);
            if (nextIsland) {
                nextIsland.classList.add('available');
                
                // Show completion message
                const message = document.createElement('div');
                message.className = 'completion-message';
                message.textContent = currentLanguage === 'english' ? 
                    '🎉 Lesson Completed! Next lesson unlocked!' : 
                    '🎉 An kammala darasi! An bude sabon darasi!';
                document.body.appendChild(message);
                setTimeout(() => message.remove(), 3000);
            }
        }
        
        // Close lesson viewer
        lessonViewer.classList.add('hidden');
        currentLessonId = null;
    });
    
    // Initialize with English and mark first lesson as available
    updateLanguage('english');
    document.querySelector('.lesson-island[data-lesson="1"]').classList.add('available');
});
