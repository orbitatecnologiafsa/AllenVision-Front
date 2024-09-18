import { logout, checkAuthStatus, criarGrupoFirebase, PreencherGrupoFirebase, criarCameraFirebase } from './Firebase/functions.js';
import { db } from './Firebase/firebase_config.js';
import { createCamera, confirmNotificacao, createGroup } from './addons/alerts.js';

const uid = await checkAuthStatus();

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

    event.stopPropagation();
    const group_name = await createGroup();

    if (group_name == null) {
        return;
    }
    await criarGrupoFirebase(uid, group_name);
});


db.collection('users').doc(uid).collection('grupo-camera').onSnapshot((snapshot) => {
    // Atualiza a UI com base nas mudanças
    PreencherGruposUl();
}, (error) => {
    console.error('Erro ao escutar mudanças no documento:', error);
});



//Preencher grupos 

async function PreencherGruposUl() {
    const ul = document.getElementById('my-group-ul');
    ul.innerHTML = '';  // Limpa a lista antes de preenchê-la

    // Obtém os dados do grupo para o usuário específico
    const group_data = await PreencherGrupoFirebase(uid);

    group_data.forEach(group => {
        const li = document.createElement('li');
        li.setAttribute('class', 'my-group-li');
        li.setAttribute('id', group.id);

        let camerasHtml = '';
        if (group.data.cameras && group.data.cameras.length > 0) {
            group.data.cameras.forEach(camera => {
                camerasHtml += `
                    <li>
                        <span class="status-dot green"></span>
                        <p>${camera.nome_camera}</p>
                    </li>
                `;
            });
        } else {
            camerasHtml = `<li><p>Sem câmeras cadastradas</p></li>`;
        }

        li.innerHTML = `
            <div class="group-toggle">
                <div>
                    <i class="fa-light fa-angle-right toggle-arrow"></i>
                    <p>${group.data.nome}</p> <!-- Nome do grupo -->
                </div>
                <i class="fa-light fa-camera-cctv camera-icon" id="${group.id}"></i>
            </div>
            <ul class="group-camera-ul">
                ${camerasHtml} <!-- Lista as câmeras com os nomes -->
            </ul>
        `;

        ul.appendChild(li);
    });

    // Reaplicar eventos após atualizar a lista
    document.querySelectorAll('.camera-icon').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            const id = icon.getAttribute('id');
            criarCamera(id);
        });
    });

    document.querySelectorAll('.group-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrowIcon = this.querySelector('.toggle-arrow');

            content.classList.toggle('show');
            arrowIcon.classList.toggle('rotate');
        });
    });
}


async function criarCamera(id) {
    
    const camera_data = await createCamera();

    console.log(camera_data);

    await criarCameraFirebase(uid,id,camera_data.nome_camera,camera_data.ip)
}


