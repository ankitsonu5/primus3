// Mobile Vertical Flip Book - Pure JavaScript
(function() {
    'use strict';

    // Only run on mobile
    if (window.innerWidth > 768) return;

    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const section = document.getElementById('mbactivelivinglifesec');
        if (!section) {
            console.error('❌ Mobile flipbook section not found');
            return;
        }

        // Convert existing swiper structure to flipbook
        convertToFlipbook(section);
    }

    function convertToFlipbook(section) {
        console.log('📖 Converting to vertical flip book...');

        // Get all swiper slides (including nested ones)
        const allSlides = section.querySelectorAll('.swiper-slide');
        const pages = [];

        // Extract content from nested structure
        allSlides.forEach(slide => {
            const content = slide.querySelector('.swiper-slider-cont');
            if (content && !pages.some(p => p.contains(content))) {
                pages.push(slide);
            }
        });

        console.log(`📄 Found ${pages.length} pages`);

        // Create new flipbook structure
        const h1 = section.querySelector('h1');
        const h1Text = h1 ? h1.innerHTML : 'Active living, built into<br>every corner of your life.';

        // Clear section
        section.innerHTML = '';
        section.style.position = 'relative';
        section.style.height = '100vh';
        section.style.overflow = 'hidden';
        section.style.background = '#f7f7f9';
        section.style.touchAction = 'none';

        // Add title
        const title = document.createElement('h1');
        title.innerHTML = h1Text;
        title.style.cssText = `
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            color: #801B53;
            padding: 0 20px;
            margin: 0;
        `;
        section.appendChild(title);

        // Create book wrap
        const bookWrap = document.createElement('div');
        bookWrap.style.cssText = `
            perspective: 1600px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 360px;
        `;

        // Create book
        const book = document.createElement('div');
        book.id = 'bookMobile';
        book.style.cssText = `
            position: relative;
            width: 100%;
            height: 520px;
            box-shadow: 0 15px 45px -10px rgba(0,0,0,0.15);
            border-radius: 14px;
            overflow: hidden;
            background: #fff;
        `;

        // Add spine
        const spine = document.createElement('div');
        spine.style.cssText = `
            position: absolute;
            inset: 0;
            background: linear-gradient(#f2f2f2,#e8e8e8) top/100% 22px no-repeat,
                linear-gradient(90deg,transparent 49%,rgba(0,0,0,0.05) 50%,transparent 51%) top/100% 22px repeat-x;
            pointer-events: none;
            z-index: 10;
        `;
        book.appendChild(spine);

        // Add pages
        pages.forEach((slide, index) => {
            const page = document.createElement('section');
            page.className = 'page-mobile';
            page.style.cssText = `
                position: absolute;
                inset: 0;
                transform-style: preserve-3d;
                transform-origin: 50% 0%;
                transition: transform 2s cubic-bezier(0.3,0.7,0.3,1), filter 2s;
                box-shadow: inset 0 -40px 60px rgba(0,0,0,0.02);
                z-index: ${pages.length - index};
                filter: drop-shadow(0 30px 40px rgba(0,0,0,0.15));
            `;

            const content = slide.querySelector('.swiper-slider-cont');
            if (content) {
                content.style.cssText = `
                    position: absolute;
                    inset: 0;
                    backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    background: radial-gradient(150% 120% at 50% 0%, #ffffff, #f0f0f0 70%);
                `;

                const img = content.querySelector('img');
                if (img) {
                    img.style.cssText = `
                        width: 100%;
                        max-width: 200px;
                        height: auto;
                        border-radius: 10px;
                        margin-bottom: 20px;
                    `;
                }

                const h2 = content.querySelector('h2');
                if (h2) {
                    h2.style.cssText = `
                        font-size: 22px;
                        font-weight: 700;
                        color: #333;
                        margin: 10px 0;
                        text-align: center;
                    `;
                }

                const p = content.querySelector('p');
                if (p) {
                    p.style.cssText = `
                        font-size: 14px;
                        line-height: 1.5;
                        color: #555;
                        text-align: center;
                        margin: 0;
                    `;
                }

                const gradient = content.querySelector('.imgcontsecgradient');
                if (gradient) gradient.style.display = 'none';

                page.appendChild(content);
            }

            book.appendChild(page);
        });

        bookWrap.appendChild(book);
        section.appendChild(bookWrap);

        // Add controls
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            z-index: 1000;
        `;

        const prevBtn = document.createElement('button');
        prevBtn.id = 'prevMobile';
        prevBtn.innerHTML = '↑ Prev';
        prevBtn.style.cssText = `
            background: #fff;
            color: #333;
            border: 1px solid #ccc;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            font-size: 14px;
        `;

        const nextBtn = document.createElement('button');
        nextBtn.id = 'nextMobile';
        nextBtn.innerHTML = 'Next ↓';
        nextBtn.style.cssText = prevBtn.style.cssText;

        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        section.appendChild(controls);

        // Initialize flip functionality
        initFlipFunctionality(book, prevBtn, nextBtn);
    }

    function initFlipFunctionality(book, prevBtn, nextBtn) {
        const pageElements = [...book.querySelectorAll('.page-mobile')];
        let currentIndex = 0;

        function update() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === pageElements.length;

            prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '1';
            prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
            nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '1';
            nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
        }

        function flipNext() {
            if (currentIndex < pageElements.length) {
                const page = pageElements[currentIndex];
                page.classList.add('flipped');
                page.style.transform = 'rotateX(-180deg)';
                page.style.filter = 'none';
                currentIndex++;
                update();
                console.log('📄 Flipped to page', currentIndex + 1);
            }
        }

        function flipPrev() {
            if (currentIndex > 0) {
                currentIndex--;
                const page = pageElements[currentIndex];
                page.classList.remove('flipped');
                page.style.transform = 'rotateX(0deg)';
                page.style.filter = 'drop-shadow(0 30px 40px rgba(0,0,0,0.15))';
                update();
                console.log('📄 Flipped back to page', currentIndex + 1);
            }
        }

        // Button events
        nextBtn.onclick = flipNext;
        prevBtn.onclick = flipPrev;

        // Touch events
        let touchStartY = 0;
        let touchEndY = 0;

        book.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        book.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;
            const minSwipe = 50;

            if (Math.abs(swipeDistance) > minSwipe) {
                if (swipeDistance > 0) {
                    // Swipe up = next
                    flipNext();
                } else {
                    // Swipe down = prev
                    flipPrev();
                }
            }
        }, { passive: true });

        // Prevent page scroll
        book.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') flipNext();
            if (e.key === 'ArrowUp' || e.key === 'PageUp') flipPrev();
        });

        update();
        console.log('✅ Flip book initialized with', pageElements.length, 'pages');
    }

})();

