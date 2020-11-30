let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
//array auxiliar para excluir as tarefas
let excluirTarefa = []

atualizaLista()

function atualizaLista() {
    let lista = document.querySelector(".lista");
    //esconde o aviso da tela
    document.querySelector(".aviso").setAttribute("style", "display: none");

    //limpa a lista
    lista.innerHTML = "";

    if(tarefas.length === 0) { 
        lista.setAttribute("style", "display: none");
    } else {
        lista.setAttribute("style", "display: block");
    }

    //cria os itens da lista
    for (let t of tarefas) {
        let itemLista = document.createElement("li");
        itemLista.setAttribute("class", "item-lista");

        let checkBox = document.createElement("input");
        checkBox.setAttribute("id", "checkbox");
        checkBox.setAttribute("type", "checkbox");

        let descricao = document.createElement("p");
        descricao.setAttribute("id", "descricao");
        let textoDescricao = document.createTextNode(t);

        itemLista.appendChild(checkBox);
        descricao.appendChild(textoDescricao);
        itemLista.appendChild(descricao);
        
        lista.appendChild(itemLista);
        
        eventoRemover(checkBox, itemLista);
    }   
}

function eventoAdicionar() {
    let adicionar = document.getElementById("adicionar");
    adicionar.onclick = () => {
        adicionaTarefa();
    };
}

eventoAdicionar();

function adicionaTarefa() {  
    let input = document.getElementById("tarefa").value;

    if(input === "") {
        exibeAviso();
        return;
    }

    tarefas.push(input)

    //limpa o input e coloca foco
    document.getElementById("tarefa").value = "";
    document.getElementById("tarefa").focus();
    
    //salva a tarefa no storage
    salvaDadosNoStorage();

    atualizaLista();
}

function eventoRemover(checkBox, itemLista) {
    let excluir = document.getElementById("excluir");

    //escuta o click no checkbox
    checkBox.addEventListener("click", () => {
        excluirTarefa.push(itemLista.textContent)
        excluir.onclick = function() {

            if(checkBox.checked) {
                removeTarefa(excluirTarefa);
                excluirTarefa = [];
            }   
        } 
    })
    checkBox.dispatchEvent(new Event("change"));
}

function removeTarefa(tarefa) {
    for(let t of tarefa) { 
        tarefas.splice(tarefas.indexOf(t), 1);
    }
    
    atualizaLista();

    //exclui a tarefa do storage
    salvaDadosNoStorage();
}

function exibeAviso() {
    document.querySelector(".aviso").setAttribute("style", "display: flex");
    document.getElementById("tarefa").focus();
}

function salvaDadosNoStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}