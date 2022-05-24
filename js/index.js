//Adicionar item no carrinho ---------------------------------------------------
//Selecionar botão
let addItemButton = document.querySelectorAll(".button-shopping")

//Selecionar paragrafos do carrinho de compras
let shoppingCart = document.querySelector(".shopping-cart")
let emptyCart = document.querySelector(".initial-text-cart")
let sugestionToAdd = document.querySelector(".sugestion-test-cart")
let divTotal = document.querySelector(".total-shopping")

//Objeto do carrinho de compras
let list = []

//Criar carrinho de compras
addItemButton.forEach(element => {
    element.addEventListener("click", function addItem(){
        //esconder os textos
        shoppingCart.innerHTML = ""

        //Acessar o title e obter o nome do item
        let parent = element.parentElement.childNodes[3].textContent

        //Acessar item dentro do objeto
        let item = searchItem(parent)

        //Criar um obj para modelar o carrinho de compras e armazenar na lista
        let shoppingItem = {}

        shoppingItem.img        = item.img
        shoppingItem.nameItem   = item.nameItem
        shoppingItem.value      = item.value
        shoppingItem.section    = item.tag[0]

        list.push(shoppingItem)
        listItem(list)
    })
});

//função buscar item dentro do objeto
function searchItem(name){
    for(let x=0; x<data.length; x++){
        if(name == data[x].nameItem){
            return data[x]
        }
    }
}

//Exibindo carrinho de compras
function listItem(arr){

    //zerar o conteudo html
    shoppingCart.innerHTML = ""

    //percorrer array para montar lista de compras
    arr.forEach(function(element, index){

        let item = template(element,index)
        shoppingCart.append(item)
    })

    calculateItens(arr)
    
}

//Montar template de compras
function template(obj,index){
    //Criar tag que contenha os itens comprados
    let shop          = document.createElement("div")
        
    //Adicionar classes
    shoppingCart.style.justifyContent = "flex-start"
    shop.classList.add("container", "product-cart")

    //Adicionar conteudo
    shop.innerHTML = `
    <div class= "container product-cart-img"> <img src="${obj.img}"> </div>
    <div class= "container product-cart-details">
        <h2 class= "product-cart-title">${obj.nameItem}</h2>
        <p class= "product-card-price">R$${obj.value}.00</p>
        <button id= "${index}" class="product-card-remove">Remover produto</button>
    </div>
    `
    return shop
}

//Fazer cálculo da soma dos itens e seus valores
function calculateItens(arr){

    //Armazenar total de itens e o preço
    let total = {
        price: 0,
        itens: 0
    }
    
    arr.forEach(obj => {
        total.price += obj.value
        total.itens ++
    });

    //criando o html do toal    
    divTotal.innerHTML = ""
    templateTotalSum(total)

}

//Monta template de total das compras
function templateTotalSum(obj){

    //retirando a classe hide
    divTotal.classList.remove("hide")

    //inserir conteudo
    divTotal.innerHTML = `
        <div class="container total">
            <p class="total-itens">Quantidade:</p>
            <p class="total-itens-value">${obj.itens}</p>
        </div>
        <div class="container total">
            <p class="total-itens">Total:</p>
            <p class="total-itens-value">R$${obj.price}.00</p>
        </div>
    `
}

//Remover item do carrinho-------------------------------------

function removeItem(event){
    //pegar o alvo do evento
    let button = event.target
    
    //verificar se apertou o botão
    if(button.tagName == "BUTTON"){

        //retirar o item que clicamos da lista
        let index = button.id
        list.splice(index,1)

        //listar itens que sobraram
       listItem(list)

       //Voltar ao carrinho vazio
       if(list.length == 0){

        shoppingCart.style.justifyContent = "center"

        shoppingCart.innerHTML = `
            <p class="initial-text-cart">Carrinho vazio</p>
            <p class="sugestion-test-cart">Adicione itens</p>
            `
            //retirando a classe hide
            divTotal.classList.add("hide")
        }        
       
    }
}

shoppingCart.addEventListener("click", removeItem)

//Filtrar itens pelo nome----------------------------------------------
//selecionar botões
let filters = document.querySelectorAll(".nav-link")

//selecionar todos os cards de produtos
let products = document.querySelectorAll(".product-card")

//criando escutador para cada botão
filters.forEach(element => {
    element.addEventListener("click", filterByCategory)
});

//função para filtrar as categorias
function filterByCategory(event){
    //definindo a palavra chave de busca
    let type = event.target.textContent

    //buscar dentro dos cards
    products.forEach(element => {

        //achar a categoria de cada card
        let category = element.childNodes[3].childNodes[1].textContent
        
        //Aparecer todos
        element.classList.remove("hide")

        if(type=="Todos"){

            //aparecer todos quando clicar em todos
            element.classList.remove("hide")

        } else if (type != category){

            //Esconder os que não batem com a pesquisa
            element.classList.add("hide")

        }
    })  
}

//filtrar por pesquisa no input
//selecionar input e botão do imput
let input = document.querySelector("#search")
let inputButton = document.querySelector(".add-shop")

//Adiciona um escutador
inputButton.addEventListener("click", searchValue)

//Criar função que busca pelo o que escrevemos no input
function searchValue(){
    //Acessa o que escrevemos
    let search = input.value.toLowerCase()
    
    //compara o que escrevemos com os cards
    products.forEach(element => {
        //achar o nome de cada card
        let name = element.childNodes[3].childNodes[3].textContent.toLowerCase()
        
        element.classList.remove("hide")
        
        //buscar se o produto contem o input
        let result = name.match(search)

        if(result == null){
            element.classList.add("hide")
        }
       
    })    
}