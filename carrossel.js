var slides;
var indicators;
let currentSlide = 0;

window.addEventListener('load', function() {
    slides = document.querySelectorAll('.carousel-image');
    indicators = document.querySelectorAll('.carousel-indicator');
  });


function nextSlide() {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function prevSlide() {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(slide) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = slide;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

