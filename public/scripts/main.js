import Modal from './modal.js'

const modal = Modal()

// variavel para armazenar o trecho html do titulo da modal
const modalTitle = document.querySelector('.modal h2')
// mesma coisa para o paragrafo
const modalDescription = document.querySelector('.modal p')
// mesma coisa para o conteudo do bottão
const modalButton = document.querySelector('.modal button')

//Pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll(".actions a.check")

//função para ouvir o click no botão marcar como lido e adicionar o texto e ação do botão
checkButtons.forEach(button => {
    //adicionar "escuta"
    button.addEventListener("click", handleClick)
})


/* Função para quando clicar no delete abre a modal */
/* Cria a variável para armazenar o html do botão delete*/
const deleteButton = document.querySelectorAll(".actions a.delete")
// ForEach para escutar o clique no botão de excluir
deleteButton.forEach(button => {
    //Adicionando a escuta no botão e chamando a função para alterar o texto da modal
    button.addEventListener("click", event => handleClick(event, false))
})

// Função que recebe o evento do clique, checa qual botão foi clicado e altera o texto da modal
function handleClick(event, check = true) {
    event.preventDefault()
    //Variável que checa qual botão foi clicado e adiciona o trecho do texto adequadp
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    //Altera o trecho da modal de acordo com o trecho HTML armazenado na variável
    modalTitle.innerHTML= `${text} esta pergunta`
    modalDescription.innerHTML= `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML=`Sim, ${text.toLowerCase()}`

    check? modalButton.classList.remove("red") : modalButton.classList.add("red")
    //abre a modal
    modal.open()
}