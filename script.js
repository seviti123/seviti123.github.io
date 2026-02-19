// Navbar'da aktivasyon göstergesi
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-menu a').forEach(l => l.style.color = '');
        e.target.style.color = 'var(--primary-color)';
    });
});

// Scroll ile navbar linklerini aktifleştir
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sayfa yüklendiğinde animasyonlar
window.addEventListener('load', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card, .cv-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

// Dinamik yıl güncelleme
document.querySelector('.footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Elektrik-Elektronik Mühendisi. Tüm hakları saklıdır.`;

// Particle Canvas Effect - Tüm Bölümlerde Dokunma ve Fare Efekti
(function() {
    const canvases = document.querySelectorAll('.particle-canvas');
    if (!canvases.length) return;

    const config = {
        particleColor: '99, 102, 241', // Primary color RGB
        animationSpeed: 0.006
    };

    // Her canvas için ayrı sistem
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        let animationId = null;
        let time = 0;
        const particles = [];
        
        const mouse = {
            x: 0,
            y: 0,
            isDown: false
        };

        // Canvas boyutlandırma
        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            
            ctx.scale(dpr, dpr);
        }

        // Parçacık oluşturma
        function createParticles(x, y) {
            const numParticles = 25 + Math.random() * 15; // 25-40 parçacık

            // Hızlı parçacıklar
            for (let i = 0; i < numParticles; i++) {
                const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5;
                const speed = 2 + Math.random() * 4;
                const size = 1 + Math.random() * 3;

                particles.push({
                    x: x + (Math.random() - 0.5) * 10,
                    y: y + (Math.random() - 0.5) * 10,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 0,
                    maxLife: 2000 + Math.random() * 3000,
                    size: size,
                    angle: angle,
                    speed: speed
                });
            }

            // Yavaş, büyük parçacıklar
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 0.5 + Math.random() * 1.5;

                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 0,
                    maxLife: 4000 + Math.random() * 2000,
                    size: 2 + Math.random() * 2,
                    angle: angle,
                    speed: speed
                });
            }
        }

        // Fare olayları
        function handleMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        function handleMouseDown(e) {
            // Tıklanabilir elemanlara tıklanırsa parçacık oluşturma
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && (
                target.classList.contains('btn') || 
                target.closest('.btn') ||
                target.tagName === 'A' ||
                target.closest('a') ||
                target.classList.contains('skill-card') ||
                target.closest('.skill-card') ||
                target.classList.contains('project-card') ||
                target.closest('.project-card') ||
                target.classList.contains('contact-item') ||
                target.closest('.contact-item')
            )) {
                return;
            }
            
            mouse.isDown = true;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createParticles(x, y);
        }

        function handleMouseUp() {
            mouse.isDown = false;
        }

        // Dokunmatik ekran olayları
        function handleTouchStart(e) {
            // Tıklanabilir elemanlara dokunulursa parçacık oluşturma
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target && (
                target.classList.contains('btn') || 
                target.closest('.btn') ||
                target.tagName === 'A' ||
                target.closest('a') ||
                target.classList.contains('skill-card') ||
                target.closest('.skill-card') ||
                target.classList.contains('project-card') ||
                target.closest('.project-card') ||
                target.classList.contains('contact-item') ||
                target.closest('.contact-item')
            )) {
                return;
            }
            
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            createParticles(x, y);
        }

        function handleTouchMove(e) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouse.x = touch.clientX - rect.left;
            mouse.y = touch.clientY - rect.top;
        }

        function handleTouchEnd(e) {
            // Touch sonlandı
        }

        // Animasyon döngüsü
        function animate() {
            time += config.animationSpeed;

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            // Temiz arka plan
            ctx.clearRect(0, 0, width, height);

            // Parçacıkları güncelle ve çiz
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                
                particle.life += 16; // ~60fps
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Fizik efektleri
                particle.vy += 0.02; // Yerçekimi
                particle.vx *= 0.995; // Hava direnci
                particle.vy *= 0.995;

                // Organik hareket
                const organicX = Math.sin(time + particle.angle) * 0.3;
                const organicY = Math.cos(time + particle.angle * 0.7) * 0.2;
                particle.x += organicX;
                particle.y += organicY;

                // Yaşam döngüsü
                const lifeProgress = particle.life / particle.maxLife;
                const alpha = Math.max(0, (1 - lifeProgress) * 0.8);
                const currentSize = particle.size * (1 - lifeProgress * 0.3);

                // Parçacığı çiz
                if (alpha > 0) {
                    ctx.fillStyle = `rgba(${config.particleColor}, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, currentSize, 0, 2 * Math.PI);
                    ctx.fill();
                }

                // Ölü parçacıkları kaldır
                if (particle.life >= particle.maxLife || 
                    particle.x < -50 || particle.x > width + 50 ||
                    particle.y < -50 || particle.y > height + 50) {
                    particles.splice(i, 1);
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        // Olayları dinle
        const handleResize = () => resizeCanvas();
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        
        // Dokunmatik ekran desteği - mobil scroll'u engellemeden
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);

        // Başlat
        resizeCanvas();
        animate();

        // Temizlik fonksiyonu
        canvas._cleanup = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    });

    // Sayfa kapatıldığında temizlik
    window.addEventListener('beforeunload', () => {
        canvases.forEach(canvas => {
            if (canvas._cleanup) {
                canvas._cleanup();
            }
        });
    });
})();
