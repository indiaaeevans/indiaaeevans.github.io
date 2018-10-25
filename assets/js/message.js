let wordElement = document.getElementById("word");
const adjectives = ['cool', 'exceptional', 'authentic', 'effective', 'impactful', 'functional', 'valuable', 'useful', 'inspiring', 'brilliant', 'wonderful', 'amazing', 'stunning', 'staggering', 'impressive', 'mind-boggling', 'weird', 'mind-blowing', 'jaw-dropping', 'excellent', 'marvelous', 'inventive', 'imaginative', 'innovative', 'experimental', 'expressive', 'challenging', 'visionary', 'clever', 'resourceful', 'helpful', 'constructive', 'colorful', 'interesting', 'different'];
const numberOfAdj = adjectives.length;

setInterval(() => {
    let randomNumber = Math.floor((Math.random() * numberOfAdj));
    wordElement.textContent = adjectives[randomNumber];
}, 2 * 1000);