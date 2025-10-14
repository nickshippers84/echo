// DOM Elements
const appContainer = document.getElementById('app-container');
const startButton = document.getElementById('start-button');
const bookTab = document.getElementById('book-tab');
const libraryPanel = document.getElementById('library-panel');
const closeLibrary = document.getElementById('close-library');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set up toggle functionality
    setupToggleButtons();
    
    // Set up background selector
    setupBackgroundSelector();
});

// Toggle button functionality
function setupToggleButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle specific button actions
            if (this.id === 'start-button') {
                handleStartReading();
            } else if (this.id === 'book-tab') {
                handleLibraryToggle();
            }
        });
    });
}

// Start reading functionality
function handleStartReading() {
    // Add click animation
    const button = document.getElementById('start-button');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Add sparkle effect
    createSparkles();
    
    // Navigate to Magic Forest book
    setTimeout(() => {
        window.location.href = 'book.html?book=magic-forest';
    }, 500);
}

// Library toggle functionality
function handleLibraryToggle() {
    libraryPanel.classList.add('open');
    // Add a little bounce to the button when clicked
    const button = document.getElementById('book-tab');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
}

// Close library functionality
closeLibrary.addEventListener('click', function() {
    libraryPanel.classList.remove('open');
});

// Close library when clicking outside
libraryPanel.addEventListener('click', function(e) {
    if (e.target === libraryPanel) {
        libraryPanel.classList.remove('open');
    }
});

// Book item click handlers
document.querySelectorAll('.book-item').forEach(item => {
    item.addEventListener('click', function() {
        const bookId = this.getAttribute('data-book');
        const bookProgress = this.querySelector('.book-progress');
        const progressText = bookProgress.textContent;
        
        // Check if book is locked
        if (progressText.includes('Locked')) {
            showAreaMessage('Book Locked', 'Complete other books first to unlock this one! 🔐');
            return;
        }
        
        
        // Navigate to book reading page
        setTimeout(() => {
            window.location.href = `book.html?book=${bookId}`;
        }, 500);
    });
});



// Helper functions
function showAreaMessage(title, message) {
    // Create a temporary message overlay
    const messageOverlay = document.createElement('div');
    messageOverlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        text-align: center;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    messageOverlay.innerHTML = `
        <h3 style="color: #495057; margin-bottom: 1rem; font-size: 1.3rem;">${title}</h3>
        <p style="color: #6c757d; line-height: 1.5;">${message}</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        ">Close</button>
    `;
    
    document.body.appendChild(messageOverlay);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageOverlay.parentElement) {
            messageOverlay.remove();
        }
    }, 5000);
}

function addClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }, 150);
}

function createSparkles() {
    const sparkleCount = 20;
    const startButtonRect = startButton.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${startButtonRect.left + startButtonRect.width / 2}px;
            top: ${startButtonRect.top + startButtonRect.height / 2}px;
        `;
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromLeft {
        from {
            transform: translateX(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInFromRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInFromBottom {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add some initial animations
    const welcomeTitle = document.querySelector('.welcome-title');
    const loginBox = document.querySelector('.login-box');
    
    setTimeout(() => {
        welcomeTitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 300);
    
    setTimeout(() => {
        loginBox.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 600);
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .welcome-title, .login-box {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(fadeInStyle);

// Background selector functionality
function setupBackgroundSelector() {
    const bgButtons = document.querySelectorAll('.bg-button');
    const readingNook = document.querySelector('.reading-nook-section');

    bgButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            bgButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the background type
            const bgType = this.getAttribute('data-bg');

            // Update the reading nook background by changing CSS class
            readingNook.className = 'reading-nook-section';
            if (bgType === 'stage-curtains-bed2') {
                readingNook.classList.add('bg-stage-curtains-bed2');
            } else if (bgType === 'stars') {
                readingNook.classList.add('bg-stars');
            }
        });
    });
}
