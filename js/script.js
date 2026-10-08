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
    // PRELOADER REMOVAL LOGIC
    // ==========================================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Thoda sa luxury delay (0.8 seconds) taki animation achhe se dikhe
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 800);
        }
    });