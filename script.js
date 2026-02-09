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

// Gerçek zamanlı sayfa görüntülenme sayacı (CountAPI kullanarak)
async function updatePageViews() {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/enesdursun-me/visits');
        const data = await response.json();
        document.getElementById('pageViews').textContent = data.value;
    } catch (error) {
        console.error('Ziyaretçi sayısı yüklenemedi:', error);
        document.getElementById('pageViews').textContent = '---';
    }
}

// Gerçek zamanlı CV indirme sayacı
async function updateCVDownloads() {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/enesdursun-me/cv-downloads');
        const data = await response.json();
        document.getElementById('cvDownloads').textContent = data.value;
    } catch (error) {
        console.error('İndirme sayısı güncellenemedi:', error);
    }
}

// CV indirme sayısını göster (sadece görüntüle, artırma)
async function getCVDownloads() {
    try {
        const response = await fetch('https://api.countapi.xyz/get/enesdursun-me/cv-downloads');
        const data = await response.json();
        document.getElementById('cvDownloads').textContent = data.value || 0;
    } catch (error) {
        console.error('İndirme sayısı yüklenemedi:', error);
        document.getElementById('cvDownloads').textContent = '0';
    }
}

// Sayfa yüklendiğinde ziyaretçi sayısını artır ve göster
updatePageViews();

// CV indirme sayısını göster (artırma)
getCVDownloads();

// CV indirme butonuna tıklama eventi
document.getElementById('cvDownloadBtn').addEventListener('click', function() {
    updateCVDownloads();
});
