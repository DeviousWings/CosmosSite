// public/scripts/roverSlideshow.js
let currentIndex = 0;
let autoSlide;
const delay = 10000;
const resetDelay = 10000;

function showSlide(index) {
  const slides = document.querySelectorAll(".rover-slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  const slides = document.querySelectorAll(".rover-slide");
  showSlide((currentIndex + 1) % slides.length);
}

function prevSlide() {
  const slides = document.querySelectorAll(".rover-slide");
  showSlide((currentIndex - 1 + slides.length) % slides.length);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, delay);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  setTimeout(startAutoSlide, resetDelay);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nextRover").addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  document.getElementById("prevRover").addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  startAutoSlide();
});
