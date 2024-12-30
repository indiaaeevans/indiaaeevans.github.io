const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav > .menu-item');
const main = document.querySelector('main');
let navVisible = false;
displayNav();
setTimeout(() => changeOpacity(main, 1), 750);

function changeOpacity(element, amount) {
  element.style.opacity = amount;
}
function scrollToTop() {
  window.scrollTo(0, 0);
}
// TODO refactor
// TODO only fade in nav when navigating from landing page
function displayNav() {
  if (!navVisible) {
    // setTimeout(() => {
    //   nav.classList.add('nav-background');
    // }, 250);

    navLinks.forEach((element, index) => {
      setTimeout(() => {
        changeOpacity(element, 1);
      }, 250 * index);
    });
    navVisible = true;
  } else {
    // nav.classList.remove('nav-background');
    navLinks.forEach(element => {
      changeOpacity(element, 0);
    });
    navVisible = false;
  }
}
