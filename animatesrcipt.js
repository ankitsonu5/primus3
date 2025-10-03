
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      } else {
        // reverse chahiye to enable rakho, one-time ke liye comment kar do
        entry.target.classList.remove("animate-in");
      }
    }
  }, { threshold: 0.15 });

  document
    .querySelectorAll(".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale")
    .forEach(el => io.observe(el));



        // GSAP Animation for Circular Spinner with ScrollTrigger
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        class CircularSpinnerAnimation {
            constructor() {
                this.container = document.querySelector('[data-w-id="5ddf7355-c46a-8dde-174c-106bcc7c00e9"]');
                this.spinnerContainer = this.container.querySelector('.spinner-container');
                this.columns = Array.from(this.container.querySelectorAll('.spinner-c'));
                this.cards = Array.from(this.container.querySelectorAll('.spinner-cards'));
                this.timeline = null;
                this.isReversed = false;
                this.currentSpeed = 1;

                this.init();
            }

            init() {
                this.setupInitialPositions();
                this.createScrollAnimation();
                this.animateCenterTextFade();
                this.addInteractivity();
                console.log('🎡 Horizontal to Circle Animation initialized with 9 cards!');
            }

            setupInitialPositions() {
                // Set initial horizontal positions (like in index.html)
                // Cards will be positioned in a horizontal line initially
                const totalCards = this.columns.length;
                const angleStep = 360 / totalCards;

                this.columns.forEach((column, index) => {
                    const initialAngle = index * angleStep;

                    // Set initial state - horizontal line
                    gsap.set(column, {
                        rotation: initialAngle,
                        transformOrigin: 'center center',
                        willChange: 'transform'
                    });
                });

                console.log(`✅ Initial positions set for ${this.columns.length} cards`);
            }

            createScrollAnimation() {
                const totalCards = this.columns.length;
                const radius = 250; // Radius of the circle in pixels

                // Create scroll-triggered animation for each card
                this.columns.forEach((column, index) => {
                    const angleStep = 360 / totalCards;
                    const finalAngle = index * angleStep;
                    const radian = (finalAngle * Math.PI) / 180;

                    // Calculate final circular position
                    const finalX = Math.cos(radian) * radius;
                    const finalY = Math.sin(radian) * radius;

                    // Animate from horizontal line to circle position
                    gsap.to(column, {
                        x: finalX,
                        y: finalY,
                        rotation: finalAngle + 360, // Rotate while moving to circle
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: this.container,
                            start: "top bottom",
                            end: "center center",
                            scrub: 1,
                            onUpdate: (self) => {
                                if (index === 0) {
                                    console.log(`🎯 Circle formation: ${Math.round(self.progress * 100)}%`);
                                }
                            }
                        }
                    });
                });

                // Rotate the entire circle after formation
                gsap.to(this.spinnerContainer, {
                    rotation: 360,
                    ease: "none",
                    scrollTrigger: {
                        trigger: this.container,
                        start: "center center",
                        end: "bottom top",
                        scrub: 1,
                        onUpdate: (self) => {
                            console.log(`🔄 Circle rotation: ${Math.round(self.progress * 100)}%`);
                        }
                    }
                });

                // Add floating effect to cards
                this.cards.forEach((card, index) => {
                    gsap.to(card, {
                        y: "+=10",
                        duration: 2 + (index * 0.2),
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: index * 0.1
                    });
                });

                console.log('🎯 Scroll-based circle formation animation created!');
            }

            animateCenterTextFade() {
                const centerText = document.querySelector('.content-spinner-wrapper');

                if (centerText) {
                    // Fade out center text as user scrolls down
                    gsap.to(centerText, {
                        opacity: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: this.container,
                            start: "top top",
                            end: "30% top",
                            scrub: 1,
                            onUpdate: (self) => {
                                console.log(`✨ Center text opacity: ${Math.round((1 - self.progress) * 100)}%`);
                            }
                        }
                    });
                }

                console.log('✨ Center text fade out animation created!');
            }

            addInteractivity() {
                this.cards.forEach((card, index) => {
                    card.addEventListener('click', () => {
                        console.log(`🎯 Card ${index + 1} clicked!`);
                    });
                });

                console.log('✅ Interactive effects added to all cards');
            }

            // Control methods for scroll-based animation
            play() {
                ScrollTrigger.getAll().forEach(st => st.enable());
                console.log('▶️ Animation enabled');
            }

            pause() {
                ScrollTrigger.getAll().forEach(st => st.disable());
                console.log('⏸️ Animation paused');
            }

            setSpeed(speed) {
                this.currentSpeed = speed;
                ScrollTrigger.getAll().forEach(st => {
                    st.vars.scrub = speed;
                    st.refresh();
                });
                console.log(`⚡ Speed set to ${speed}x`);
            }

            reset() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('🔄 Scrolled to top');
            }

            toggleDirection() {
                this.isReversed = !this.isReversed;
                console.log(`🔄 Direction toggle (feature coming soon)`);
            }
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            // Wait for images to load
            const images = document.querySelectorAll('.cover-image');
            const progressBar = document.getElementById('loadingProgressBar');
            let loadedImages = 0;
            const totalImages = images.length;

            const updateProgress = () => {
                const progress = (loadedImages / totalImages) * 100;
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            };

            const checkAllImagesLoaded = () => {
                loadedImages++;
                updateProgress();

                if (loadedImages === totalImages) {
                    // All images loaded, initialize animation
                    window.spinnerAnimation = new CircularSpinnerAnimation();

                    // Hide loading overlay
                    setTimeout(() => {
                        const loadingOverlay = document.getElementById('loadingOverlay');
                        if (loadingOverlay) {
                            loadingOverlay.classList.add('hidden');
                            console.log(`✅ All ${totalImages} images loaded, animation ready!`);
                        }
                    }, 500);
                }
            };

            // Add load event listeners to all images
            images.forEach(img => {
                if (img.complete) {
                    checkAllImagesLoaded();
                } else {
                    img.addEventListener('load', checkAllImagesLoaded);
                    img.addEventListener('error', () => {
                        console.warn('⚠️ Image failed to load:', img.src);
                        checkAllImagesLoaded(); // Handle errors gracefully
                    });
                }
            });

            // Fallback: If no images or all already loaded
            if (totalImages === 0) {
                window.spinnerAnimation = new CircularSpinnerAnimation();
                const loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.add('hidden');
                }
            }

            // Add scroll progress tracking
            window.addEventListener('scroll', () => {
                const scrollProgressBar = document.getElementById('scrollProgressBar');
                if (scrollProgressBar) {
                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight;
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
                    scrollProgressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
                }
            });

            // Add keyboard controls
            document.addEventListener('keydown', (e) => {
                if (!window.spinnerAnimation) return;

                switch (e.key) {
                    case ' ': // Spacebar - toggle pause/play
                        e.preventDefault();
                        if (window.spinnerAnimation.scrollRotation?.scrollTrigger?.isActive) {
                            window.spinnerAnimation.pause();
                        } else {
                            window.spinnerAnimation.play();
                        }
                        console.log('⌨️ Spacebar pressed - toggled animation');
                        break;
                    case 'r':
                    case 'R': // R - reset
                        window.spinnerAnimation.reset();
                        console.log('⌨️ R pressed - reset animation');
                        break;
                    case 'd':
                    case 'D': // D - toggle direction
                        window.spinnerAnimation.toggleDirection();
                        console.log('⌨️ D pressed - toggled direction');
                        break;
                    case '1': // 1 - slow speed
                        window.spinnerAnimation.setSpeed(0.5);
                        console.log('⌨️ 1 pressed - slow speed');
                        break;
                    case '2': // 2 - normal speed
                        window.spinnerAnimation.setSpeed(1);
                        console.log('⌨️ 2 pressed - normal speed');
                        break;
                    case '3': // 3 - fast speed
                        window.spinnerAnimation.setSpeed(2);
                        console.log('⌨️ 3 pressed - fast speed');
                        break;
                }
            });

            console.log('⌨️ Keyboard controls enabled: Space (pause/play), R (reset), D (direction), 1/2/3 (speed)');
        });

    // Scroll animation js code
     function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function handleScrollAnimation() {
            const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');

            animateElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('animate-in');
                }
            });
        }

        window.addEventListener('scroll', handleScrollAnimation);
        window.addEventListener('load', handleScrollAnimation);
        handleScrollAnimation();