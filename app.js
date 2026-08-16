const toggle = document.querySelector('.menu-toggle');
const toggleIcon = toggle.querySelector('i');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li a');
const navbar = document.querySelector('.navbar');

// Toggle menu
toggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  toggleIcon.classList.toggle('fa-bars');
  toggleIcon.classList.toggle('fa-xmark');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    toggleIcon.classList.add('fa-bars');
    toggleIcon.classList.remove('fa-xmark');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});




// Contact Form 

const scriptURL = "https://script.google.com/macros/s/AKfycbzMvbs1dQU0LhnRVLUx078guYDDQ-mY-hFZOxGQW7yWlaEDuK_pY7tW_cWR15REIN13/exec";

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Sending...";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      if (response.ok) {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Something went wrong. Try again.";
      }
    })
    .catch((error) => {
      console.error("Error!", error.message);
      status.textContent = "⚠️ Error sending message.";
    });
});



  // Scroll Animation 

  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
