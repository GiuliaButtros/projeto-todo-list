// SELEÇÃO DE ELMENTOS

const formTarefas = document.querySelector("#form-tarefas");
const inputTarefas = document.querySelector("#input-tarefas");
const listaTarefas = document.querySelector("#lista-tarefas");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelaEdit = document.querySelector("#cancela-edit");

let antigoInputValue;

// FUNÇÕES

const salvaTarefa = (text) => {
    const fazer = document.createElement("div"); //cria a div da tarefa com gatilho do JS
    fazer.classList.add("fazer");

    const fazerTitulo = document.createElement("h3"); //cria o título da tarefa com gatilho do JS
    fazerTitulo.innerText = text;
    fazer.appendChild(fazerTitulo); //introduz o título da tarefa na div fazer

    const concluirBtn = document.createElement("button"); //cria o botão de concluir com gatilho do JS
    concluirBtn.classList.add("concluir-tarefa");
    concluirBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    fazer.appendChild(concluirBtn); //introduz o botão de concluir na div fazer

    const editBtn = document.createElement("button"); //cria o botão de editar com gatilho do JS
    editBtn.classList.add("edit-tarefa");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    fazer.appendChild(editBtn); //introduz o botão de editar na div fazer

    const excluirBtn = document.createElement("button"); //cria o botão de excluir com gatilho do JS
    excluirBtn.classList.add("excluir-tarefa");
    excluirBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    fazer.appendChild(excluirBtn); //introduz o botão de excluir na div fazer

    listaTarefas.appendChild(fazer);

    inputTarefas.value = ""; // Para limpar o input após envio
    inputTarefas.focus(); // Focar novamente no campo após envio
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    formTarefas.classList.toggle("hide");
    listaTarefas.classList.toggle("hide");
}

const updateTarefa = (text) =>{

    const todosFazer = document.querySelectorAll(".fazer"); // cria um array com todos os elementos com classe "fazer"

    // percorrer o array para encontrar o desejado

    todosFazer.forEach((fazer) =>{
        let tarefaTitulo = fazer.querySelector("h3");

        if(tarefaTitulo.innerText === antigoInputValue){
            tarefaTitulo.innerText = text;
        }
    });
}

// EVENTOS

formTarefas.addEventListener("submit", (e) => {
    e.preventDefault(); // faz com que o formulário não seja enviado quando pressionar o botão

    const inputValue = inputTarefas.value;

    if(inputValue) { //mapeamento do valor
        
        salvaTarefa(inputValue);

    }
});

document.addEventListener("click", (e) =>{ //como há elementos sendo adicionados dinamicamente, o mais simples e efetivo seria adicionar o evento click no documento todo
    // O evento acontece de acordo com o que for clicado

    const targetEl = e.target; // o evento acontecerá de acordo com o elemento alvo

    const parentEl = targetEl.closest("div"); // O evento é aplicado ao elemento pai, então foi selecionada a div mais próxima (pai dos botões clicados)

    let tarefaTitulo; // declarar o let fora da função o torna mais "global"

    if(parentEl && parentEl.querySelector("h3")){ //Confere se o elemento pai existe E se o elemento pai tem um h3
        tarefaTitulo = parentEl.querySelector("h3").innerText;
    }


    if (targetEl.classList.contains("concluir-tarefa")){ //verifica se o elemento alvo contém a classe concluir-tarefa
        
        parentEl.classList.toggle("feito"); // "toggle" para ser possível desfazer o clique caso ocorra acidentalmente etc. "add" faria com que a mudança fosse imutável
    }

    if(targetEl.classList.contains("excluir-tarefa")){
        // é necessário remover o elemento pai

        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-tarefa")){ // Para abrir a edição será necessário esconder o form de adição de tarefas

        toggleForms(); //declarada acima

        editInput.value = tarefaTitulo; // muda o valor do input
        antigoInputValue = tarefaTitulo; // salva a variável para poder verificar e fazer a alteração
    }
});

cancelaEdit.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTarefa(editInputValue);
    }

    toggleForms();
});

