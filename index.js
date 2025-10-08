const highestScore = document.querySelector('.highest-score')
const highestScoreSpan = document.querySelector('.highest-score span')

if (JSON.parse(localStorage.getItem('highestScore')) != null) {
    highestScoreSpan.textContent = localStorage.getItem('highestScore');
    highestScore.classList.add('visible');
} else {
    highestScoreSpan.textContent = 0;
    highestScore.classList.remove('visible');
}