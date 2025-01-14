const navLinks = document.querySelectorAll('nav > .menu-item');
const main = document.querySelector('main');
displayNavLinks();
setTimeout(displayMain, 750);

function changeOpacity(element, amount) {
  element.style.opacity = amount;
}
function scrollToTop() {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
}
function displayNavLinks() {
  navLinks.forEach((element, index) => {
    setTimeout(() => {
      changeOpacity(element, 1);
    }, 250 * index);
  });
}
function displayMain() {
  changeOpacity(main, 1);
}
