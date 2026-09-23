
document.addEventListener('DOMContentLoaded', () => {


  function initRevealOnScroll() {
    const revealTargets = document.querySelectorAll(
      '.about-container, .engineering-item, .product-card, .card, .industry-row, .journey-top, .quality-container'
    );

    if (!revealTargets.length) return;

 
    revealTargets.forEach(el => el.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.15,        
      rootMargin: '0px 0px -50px 0px' 
    });

    revealTargets.forEach(el => observer.observe(el));
  }



  function initHeaderOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 80; 

    function updateHeader() {
      const currentScrollY = window.scrollY;

  
      if (currentScrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }

      
      if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('navbar-hidden');   
      } else {
        navbar.classList.remove('navbar-hidden'); 
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }



  function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (!burger || !navLinks) return;

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

   
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

   
    document.addEventListener('click', (e) => {
      const clickedInsideMenu = navLinks.contains(e.target) || burger.contains(e.target);
      if (!clickedInsideMenu) {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }


  function initSmoothScroll() {
    const navbar = document.querySelector('.navbar');
    const headerOffset = navbar ? navbar.offsetHeight + 20 : 100; // 

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return; 

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return; 

        e.preventDefault();

        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: targetPosition - headerOffset,
          behavior: 'smooth'
        });
      });
    });
  }


  
  function initCardTilt() {
    const cards = document.querySelectorAll('.product-image');
    if (!cards.length) return;

    const MAX_TILT = 10; 

    cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        // Cursor position within the card, from -0.5 to 0.5
        const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
        const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

        // Moving mouse right -> tilt right (rotateY),
        // moving mouse down -> tilt "away" (negative rotateX)
        const rotateY = xPercent * MAX_TILT * 2;
        const rotateX = -yPercent * MAX_TILT * 2;

        card.style.transform =
          `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }


 
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.hero-video');
    if (!hero || !video) return;

    const PARALLAX_STRENGTH = 0.35; 
    let ticking = false;

    function updateParallax() {
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;

      if (scrollY < heroHeight) {
        video.style.transform = `translateY(${scrollY * PARALLAX_STRENGTH}px)`;
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }


 
  function initMagneticButtons() {
    const buttons = document.querySelectorAll(
      '.expert-btn, .products-btn, .explore-btn, .discover-btn, .journey-btn, .quality-btn, .btn-red, .btn-outline, .dealer-btn'
    );
    if (!buttons.length) return;

    const MAGNET_STRENGTH = 0.3;
    const MAX_SHIFT = 10;       

    buttons.forEach(btn => {
      btn.style.transition = 'transform 0.2s ease';

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);

       
        let moveX = offsetX * MAGNET_STRENGTH - 4; 
        moveX = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, moveX));

        btn.style.transform = `translateX(${moveX}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateX(0)';
      });
    });
  }


  function initVideoFallback() {
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.hero-video');
    if (!hero || !video) return;

    const FALLBACK_IMAGE = './assests/hero-fallback.jpg'; // add this image yourself

    function showFallback() {
      video.style.display = 'none';
      hero.style.backgroundImage = `url('${FALLBACK_IMAGE}')`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    }

    video.addEventListener('error', showFallback);

   
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(showFallback);
    }
  }



  initRevealOnScroll();
  initHeaderOnScroll();
  initBurgerMenu();
  initSmoothScroll();
  initCardTilt();
  initHeroParallax();
  initMagneticButtons();
  initVideoFallback();

});
