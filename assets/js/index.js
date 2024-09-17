import {createAccount, login } from './Firebase/functions.js';


const container = document.getElementById('container');
const signUpButton = document.querySelector('.overlay-right button');
const signInButton = document.querySelector('.overlay-left button');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


// Login
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    const result = await login(email, password);
    if(result){
        window.location.href = './assets/pages/cameras.html';
    }
    
})

// Cadastro
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email-create').value;
    const password = document.getElementById('password-create').value;
    const nome = document.getElementById('name-create').value;

    try{
        const result = createAccount(email, password, nome);
        if(result){
            
            window.location.href = './assets/pages/cameras.html';
        }
    }catch(error){
        mostrarNotificacao('error', error.message, 'Erro no Cadastro');
    }
})
