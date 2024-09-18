
function mostrarNotificacao(tipo, mensagem, titulo) {
    Swal.fire({
        title: titulo,
        text: mensagem,
        icon: tipo,
        confirmButtonText: 'OK'
    });
}
async function confirmNotificacao(mensagem,titulo,aprovado,negado) {
    const result = await Swal.fire({
        title: titulo,
        text: mensagem,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    })

    if (result.isConfirmed) {
        await Swal.fire({
            title: 'Aprovado!',
            text: aprovado,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        return true;
    } else {
        await Swal.fire({
            title: 'Cancelado',
            text: negado,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    }
}
async function createGroup() {
    const result = await Swal.fire({
        title: 'Cadastrar Grupo',
        input: 'text', 
        inputPlaceholder: 'Digite o nome do grupo',
        showCancelButton: true,
        confirmButtonText: 'Cadastrar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, insira o nome do grupo!';
            }
        }
    });

    if (result.isConfirmed && result.value) {
        const groupName = result.value;
        await Swal.fire({
            title: 'Grupo Cadastrado!',
            text: `O grupo "${groupName}" foi criado com sucesso.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        return groupName; 
    } else {
        await Swal.fire({
            title: 'Cadastro Cancelado',
            text: 'O grupo não foi cadastrado.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return null;  
    }
}

async function createCamera() {
    const { value: formValues } = await Swal.fire({
        title: 'Cadastrar Câmera',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Digite o IP da câmera">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Digite o nome da câmera">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Cadastrar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ];
        },
        inputValidator: (value) => {
            if (!value[0]) {
                return 'Por favor, insira o IP da câmera!';
            }
            if (!value[1]) {
                return 'Por favor, insira o nome da câmera!';
            }
        }
    });

    if (formValues) {
        const ip = formValues[0];
        const nomeCamera = formValues[1];
        // Aqui você pode utilizar os valores inseridos (IP e nome da câmera)
        console.log('IP:', ip);
        console.log('Nome da Câmera:', nomeCamera);
        // Adicione aqui o código para enviar os dados para onde você precisa

        Swal.fire({
            title: 'Câmera Cadastrada!',
            text: `A câmera "${nomeCamera}" foi criada com sucesso.`,
            icon: 'success',
            confirmButtonText: 'OK'
        })
        const camera_data = {
            nome_camera: nomeCamera,
            ip: ip
        }

        return camera_data;
    }
    else{
        Swal.fire({
            title: 'Cadastro Cancelado',
            text: 'A câmera não foi criada.',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}
export { mostrarNotificacao, confirmNotificacao, createGroup, createCamera };