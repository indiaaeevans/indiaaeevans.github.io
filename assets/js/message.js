const wordElement = document.getElementById('word');
const adjectives = [
  'cool',
  'exceptional',
  'authentic',
  'effective',
  'impactful',
  'functional',
  'valuable',
  'useful',
  'inspiring',
  'brilliant',
  'wonderful',
  'amazing',
  'stunning',
  'staggering',
  'impressive',
  'mind-boggling',
  'weird',
  'mind-blowing',
  'jaw-dropping',
  'excellent',
  'marvelous',
  'inventive',
  'imaginative',
  'innovative',
  'experimental',
  'expressive',
  'challenging',
  'visionary',
  'clever',
  'resourceful',
  'helpful',
  'constructive',
  'colorful',
  'interesting',
  'different'
];
let adjectivesCopy = adjectives.slice();
function resetList() {
  adjectivesCopy = adjectives.slice();
}
// const numberOfAdj = adjectives.length;
// 2s - track out
// change word
// track in 2s
// 2s - track out

setInterval(() => {
  const numberOfAdj = adjectivesCopy.length;
  const randomNumber = Math.floor(Math.random() * numberOfAdj);
  // wordElement.classList.remove('track-out');

  if (numberOfAdj === 0) {
    resetList();
  }
  wordElement.textContent = adjectivesCopy[randomNumber];
  wordElement.classList.add('track-in');

  adjectivesCopy.splice(randomNumber, 1);
}, 3000);
setTimeout(() => {
  setInterval(() => {
    wordElement.classList.remove('track-in');
    // wordElement.classList.add('track-out');
  }, 3000);
}, 1000);
