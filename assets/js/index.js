const container = document.getElementById('container');
const signUpButton = document.querySelector('.overlay-right button');
const signInButton = document.querySelector('.overlay-left button');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
