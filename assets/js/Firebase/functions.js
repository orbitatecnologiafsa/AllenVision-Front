
import { auth, db } from './firebase_config.js';
import { mostrarNotificacao } from '../addons/alerts.js';

export function createAccount(email, password, name) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
    
        const user = userCredential.user;
        
        return db.collection('users').doc(user.uid).set({
          name: name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        mostrarNotificacao('success', 'Conta criada com sucesso', 'Cadastro');
      })
      .catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
            mostrarNotificacao('error', 'Email ja em uso', 'Erro no Cadastro');
        }
        else if(error.code === 'auth/weak-password'){
            mostrarNotificacao('error', 'Senha muito fraca', 'Erro no Cadastro');
        }
        else if(error.code === 'auth/invalid-email'){
            mostrarNotificacao('error', 'Email invalido', 'Erro no Cadastro');
        }
      });
}

export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return true; 
    })
    .catch((error) => {
      mostrarNotificacao('error', error.message, 'Erro no Login');
      return false; 
    });
}
export function checkAuthStatus() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        window.location.href = '../../index.html';
      }
    });
  });
}

export function logout() {
    auth.signOut();
    window.location.href = '../../index.html';
}


export async function criarGrupoFirebase(doc_id, grupo_nome) {

    const user_db = db.collection('users').doc(doc_id).collection('grupo-camera');

    await user_db.add({
        nome: grupo_nome
    });
}
export async function criarCameraFirebase(doc_id, grupo_id, camera_nome, camera_ip) {
  
  try {
    const user_db = db.collection('users').doc(doc_id).collection('grupo-camera').doc(grupo_id);

    const nova_camera = {
        nome_camera: camera_nome,
        ip: camera_ip
    };
    let array_camera = [nova_camera]

    user_db.update({
      cameras: firebase.firestore.FieldValue.arrayUnion(nova_camera)
    }),{merge: true};

    console.log('Câmera adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar a câmera:', error);
    }
  
}
export async function PreencherGrupoFirebase(doc_id) {

    const user_db = db.collection('users').doc(doc_id).collection('grupo-camera');

    const grupo = await user_db.get();

    const grupo_data = []
    grupo.forEach(doc =>{
        grupo_data.push({
          id: doc.id,  // Para incluir o ID do documento, caso você queira
          data: doc.data()  // Adiciona os dados do documento
        });
    })

    return grupo_data
}
