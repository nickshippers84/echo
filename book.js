// Book reading functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bookReadingView = document.getElementById('book-reading-view');
    const closeBook = document.getElementById('close-book');
    const backToHome = document.getElementById('back-to-home');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const pageProgressFill = document.getElementById('page-progress-fill');
    const bookPages = document.getElementById('book-pages');
    const bookTitle = document.getElementById('book-title');
    const bookCoverImage = document.getElementById('book-cover-image');

    // Book data
    const books = {
        'magic-forest': {
            title: 'The Magic Forest',
            cover: '🌲',
            pages: [
                { image: 'books/magic-forest/magic-forest-1.png', text: 'Once upon a time, there was a magical forest.' },
                { image: 'books/magic-forest/magic-forest-2.png', text: 'Beautiful butterflies danced in the sunlight.' },
                { image: 'books/magic-forest/magic-forest-3.png', text: 'A little rabbit hopped through the trees.' },
                { image: '🌺', text: 'Colorful flowers bloomed everywhere you looked.' },
                { image: '✨', text: 'Magic sparkles filled the enchanted air.' },
                { image: '🦉', text: 'A wise old owl watched from above.' },
                { image: '🍄', text: 'Tiny mushrooms grew in perfect circles.' },
                { image: '🌙', text: 'The moon shone bright in the night sky.' },
                { image: '🦌', text: 'A gentle deer walked through the clearing.' },
                { image: '🌊', text: 'A crystal stream bubbled over smooth rocks.' },
                { image: '🦋', text: 'Fireflies twinkled like tiny stars below.' },
                { image: '🌿', text: 'Ancient vines twisted around old oak trees.' },
                { image: '🐸', text: 'A friendly frog sat on a lily pad.' },
                { image: '🌅', text: 'The sun painted the sky in golden colors.' },
                { image: '🦋', text: 'The forest whispered secrets to the wind.' },
                { image: '🌟', text: 'And the magic lived on forever and ever.' }
            ]
        },
        'adventure-island': {
            title: 'Adventure Island',
            cover: '🏝️',
            pages: [
                { image: 'books/adventure-island/adventure-island-1.png', text: 'Welcome to the amazing Adventure Island!' },
                { image: '🏴‍☠️', text: 'Pirates sailed across the blue ocean waves.' },
                { image: '🗺️', text: 'Treasure maps led to hidden golden chests.' },
                { image: '🐙', text: 'A friendly octopus waved from the water.' },
                { image: '🏆', text: 'The brave explorers found the secret treasure!' },
                { image: '⛵', text: 'A small boat waited by the shore.' },
                { image: '🌴', text: 'Tall palm trees swayed in the breeze.' },
                { image: '🐚', text: 'Beautiful seashells sparkled on the sand.' }
            ]
        },
        'space-explorer': {
            title: 'Space Explorer',
            cover: '🚀',
            pages: [
                { image: 'books/space-adventure/space-adventure-1.png', text: 'Blast off into the amazing space adventure!' },
                { image: '🪐', text: 'Visit strange planets with colorful rings.' },
                { image: '👽', text: 'Meet friendly aliens from distant galaxies.' },
                { image: '⭐', text: 'Shooting stars sparkled in the dark sky.' },
                { image: '🌍', text: 'Return safely home to planet Earth.' },
                { image: '🛸', text: 'A flying saucer zoomed through the stars.' },
                { image: '🌕', text: 'The full moon glowed like a giant pearl.' },
                { image: '🔭', text: 'A telescope helped us see far away.' }
            ]
        },
        'dinosaur-friends': {
            title: 'Dinosaur Friends',
            cover: '🦕',
            pages: [
                { image: 'books/dinosaur-friends/dinosaur-friends-1.png', text: 'Meet the friendly dinosaurs of long ago.' },
                { image: '🌿', text: 'They lived in forests with giant trees.' },
                { image: '🥚', text: 'Baby dinosaurs hatched from colorful eggs.' },
                { image: '🌋', text: 'Volcanoes erupted with bright orange lava.' },
                { image: '🌈', text: 'A rainbow appeared after the big storm.' },
                { image: '🦕', text: 'Gentle herbivores munched on green leaves.' },
                { image: '🦴', text: 'Fossils told stories of ancient times.' },
                { image: '🌅', text: 'The sun rose over the prehistoric world.' }
            ]
        }
    };

    // Current book state
    let currentBook = null;
    let currentPageIndex = 0;

    // Get book ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book') || 'magic-forest';

    // Initialize book
    openBook(bookId);

    // Open book function
    function openBook(bookId) {
        currentBook = books[bookId];
        currentPageIndex = 0;
        
        // Update book title and cover
        bookTitle.textContent = currentBook.title;
        bookCoverImage.textContent = currentBook.cover;
        
        // Hide cover page and show pages immediately
        document.querySelector('.book-cover-page').style.display = 'none';
        bookPages.style.display = 'block';
        
        // Generate pages
        generatePages();
        
        // Show first page
        showPage(0);
        
        // Update progress bar
        updateProgressBar();
        
        // Update navigation buttons
        updateNavigationButtons();
    }

    // Close book function
    closeBook.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Back to home function
    backToHome.addEventListener('click', function() {
        window.location.href = 'index.html';
    });


    // Generate book pages
    function generatePages() {
        console.log('Generating pages for book:', currentBook.title, 'with', currentBook.pages.length, 'pages');
        bookPages.innerHTML = '';
        
        currentBook.pages.forEach((page, index) => {
            const pageElement = document.createElement('div');
            pageElement.className = 'book-page';
            
            // Check if the image is a URL or an emoji
            const isImageUrl = page.image.startsWith('http') || page.image.includes('.png') || page.image.includes('.jpg') || page.image.includes('.jpeg') || page.image.includes('.gif');
            const imageContent = isImageUrl 
                ? `<img src="${page.image}" alt="Page illustration" />`
                : page.image;
            
            pageElement.innerHTML = `
                <div class="page-image">${imageContent}</div>
                <div class="page-text">${page.text}</div>
            `;
            bookPages.appendChild(pageElement);
            console.log('Created page', index, ':', page.text);
        });
        
        console.log('Total pages created:', document.querySelectorAll('.book-page').length);
    }

    // Show specific page
    function showPage(pageIndex) {
        const pages = document.querySelectorAll('.book-page');
        console.log('showPage called with index:', pageIndex, 'total pages found:', pages.length);
        
        pages.forEach((page, index) => {
            page.classList.remove('active', 'prev', 'next');
            
            if (index === pageIndex) {
                page.classList.add('active');
                console.log('Set page', index, 'as active');
            } else if (index < pageIndex) {
                page.classList.add('prev');
            } else {
                page.classList.add('next');
            }
        });
        
        currentPageIndex = pageIndex;
        updateProgressBar();
        updateNavigationButtons();
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevPage.disabled = currentPageIndex === 0;
        nextPage.disabled = currentPageIndex === currentBook.pages.length - 1;
    }

    // Update progress bar
    function updateProgressBar() {
        if (currentBook && pageProgressFill) {
            const progress = ((currentPageIndex + 1) / currentBook.pages.length) * 100;
            pageProgressFill.style.width = progress + '%';
        }
    }


    // Navigation functions
    function goToNextPage() {
        console.log('Next button clicked, current page:', currentPageIndex, 'total pages:', currentBook ? currentBook.pages.length : 'no book loaded');
        console.log('Current book:', currentBook);
        
        if (!currentBook) {
            console.error('No book loaded!');
            return;
        }
        
        if (currentPageIndex < currentBook.pages.length - 1) {
            // Add sparkle effect
            createSparkles(nextPage);
            
            const currentPage = document.querySelector('.book-page.active');
            console.log('Current page element:', currentPage);
            if (currentPage) {
                console.log('Starting page turn animation...');
                currentPage.classList.add('page-turning');
                
                // Animation removed - keeping page turning functionality
                
                setTimeout(() => {
                    console.log('Moving to next page:', currentPageIndex + 1);
                    showPage(currentPageIndex + 1);
                    currentPage.classList.remove('page-turning');
                    console.log('Page turn complete');
                }, 400);
            } else {
                console.error('No active page found!');
            }
        } else {
            console.log('Already at last page');
        }
    }

    function goToPrevPage() {
        if (currentPageIndex > 0) {
            // Add sparkle effect
            createSparkles(prevPage);
            
            const currentPage = document.querySelector('.book-page.active');
            if (currentPage) {
                currentPage.classList.add('page-turning-reverse');
                
                setTimeout(() => {
                    showPage(currentPageIndex - 1);
                    currentPage.classList.remove('page-turning-reverse');
                }, 400);
            }
        }
    }

    // Navigation event listeners
    nextPage.addEventListener('click', goToNextPage);
    prevPage.addEventListener('click', goToPrevPage);

    // Sparkle effect function
    function createSparkles(element) {
        const sparkleCount = 20;
        const elementRect = element.getBoundingClientRect();
        
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
                left: ${elementRect.left + elementRect.width / 2}px;
                top: ${elementRect.top + elementRect.height / 2}px;
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

});
