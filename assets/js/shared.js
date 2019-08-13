const nav = document.getElementsByTagName('nav')[0];
const navButton = document.getElementsByClassName('nav-logo-wrapper')[0];
const navLinks = document.querySelectorAll('nav > a');
let navVisible = false;
displayNav();
function changeOpacity(element, amount) {
  element.style.opacity = amount;
}
function scrollToTop() {
  window.scrollTo(0, 0);
}
function displayNav() {
  if (!navVisible) {
    setTimeout(() => {
      nav.classList.add('light-background', 'bottom-shadow');
    }, 250);

    navLinks.forEach((element, index) => {
      setTimeout(() => {
        changeOpacity(element, 1);
      }, 250 * index);
    });
    navVisible = true;
  } else {
    nav.classList.remove('light-background', 'bottom-shadow');
    navLinks.forEach(element => {
      changeOpacity(element, 0);
    });
    navVisible = false;
  }
}
function throttled(delay, fn) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}
