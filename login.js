// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    // Add some initial animations
    const welcomeTitle = document.querySelector('.welcome-title');
    const loginBox = document.querySelector('.login-box');
    
    setTimeout(() => {
        welcomeTitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 300);
    
    setTimeout(() => {
        loginBox.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 600);

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in a real app, you'd validate against a server)
        if (username && password) {
            // Add loading effect
            const loginBtn = document.querySelector('.login-btn');
            loginBtn.textContent = 'Entering...';
            loginBtn.disabled = true;
            
            // Simulate login delay
            setTimeout(() => {
                // Redirect to main app
                window.location.href = 'index.html';
            }, 1000);
        } else {
            alert('Please enter both username and password');
        }
    });
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
