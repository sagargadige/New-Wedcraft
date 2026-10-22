document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const videoCards = document.querySelectorAll('.video-card');
    const lightbox = document.getElementById('videoLightbox');
    const lightboxIframe = document.getElementById('lightboxIframe');
    const closeBtn = document.querySelector('.lightbox-close');

    // Open lightbox and play video
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video-src');
            lightboxIframe.src = videoUrl; // Insert the YouTube URL
            lightbox.classList.add('active'); // Fade in Lightbox
            document.body.style.overflow = 'hidden'; // Stop page scrolling in background
        });
    });

    // Function to close lightbox and stop video
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Wait for the fade-out animation to finish before clearing the iframe source
        setTimeout(() => {
            lightboxIframe.src = '';
        }, 400); 
    };

    // Close on X button click
    closeBtn.addEventListener('click', closeLightbox);

    // Close when clicking outside the video (on the dark background)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

// ==========================================
    // SWIPER SLIDER (Continuous Infinite Marquee)
    // ==========================================
    const reviewsSlider = new Swiper('.reviews-slider', {
        slidesPerView: 1,      
        spaceBetween: 30,      
        loop: true,            
        speed: 10000,           // Makkhan jaisi smooth speed
        allowTouchMove: true,  
        autoplay: {
            delay: 0,          // Bina ruke chalne ke liye
            disableOnInteraction: false, 
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 }
        }
    });

    // ==========================================
    // HOVER TO PAUSE LOGIC
    // ==========================================
    const sliderContainerDOM = document.querySelector('.reviews-slider');
    
    if (sliderContainerDOM) {
        // Jab mouse slider par aaye -> Ruko
        sliderContainerDOM.addEventListener('mouseenter', () => {
            reviewsSlider.autoplay.stop();
        });
        
        // Jab mouse slider se hate -> Wapas Chalo
        sliderContainerDOM.addEventListener('mouseleave', () => {
            reviewsSlider.autoplay.start();
        });
    }
    // ==========================================
// WCF CINEMATIC LOADER CONTROLLER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("wcf-preloader");
    const progressFill = document.getElementById("loader-progress-fill");
    const percentageText = document.getElementById("loader-percentage");
    const statusText = document.getElementById("loader-status-text");

    if (!preloader) return;

    // Lock scrolling while loader is active
    document.body.style.overflow = "hidden";

    let progress = 0;
    let pageLoaded = false;

    // Detect when actual website assets (images/videos) finish loading
    window.addEventListener("load", () => {
        pageLoaded = true;
    });

    // Simulate smooth luxury progress counter
    const counterInterval = setInterval(() => {
        if (progress < 85) {
            progress += Math.floor(Math.random() * 4) + 2;
        } else if (pageLoaded && progress < 100) {
            progress += 5;
        } else if (!pageLoaded && progress >= 85) {
            // Fallback if heavy videos take time: don't keep user waiting forever
            progress += 1;
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(counterInterval);
            triggerSwooshAndFinish();
        }

        // Update UI
        progressFill.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;

        // Update filmmaking status text dynamically
        if (progress > 40 && progress < 80) {
            statusText.textContent = "Grading Colors...";
        } else if (progress >= 80 && progress < 100) {
            statusText.textContent = "Crafting Story...";
        }
    }, 45);

    function triggerSwooshAndFinish() {
        statusText.textContent = "WedCraft Films";
        
        // STEP 1: Stop aperture spin & Draw Golden Swoosh from C into F
        preloader.classList.add("draw-swoosh");

        // STEP 2: Wait 950ms so user admires the golden swoosh animation, then open shutters
        setTimeout(() => {
            preloader.classList.add("loader-exit");
            document.body.style.overflow = ""; // Restore scrolling

            // STEP 3: Completely remove from DOM after shutter animation completes
            setTimeout(() => {
                preloader.style.display = "none";
            }, 950);
        }, 950);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const heroVideo = document.getElementById("hero-video");
    
    if (heroVideo) {
        // Prevent black screen blink on video loop
        heroVideo.addEventListener("timeupdate", () => {
            if (heroVideo.duration && heroVideo.currentTime >= heroVideo.duration - 0.3) {
                heroVideo.currentTime = 0;
            }
        });
    }
});