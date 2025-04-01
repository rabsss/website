// Dark/Light Mode Toggle with improved icon transition
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Smooth icon transition
    gsap.to(themeToggle, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
      }
    });
  });

  // Initialize theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

// Enhanced Custom Cursor with different states
const cursor = document.querySelector(".custom-cursor");
if (cursor) {
  const cursorCircle = cursor.querySelector(".cursor-circle");
  const cursorDot = cursor.querySelector(".cursor-dot");
  const cursorText = cursor.querySelector(".cursor-text");

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let scale = 1;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${scale})`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor states
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorCircle.style.transform = "scale(0.5)";
      cursorDot.style.opacity = "0";
    });
    el.addEventListener("mouseleave", () => {
      cursorCircle.style.transform = "scale(1)";
      cursorDot.style.opacity = "1";
    });
  });

  document.querySelectorAll(".project-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorText.textContent = "View";
      cursorText.style.opacity = "1";
      scale = 1.5;
    });
    el.addEventListener("mouseleave", () => {
      cursorText.style.opacity = "0";
      scale = 1;
    });
  });
}

// Enhanced Typewriter Effect with multiple lines
class Typewriter {
  constructor(element, words) {
    this.element = element;
    this.words = words;
    this.index = 0;
    this.text = "";
    this.isDeleting = false;
    this.type();
    this.lineCount = 0;
    this.maxLines = 2; // Show 2 lines like the reference site
  }

  type() {
    const currentWord = this.words[this.index % this.words.length];
    const speed = this.isDeleting ? 30 : 100;

    this.text = this.isDeleting 
      ? currentWord.substring(0, this.text.length - 1)
      : currentWord.substring(0, this.text.length + 1);

    this.element.textContent = this.text;

    if (!this.isDeleting && this.text === currentWord) {
      this.isDeleting = true;
      setTimeout(() => this.type(), 1000);
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.index++;
      if (this.lineCount < this.maxLines - 1) {
        this.element.innerHTML += "<br>";
        this.lineCount++;
      } else {
        this.element.innerHTML = "";
        this.lineCount = 0;
      }
      setTimeout(() => this.type(), 500);
    } else {
      setTimeout(() => this.type(), speed);
    }
  }
}

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter
  const typewriterElement = document.querySelector(".typewriter");
  if (typewriterElement) {
    const words = JSON.parse(typewriterElement.getAttribute("data-words"));
    new Typewriter(typewriterElement, words);
  }

  // GSAP Animations - More sophisticated like reference site
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from("nav", { 
      opacity: 0, 
      y: -50, 
      duration: 1, 
      ease: "power3.out" 
    });

    // Hero content animation - more dynamic
    gsap.from(".hero-content h1", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "back.out(1.7)"
    });
    gsap.from(".hero-content p", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6,
      ease: "power2.out"
    });
    gsap.from(".hero-social a", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.9,
      stagger: 0.1,
      ease: "power2.out"
    });
    gsap.from(".hero-buttons", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.out"
    });

    // Section animations with parallax effects
    gsap.utils.toArray("section").forEach((section, i) => {
      const bg = section.querySelector(".section-bg");
      if (bg) {
        gsap.from(bg, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          y: 100,
          ease: "none"
        });
      }

      gsap.from(section.querySelectorAll(".section-header"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        delay: i * 0.1
      });

      gsap.from(section.querySelectorAll(".glass-card"), {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: i * 0.1 + 0.2
      });
    });

    // Skills animation - radial progress like reference site
    gsap.utils.toArray(".skill-radial").forEach(skill => {
      const percent = skill.dataset.percent;
      const circle = skill.querySelector(".skill-progress");
      const circumference = 2 * Math.PI * 40;
      const offset = circumference - (percent / 100) * circumference;
      
      gsap.from(circle, {
        scrollTrigger: {
          trigger: skill,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        strokeDashoffset: circumference,
        strokeDasharray: circumference,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function() {
          circle.style.strokeDashoffset = this.progress() * offset;
        }
      });
    });
  }

  // Enhanced Mobile Menu with animation
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-links");

  if (menuToggle && navList) {
    function toggleMenu() {
      const isOpen = navList.classList.contains("active");
      
      if (isOpen) {
        gsap.to(navList.querySelectorAll("li"), {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            navList.classList.remove("active");
          }
        });
      } else {
        navList.classList.add("active");
        gsap.from(navList.querySelectorAll("li"), {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
      
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    }

    function handleResize() {
      if (window.innerWidth > 768) {
        navList.classList.remove("active");
        navList.style.display = "";
      } else {
        navList.style.display = "none";
      }
    }

    menuToggle.addEventListener("click", toggleMenu);
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  // Contact Form with validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitBtn = this.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual fetch)
      setTimeout(() => {
        // Success animation
        gsap.to(this, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            this.innerHTML = `
              <div class="form-success">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            `;
            gsap.from(this.querySelector(".form-success"), {
              opacity: 0,
              y: 20,
              duration: 0.5
            });
          }
        });
      }, 1500);
    });
  }

  // Leaflet Map with custom styling
  function initMap() {
    if (typeof L !== "undefined") {
      const map = L.map('location-map', {
        zoomControl: false,
        attributionControl: false
      }).setView([27.8619, 83.5443], 15);
      
      // Custom tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom marker
      const myIcon = L.divIcon({
        className: 'map-marker',
        html: '<i class="fas fa-map-marker-alt"></i>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });
      
      L.marker([27.8619, 83.5443], {icon: myIcon}).addTo(map)
        .bindPopup('<div class="map-popup"><b>Tansen, Palpa</b><br>My Location</div>')
        .openPopup();

      // Custom zoom controls
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);
    }
  }

  // Load Leaflet only if map element exists
  if (document.getElementById("location-map")) {
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);
    
    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.onload = initMap;
    document.body.appendChild(leafletJS);
  }

  // Experience timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (timelineItems.length > 0) {
    gsap.from(timelineItems, {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 70%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

  // Project hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(card, {
        x: (x - rect.width/2) / 20,
        y: (y - rect.height/2) / 20,
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });
});

// Utility function for scroll animations
function animateOnScroll(elements, options = {}) {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
    start: "top 80%"
  };
  
  const settings = {...defaults, ...options};
  
  gsap.from(elements, {
    scrollTrigger: {
      trigger: elements[0].parentElement,
      start: settings.start,
      toggleActions: "play none none none"
    },
    y: settings.y,
    opacity: settings.opacity,
    duration: settings.duration,
    stagger: settings.stagger,
    ease: settings.ease
  });
}