/*---carrossel---*/

const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showSlide(index) {
  if (index >= slides.length) {
    current = 0;
  } else if (index < 0) {
    current = slides.length - 1;
  } else {
    current = index;
  }
  const offset = -current * 100; // cada slide ocupa 100% da largura
  document.querySelector('.carousel-slides').style.transform = `translateX(${offset}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

nextBtn.addEventListener('click', () => {
  showSlide(current + 1);
});
prevBtn.addEventListener('click', () => {
  showSlide(current - 1);
});

// autoplay opcional
setInterval(() => {
  showSlide(current + 1);
}, 7000); // muda a cada x segundos