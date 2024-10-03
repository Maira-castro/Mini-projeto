function abrirModal() {
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal() {
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefas(res);
        })
}buscarTarefas();

function inserirTarefas(listaDeTarefas) { //Pegar o que está no api.json e mostra no navegador
    if (listaDeTarefas.length > 0) {
        lista.innerHTML = ""
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
                     <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                    <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                    </div>
                </li>
               `;
        })
    }
}


function novaTarefa(){ //adicionar no api.json
    event.preventDefault();//tirar os comportamentos por padrão e fazer alguma coisa ANTES
    let tarefa = {
        titulo: titulo.value, //ja tem uma variavel titulo
        descricao: descricao.value

    }
    fetch("http://localhost:3000/tarefas",{method:"POST", //o fetch ele é GET por padrão,so é preciso fazer essas indentificaçao quando for usar um dos OUTROS metodos
        headers:{
            "Content-type":"application/json"//cabeçalho da informação
        },
        body: JSON.stringify(tarefa)//vai pegar o objeto e transforma em hipertexto, pois é em hipertexto que os objetos trafegam na rede
    })
    .then(res => res.json())
    .then(res=>{
        fecharModal();
        buscarTarefas();//listar as tarefas
        let form = document.querySelector("#criartarefa form");//serve de referencia para apagar os campos depois de adicionar a tarefa
        form.reset();//pega o form e reseta
        
    })
}

function deletarTarefa(id){
    fetch(`http://localhost:3000/tarefas/${id}`,{
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        alert("tarefa deletada");
        buscarTarefas();
    })
}

function pesquisarTarefas(){
    let lis = document.querySelectorAll("ul li");//lis é referente as li da lista de tarefas 
    if(busca.value.length > 0){
     lis.forEach(li => {
        if(!li.children[0].innerText.includes(busca.value)){
            li.classList.add('oculto');
        }else{
            li.classList.remove('oculto');
        }
     })
     
    }else{
        lis.forEach(li => {
            li.classList.remove('oculto');
        }) 
    }
}