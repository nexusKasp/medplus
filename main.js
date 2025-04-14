const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    function openAppointmentModal() {
        const modal = document.getElementById('appointmentModal');
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeAppointmentModal() {
        const modal = document.getElementById('appointmentModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    window.onclick = function(event) {
        const modal = document.getElementById('appointmentModal');
        if (event.target === modal) {
            closeAppointmentModal();
        }
    };
    
    function handleAppointmentSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Appointment request:', data);
        
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        event.target.reset();
        closeAppointmentModal();
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            header.classList.remove('scrolled');
            return;
        }
        
        header.classList.add('scrolled');
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
    
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            '.hero-content, .about-image, .about-text, .feature-card, ' +
            '.service-card, .doctor-card, .testimonial-card, ' +
            '.appointment-form, .gallery-item, .stat-item, ' +
            '.contact-card, .map' 
        );
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    let statsAnimated = false;
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.about-stats');
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.85) {
            document.querySelectorAll('.stat-item h3').forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = Math.ceil(target / 50);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = current;
                }, 20);
            });
            
            statsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', animateStats);
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="Gallery Image">
                </div>
            `;
            document.body.appendChild(lightbox);
            
            setTimeout(() => lightbox.classList.add('show'), 10);
            
            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                lightbox.classList.remove('show');
                setTimeout(() => lightbox.remove(), 300);
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('show');
                    setTimeout(() => lightmindbox.remove(), 300);
                }
            });
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    });
    
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.show {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .close-lightbox:hover {
            color: var(--danger-color);
            transform: rotate(90deg);
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto 3rem;
        }
        
        .contact-card {
            background-color: white;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: var(--box-shadow);
            text-align: center;
            transition: var(--transition);
            transform: translateY(50px);
            opacity: 0;
        }
        
        .contact-card.animate {
            transform: translateY(0);
            opacity: 1;
        }
        
        .contact-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(50,50,93,.1),0 10px 20px rgba(0,0,0,.08);
        }
        
        .contact-card i {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }
        
        .contact-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }
        
        .contact-card p {
            color: var(--dark-gray);
        }
        
        .map {
            max-width: 1200px;
            margin: 0 auto;
            transform: translateY(50px);
            opacity: 0;
            transition: var(--transition);
        }
        
        .map.animate {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    animateOnScroll();
