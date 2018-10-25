function PortfolioItem(name, image, git, about, demo) {
    this.name = name,
    this.image = image,
    this.git = git,
    this.about = about,
    this.demo = demo
}

let portfolio = [
    new PortfolioItem('Stir & Shake', 'assets/images/portfolio-images/ss-recipe.png', 'https://github.com/indiaaeevans/recipe-app', '','https://indiaaeevans.github.io/stir-shake/'),
    new PortfolioItem('Teacher\'s Pet', 'assets/images/portfolio-images/teacherpet.png', 'https://github.com/indiaaeevans/TeachersPet', '', 'https://official-teacherspet.herokuapp.com/'),
    new PortfolioItem('Color Theory', 'assets/images/portfolio-images/color.png', 'https://github.com/indiaaeevans/TriviaGame', '', 'https://indiaaeevans.github.io/TriviaGame/'),
    new PortfolioItem('SafeKeeper', 'assets/images/portfolio-images/sk-login.png', 'https://github.com/indiaaeevans/Virtual-Locker', '', 'https://safe-stream-99507.herokuapp.com/'),
    new PortfolioItem('Gif Generator', 'assets/images/portfolio-images/gif-generator.png', 'https://github.com/indiaaeevans/gif-generator', 'https://indiaaeevans.github.io/gif-generator/'),
    new PortfolioItem('Hangman', 'assets/images/portfolio-images/hangman-2.png', 'https://github.com/indiaaeevans/Hangman-Game', 'https://indiaaeevans.github.io/Hangman-Game/')
];

var portfolioSection = document.getElementsByClassName('portfolio-section')[0];
var portfolioItem = document.createElement("div");
portfolioItem.setAttributeNode

portfolio.forEach(item => {
    
});

