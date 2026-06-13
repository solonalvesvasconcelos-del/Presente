// Music Playback
        const playMusicBtn = document.getElementById('playMusicBtn');
        const backgroundMusic = document.getElementById('backgroundMusic');

        playMusicBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    playMusicBtn.textContent = 'Música tocando... 🎵';
                }).catch(error => {
                    console.log('Autoplay prevented or other error:', error);
                    playMusicBtn.textContent = 'Erro ao tocar música. Tente novamente.';
                });
            } else {
                backgroundMusic.pause();
                playMusicBtn.textContent = 'Música pausada ⏸️';
            }
        });

        // Lightbox Functionality
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImage.src = item.src;
                lightboxCaption.textContent = item.getAttribute('data-caption');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Close if clicking outside the image
                lightbox.style.display = 'none';
            }
        });

        // Timeline Fade-in on Scroll
        const timelineItems = document.querySelectorAll('.timeline-item');

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of item visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Floating Hearts Generation
        const heartContainer = document.querySelector('.heart-container');

        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heartContainer.appendChild(heart);

            const size = Math.random() * 20 + 10; // 10 to 30px
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5 to 10s
            heart.style.animationDelay = `${Math.random() * 5}s`; // Staggered start
            heart.style.filter = `blur(${Math.random() * 1}px)`; // Subtle blur

            // Remove heart after animation to prevent DOM bloat
            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }

        // Generate hearts every second
        setInterval(createHeart, 1000);

        // Initial hearts
        for (let i = 0; i < 10; i++) {
            createHeart();
        }