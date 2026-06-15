let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let carousel = document.querySelector('.carousel')
let list = carousel.querySelector('.list')
let items = carousel.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let indicatorList = indicator.querySelector('ul')
let dots = null

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

function createDots() {
  indicatorList.innerHTML = ''
  items.forEach((_, index) => {
    let dot = document.createElement('li')
    if (index === 0) dot.classList.add('active')
    indicatorList.appendChild(dot)
  })
  dots = indicatorList.querySelectorAll('li')
}

createDots()

function setSlider() {
  let itemOld = carousel.querySelector('.list .item.active')
  itemOld.classList.remove('active')

  let dotsOld = indicator.querySelector('ul li.active')
  dotsOld.classList.remove('active')
  dots[active].classList.add('active')
}

nextButton.onclick = () => {
  list.style.setProperty('--calculation', 1)

  active = active + 1 > lastPosition ? 0 : active + 1
  setSlider()
  items[active].classList.add('active')
}

prevButton.onclick = () => {
  list.style.setProperty('--calculation', -1)

  active = active - 1 < firstPosition ? lastPosition : active - 1
  setSlider()
  items[active].classList.add('active')
}

const user = JSON.parse(
  localStorage.getItem("akindoUser")
);

if (user) {
  console.log("Usuário logado:", user);
}