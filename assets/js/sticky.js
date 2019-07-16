window.onscroll = function() {
  toggleStickyNav();
};

var nav = document.getElementsByTagName('nav')[0];
var sticky = nav.offsetTop;

function toggleStickyNav() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add('sticky', 'bottom-shadow');
  } else {
    nav.classList.remove('sticky', 'bottom-shadow');
  }
}
