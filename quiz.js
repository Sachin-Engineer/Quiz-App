import { data } from './data.js';

const nextBtn = document.querySelector('.next-btn a')
const updatingQuizContainer = document.querySelector('.updating-quiz-container')
const secondIcon = document.querySelector('.second-icon')
const thirdIcon = document.querySelector('.third-icon')
// const innerOptionContainer = document.querySelector('.inner-option-container')

let correctAnswer = 0;
localStorage.removeItem('correct');

const correctAudio = new Audio('/audio/correct.mp3');
const wrongAudio = new Audio('/audio/incorrect.mp3');

let questionNumber = 1;
let interval;
renderQuiz();

nextBtn.addEventListener('click', (e) => {
    clearInterval(interval);
    questionNumber++
    if (questionNumber < 10) {
        renderQuiz();
        e.preventDefault();
    } else if (questionNumber == 10) {
        nextBtn.href = '/result.html';
        renderQuiz();
        e.preventDefault();
    } else {
        clearInterval(interval);
        if (correctAnswer == 0) {
            localStorage.setItem('correct', correctAnswer);
        }
        if (JSON.parse(localStorage.getItem('highestScore')) <= correctAnswer) {
            localStorage.setItem('highestScore', correctAnswer);
        }
        nextBtn.href = '/result.html';
        return;
    }
})

function renderQuiz() {
    let countDown = 30;
    updatingQuizContainer.innerHTML = `
        <div class="ques-no"><span>${questionNumber} / 10</span></div>

        <div class="question-container">
            <div class="inner-question-container">${data[questionNumber - 1].question}</div>
        </div>

        <div class="timeout"><span class="time-left">00 : <span>${countDown}</span></span></div>

        <div class="option-container">
            <div class="inner-option-container">
                <div class="option option1">${data[questionNumber - 1].option1} <p><span></span><img class="wrong-icon" src="/images/wrong.png" alt=""><img class="right-icon" src="/images/right.png" alt=""></p></div>
                <div class="option option2">${data[questionNumber - 1].option2} <p><span></span><img class="wrong-icon" src="/images/wrong.png" alt=""><img class="right-icon" src="/images/right.png" alt=""></p></div>
                <div class="option option3">${data[questionNumber - 1].option3} <p><span></span><img class="wrong-icon" src="/images/wrong.png" alt=""><img class="right-icon" src="/images/right.png" alt=""></p></div>
                <div class="option option4">${data[questionNumber - 1].option4} <p><span></span><img class="wrong-icon" src="/images/wrong.png" alt=""><img class="right-icon" src="/images/right.png" alt=""></p></div>
            </div>
        </div>
    `;

    // Define timeLeftSpan after the DOM update
    const timeLeft = document.querySelector('.time-left');
    const timeLeftSpan = document.querySelector('.time-left span');
    const wrapper = document.querySelector('#wrapper');

    wrapper.classList.remove('yellow-bg')
    wrapper.classList.remove('red-bg')
    nextBtn.classList.remove('yellow-text')
    nextBtn.classList.remove('red-text')

    interval = setInterval(() => {
        countDown--;
        timeLeftSpan.textContent = countDown < 10 ? `0${countDown}` : countDown;
        if (countDown == 19) {
            wrapper.classList.add('yellow-bg');
            timeLeft.classList.add('yellow-timeout-bg');
            nextBtn.classList.add('yellow-text');
        } else if (countDown == 9) {
            wrapper.classList.add('red-bg');
            timeLeft.classList.add('red-timeout-bg');
            nextBtn.classList.add('red-text');
        } else if (countDown == 0) {
            clearInterval(interval);
            if (questionNumber == 10) {
                nextBtn.click(); // Automatically click the next button
            } else {
                questionNumber++;
                renderQuiz();
            }
        }
    }, 1000);

    const innerOptionContainer = document.querySelector('.inner-option-container');
    const innerOptionContainerAllDiv = document.querySelectorAll('.inner-option-container div');

    let validateOption = false;
    innerOptionContainer.addEventListener('click', (e) => {
        if (e.target != innerOptionContainer && validateOption == false) {
            validateOption = true;
            innerOptionContainerAllDiv.forEach((div) => {
                div.classList.remove('active');
            });

            e.target.classList.add('active');
            if (e.target.classList.contains(`${data[questionNumber - 1].correct}`)) {
                correctAnswer++;
                localStorage.setItem('correct', correctAnswer);
                e.target.classList.add('green');
                const rightIcon = e.target.querySelector('.right-icon');
                const youChooseText = e.target.querySelector('span');
                if (rightIcon) {
                    correctAudio.play();
                    rightIcon.classList.add('visible');
                    youChooseText.textContent = 'You Choose';
                }
            } else {
                e.target.classList.add('red');
                const wrongIcon = e.target.querySelector('.wrong-icon');
                const youChooseText = e.target.querySelector('span');
                if (wrongIcon) {
                    wrongAudio.volume = 0.1;
                    wrongAudio.play();
                    wrongIcon.classList.add('visible');
                    youChooseText.textContent = 'You Choose';
                }

                innerOptionContainerAllDiv.forEach((div) => {
                    if (div.classList.contains(`${data[questionNumber - 1].correct}`)) {
                        div.classList.add('green');
                        const correctRightIcon = div.querySelector('.right-icon');
                        if (correctRightIcon) {
                            correctRightIcon.classList.add('visible');
                        }
                    }
                });
            }
        }
    });
}

secondIcon.addEventListener('click', () => {
    secondIcon.classList.add('fa-shake');
    setTimeout(() => {
        correctAudio.muted = true;
        wrongAudio.muted = true;
        secondIcon.classList.remove('fa-shake');
        secondIcon.classList.add('hidden');
        thirdIcon.classList.add('visible');
    }, 500);
})

thirdIcon.addEventListener('click', () => {
    thirdIcon.classList.add('fa-shake');
    setTimeout(() => {
        correctAudio.muted = false;
        wrongAudio.muted = false;
        thirdIcon.classList.remove('fa-shake');
        thirdIcon.classList.remove('visible');
        secondIcon.classList.remove('hidden');
    }, 500);
})