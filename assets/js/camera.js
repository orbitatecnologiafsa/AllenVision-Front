import { logout, checkAuthStatus } from './Firebase/functions.js';
import { mostrarNotificacao, confirmNotificacao, createGroup } from './addons/alerts.js';

checkAuthStatus();

// Logout

document.getElementById('logout').addEventListener('click',
    async (event) => {
        event.preventDefault();
        
        const confirm = await confirmNotificacao(
            'Você deseja deslogar?',
            'Deslogar',
            'Ok, você será redirecionado para a tela de login.',
            'Tudo bem.'
        )
        if(confirm){
            logout();
        }
    }
);

//Criar grupo

document.getElementById('create-group').addEventListener('click', async (event) => {

    const group_name = createGroup();
    
    console.log(group_name)
});