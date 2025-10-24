// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
    } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
    }
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Smooth scroll with custom easing
  function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const navbarHeight = document.getElementById('navbar').offsetHeight; // get navbar height
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20; // 20px extra gap
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // ms
    let startTime = null;

    function easeOutQuint(t) {
      return 1 - Math.pow(1 - t, 5);
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeOutQuint(progress);

      window.scrollTo(0, startPosition + (distance * easeProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  } 

  
  // Close mobile menu and scroll to section when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close mobile menu if open
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      
      // Get target section ID
      const targetId = link.getAttribute('href').substring(1);
      
      // Special case for home/hero section
      if (targetId === 'home') {
        smoothScrollTo('home-section');
      } else {
        smoothScrollTo(targetId);
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'var(--card)';
      navbar.style.boxShadow = '0 4px 20px var(--shadow)';
    } else {
      navbar.style.background = 'var(--card)';
      navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    }
  });
  
  // Active link highlighting
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, .hero');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id') || 'home';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Typewriter effect with continuous loop
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const texts = [
    "Data Analyst",
    "Web Developer", 
    "Problem Solver",
    "Creative Thinker"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
    } else {
        // Typing text
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal speed when typing
    }
    
    // Check if current text is complete
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end before starting to delete
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next text after deleting
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before starting next text
    }
    
    setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Animated Background
function createAnimatedBackground() {
    const bgContainer = document.getElementById('animated-bg');
    const shapesCount = 15;
    
    for (let i = 0; i < shapesCount; i++) {
    const shape = document.createElement('div');
    shape.classList.add('bg-shape');
    
    // Random size
    const size = Math.random() * 200 + 50;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    
    // Random position
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay and duration
    shape.style.animationDelay = `${Math.random() * 20}s`;
    shape.style.animationDuration = `${Math.random() * 30 + 20}s`;
    
    bgContainer.appendChild(shape);
    }
}

// Interactive Skills Chart Animation
function animateSkillsChart() {
    const chartBars = document.querySelectorAll('.chart-fill');
    chartBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
        bar.style.width = `${width}%`;
    }, 300);
    });
}

// Project Modal
function initProjectModal() {
    const projectCards = document.querySelectorAll('.proj-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    // Project data
    const projects = {
    1: {
        title: "Project",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero, tempora sapiente maxime praesentium totam! Deleniti, fugit dolorem. Numquam iste, neque dolorem accusamus expedita ullam cumque ex explicabo enim quasi.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        github: "#"
    },
    2: {
        title: "Project",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero, tempora sapiente maxime praesentium totam! Deleniti, fugit dolorem. Numquam iste, neque dolorem accusamus expedita ullam cumque ex explicabo enim quasi.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        github: "#"
    },
    3: {
        title: "Project",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero, tempora sapiente maxime praesentium totam! Deleniti, fugit dolorem. Numquam iste, neque dolorem accusamus expedita ullam cumque ex explicabo enim quasi.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        github: "#"
    },
    4: {
        title: "Project",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero, tempora sapiente maxime praesentium totam! Deleniti, fugit dolorem. Numquam iste, neque dolorem accusamus expedita ullam cumque ex explicabo enim quasi.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        github: "#"
    },
    };
    
    projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-demo').href = project.demo;
        document.getElementById('modal-github').href = project.github;
        
        // Clear and add tech tags
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });
        
        modal.style.display = 'flex';
        }
    });
    });
    
    modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
    });
}

// Fade-in on scroll
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
    if(entry.isIntersecting){ 
        entry.target.classList.add('visible'); 
        
        // Animate skills chart when skills section is visible
        if(entry.target.classList.contains('skills')) {
        animateSkillsChart();
        }
    }
    });
}, {threshold:0.2});
document.querySelectorAll('[data-animate]').forEach(el=>observer.observe(el));

// Project Filtering with HTML, CSS, JavaScript filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active filter button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    // Filter projects based on technology
    projectCards.forEach(card => {
      const cardTypes = card.getAttribute('data-type').split(' ');
      
      if (filter === 'all' || cardTypes.includes(filter)) {
        card.style.display = 'block';
        // Add fade-in animation
        card.style.animation = 'fadeIn 0.5s ease-in';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Re-initialize slider after filtering
    setTimeout(() => {
      initializeSlider();
    }, 500);
  });
});

// Add fade-in animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100 + 100}%`;
    
    // Random animation delay and duration
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    
    particlesContainer.appendChild(particle);
    }
}

// === Project Slider (Fixed with Buttons + Swipe Support) ===
function initProjectSlider() {
  const slider = document.querySelector('.projects-grid');
  const nextBtn = document.querySelector('.slide-btn.next');
  const prevBtn = document.querySelector('.slide-btn.prev');

  if (!slider || !nextBtn || !prevBtn) return;

  let slideWidth = () => {
    const card = slider.querySelector('.proj-card');
    if (!card) return 300;
    const style = window.getComputedStyle(card);
    const gap = parseFloat(style.marginRight || 18);
    return card.offsetWidth + gap;
  };

  // --- Next / Prev Buttons ---
  nextBtn.addEventListener('click', () => {
    slider.scrollLeft += slideWidth();
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollLeft -= slideWidth();
  });

  // --- Mouse Drag Support ---
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  // --- Touch Swipe Support ---
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', e => {
    touchEndX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slider.scrollLeft += slideWidth();
      } else {
        slider.scrollLeft -= slideWidth();
      }
    }
  });

  // Optional: reset scroll position on window resize
  window.addEventListener('resize', () => {
    slider.scrollLeft = 0;
  });
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm.querySelector('.form-submit');
  const submitText = submitBtn.querySelector('.submit-text');
  const loadingSpinner = submitBtn.querySelector('.loading-spinner');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      // Reset button state
      submitText.style.display = 'inline-block';
      loadingSpinner.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    initTypewriter();
    createAnimatedBackground();
    createParticles();
    initProjectModal();
    initProjectSlider();
    initNavigation();
    initContactForm();
});