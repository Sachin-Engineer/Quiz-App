const percentageDiv = document.querySelector('.percentage')
const comments = document.querySelector('.comments')
const AttemptedQuestionSpan = document.querySelector('.attempted-questions span')
const circle = document.querySelector('circle');

let percentageCounter = JSON.parse(localStorage.getItem('correct')) / 10 * 100;
percentageDiv.textContent = `${percentageCounter}%`;
let counter = 0;
setInterval(() => {
  if (counter == percentageCounter) {
    clearInterval();
  } else {
    counter++;
    percentageDiv.textContent = `${counter}%`;
  }
}, 15);

AttemptedQuestionSpan.textContent = localStorage.getItem('correct');

if (percentageCounter == 100) {
  comments.textContent = `You got it all right! Way to gooooo!!!!`;
} else if (percentageCounter >= 80) {
  comments.textContent = "Well Well..., you did great!";
} else if (percentageCounter >= 50) {
  comments.textContent = "You're doing good!, Keep Improving!!";
} else if (percentageCounter > 20) {
  comments.textContent = "You need to study more!";
} else {
  comments.textContent = "You need to study hard! You're dumb AF!";
}


function replaceKeyframes(newOffset, styleAnimationTime) {
  // Remove existing keyframes (optional, if needed)
  const existingStyle = document.getElementById('dynamic-keyframes-&-animation-time');
  if (existingStyle) existingStyle.remove();

  // Create a new style element
  const style = document.createElement('style');

  style.id = 'dynamic-keyframes-&-animation-time';
  style.innerHTML = `
        circle {
            fill: none;
            stroke: url(#GradientColor);
            stroke-width: 25px;
            stroke-dasharray: 545;
            stroke-dashoffset: 545;
            animation: animateCircle ${styleAnimationTime}ms linear forwards;
        }
        @keyframes animateCircle {
            100% {
                stroke-dashoffset: ${newOffset};
            }
        }
    `;

  styleAnimationTime.id = 'dynamic-animation-time';



  // Append the new style to the document head
  document.head.appendChild(style);
}

// Example: Replace the keyframes with a new stroke-dashoffset value
replaceKeyframes((545 - (545 * percentageCounter) / 100), ((1500 * percentageCounter) / 100));