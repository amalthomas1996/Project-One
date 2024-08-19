// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.navbar .mobile-menu-toggle');
  const mobileMenu = document.querySelector('.navbar .mobile-menu-items');

  toggleButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
  });
});

// Change navbar background on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');

  if (window.scrollY > 0) {
    navbar.classList.add('navbar-scroll');
  } else {
    navbar.classList.remove('navbar-scroll');
  }
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", handleSubmit);
});

//form

function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = document.getElementById("contactForm");
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!message) {
    alert("Please enter your message.");
    return;
  }

  const formData = new FormData(form);

  fetch("https://formspree.io/f/mkgwrdeq", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        form.reset(); // Clear the form
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message.");
      }
    })
    .catch(error => {
      alert("Error sending message: " + error.message);
    });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}



//slider
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const slideWidth = slides[0].offsetWidth;

function updateSlider() {
  const slideWidth = slides[0].offsetWidth;
  const offset = -currentIndex * slideWidth;
  slider.style.transform = `translateX(${offset}px)`;
}

function moveSlide(step) {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 600) {
    // Show one slide at a time on small screens
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    updateSlider();

    // Handle looping
    if (currentIndex === 0 || currentIndex === totalSlides - 1) {
      setTimeout(() => {
        slider.style.transition = 'none';
        if (currentIndex === 0) {
          slider.style.transform = `translateX(0)`;
          currentIndex = 1;
        } else if (currentIndex === totalSlides - 1) {
          slider.style.transform = `translateX(-${(totalSlides - 1) * slideWidth}px)`;
          currentIndex = totalSlides - 2;
        }
        updateSlider();
        slider.style.transition = 'transform 0.5s ease-in-out';
      }, 500);
    }
  } else {
    // Adjust for larger screens if needed
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    updateSlider();
  }
}

document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
