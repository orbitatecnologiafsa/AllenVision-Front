
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
    const { value: groupName } = await Swal.fire({
        title: 'Cadastrar Grupo',
        input: 'text',  // Campo para o nome do grupo
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

    if (groupName) {
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

export { mostrarNotificacao, confirmNotificacao, createGroup };