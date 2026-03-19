/* ============================================
   WebCraft - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  // ========== MOBILE MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (!target) return;

      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => scrollObserver.observe(el));

  // ========== FAQ ACCORDION ==========
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(faq => faq.classList.remove('active'));

      // Open clicked one (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || 'Not provided';
    const business = formData.get('business') || 'Not specified';
    const message = formData.get('message') || 'No additional details';

    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `🌐 *New Website Enquiry*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `🏢 *Business:* ${business}\n` +
      `💬 *Message:* ${message}`
    );

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/919999999999?text=${whatsappMessage}`, '_blank');

    // Show success feedback
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Sent! Opening WhatsApp...';
    btn.style.background = 'linear-gradient(135deg, #10B981, #06B6D4)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;

    const solutionBox = document.querySelector('.solution-box');
    if (!solutionBox) return;

    const rect = solutionBox.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;

      counters.forEach(counter => {
        const text = counter.textContent;
        const numMatch = text.match(/(\d+)/);
        if (!numMatch) return;

        const target = parseInt(numMatch[1]);
        const suffix = text.replace(numMatch[0], '');
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 1500;
        const stepTime = duration / (target / increment);

        const updateCounter = () => {
          current += increment;
          if (current >= target) {
            counter.textContent = text;
            return;
          }
          counter.textContent = current + suffix;
          setTimeout(updateCounter, stepTime);
        };

        updateCounter();
      });
    }
  };

  window.addEventListener('scroll', animateCounters, { passive: true });

  // ========== PARALLAX SUBTLE EFFECT ON HERO ==========
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      hero.style.backgroundPositionY = `${offset}px`;
    }
  }, { passive: true });

});
