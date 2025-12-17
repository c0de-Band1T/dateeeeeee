let selectedDate = "";
let selectedFood = "Surprise"; // Default
let currentChapter = 0;

// THE STORY CHAPTERS
const chapters = [
    {
        title: "The Arrival",
        desc: "I pick you up—you looking chumaaa as you always do. We check in. (Msg that dumb guy on insta about the time 😉)",
        icon: "fa-hotel",
        hasInteraction: false
    },
    {
        title: "The Feast",
        desc: "We are settled in and it's time to eat. We are ordering in. What's the mood?",
        icon: "fa-utensils",
        hasInteraction: true // This triggers the buttons
    },
    {
        title: "Cozy Mode",
        desc: "Food arrives. Netflix on the big screen. Private room. Just us till the evening. Chill mode: Activated.",
        icon: "fa-bed",
        hasInteraction: false
    },
    {
        title: "The Farewell",
        desc: "After hours of fun, food, and relaxing, we grab some evening snacks before I drop you home, safe and happy.",
        icon: "fa-moon",
        hasInteraction: false
    }
];

// 1. DATE SELECTION
function selectDate(date) {
    selectedDate = date;
    document.getElementById('section-landing').classList.remove('active');
    setTimeout(() => {
        document.getElementById('section-story').classList.add('active');
        updateStoryUI();
    }, 500);
}

// 2. FOOD SELECTION LOGIC
function selectFood(food) {
    selectedFood = food;
    // Auto advance to next chapter after selection
    nextChapter();
}

// 3. STORYBOOK LOGIC
function updateStoryUI() {
    const content = document.querySelector('.story-content');
    const chapter = chapters[currentChapter];
    
    // Fade Out
    content.style.opacity = 0;

    setTimeout(() => {
        // Update Text & Icons
        document.getElementById('chapter-number').innerText = `Chapter ${currentChapter + 1}`;
        document.getElementById('story-title').innerText = chapter.title;
        document.getElementById('story-desc').innerText = chapter.desc;
        document.getElementById('story-icon').innerHTML = `<i class="fas ${chapter.icon}"></i>`;
        
        // Handle Interaction (Food Buttons)
        const nextBtn = document.getElementById('next-page-btn');
        const foodOptions = document.getElementById('food-options');
        const finishBtn = document.getElementById('finish-story-btn');

        if (chapter.hasInteraction) {
            foodOptions.classList.remove('hidden'); // Show buttons
            nextBtn.classList.add('hidden'); // Hide "Next" button because clicking food acts as next
        } else {
            foodOptions.classList.add('hidden');
            
            // Logic for Next/Finish Buttons
            if (currentChapter === chapters.length - 1) {
                nextBtn.classList.add('hidden');
                finishBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                finishBtn.classList.add('hidden');
            }
        }
        
        // Update Dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentChapter) dot.classList.add('active-dot');
            else dot.classList.remove('active-dot');
        });

        // Fade In
        content.style.opacity = 1;

    }, 400);
}

function nextChapter() {
    if (currentChapter < chapters.length - 1) {
        currentChapter++;
        updateStoryUI();
    }
}

function goToAsk() {
    document.getElementById('section-story').classList.remove('active');
    setTimeout(() => {
        document.getElementById('section-ask').classList.add('active');
    }, 500);
}

// 4. RUNAWAY BUTTON
function moveButton() {
    const btn = document.getElementById('no-btn');
    const container = document.querySelector('.buttons-container');
    const rect = container.getBoundingClientRect();
    
    const x = Math.random() * (rect.width - btn.offsetWidth);
    const y = Math.random() * (rect.height - btn.offsetHeight);
    
    btn.style.position = 'absolute';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

// 5. GENERATE TICKET
function generateTicket() {
    document.getElementById('section-ask').classList.remove('active');
    
    // Fill Ticket Data
    document.getElementById('final-date').innerText = selectedDate;
    document.getElementById('final-food').innerText = selectedFood;
    
    setTimeout(() => {
        document.getElementById('section-ticket').classList.add('active');
    }, 500);
}