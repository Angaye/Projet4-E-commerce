// Panier
const cart =JSON.parse(localStorage.getItem("products")) || []
// Pour affichage des products nous devons parcourir cart pour les produits qui existent
if(cart.length > 0){
    for(product of cart){
        displayCart(product)
    }
    productsInCart()
    displayTotalCart()
}
// Affichage des produits présent dans le pa nier
function displayCart(product){
    const indexProduct= cart.indexOf(product)
    const productList =document.getElementById('cart__items')
    if(productList !=null){
      productList.innerHTML += `
    <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.colors}</p>
                    <p>${product.price * product.quantity}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}" data-index="${indexProduct}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick ="remove(${indexProduct})">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `
    }
   
}
// Fonction pour affichage du nombre d'article dans le panier
function productsInCart(){
    let productNumbers = document.getElementById("totalQuantity")
    if(cart.length > 0){
        let productInCart = 0;
        for(product of cart){
            productInCart += product.quantity;
        }
        if(productNumbers !=null){
          productNumbers.innerHTML += `${productInCart}`
         }
    }
}
// Calcul du montant total du panier
function updateTotalCost(){
    let totalCart = 0;
    cart.forEach((product)=>{
     totalCart = totalCart +(product.quantity * product.price)
    })
    return totalCart;
}
// Affichage du montant total du panier
function displayTotalCart(){
    const totalContent = document.getElementById('totalPrice');
    if(totalContent != null){
      totalContent.innerHTML += updateTotalCost()

    }
}
// Gestion des quantités de panier
const inputList = document.querySelectorAll('.itemQuantity');
for(input of inputList){
  // Data-index l'emplacement du produit(indexproduit)
  let ind = input.getAttribute("data-index");
  input.addEventListener('click', (e) =>{
    // La nouvelle valeur de l'input dans le panier
    const newValue = e.target.value;
    for(products of cart){
      // L'emplacement du produit de l'l'actuel produit (indexquantité)
      let index = cart.indexOf(products)
      let qty = cart[index].quantity
      if(index == ind && newValue> qty){
        cart[index].quantity++;
        localStorage.setItem("products", JSON.stringify(cart))
        location.reload()
      }else if(index == ind && newValue< qty){
        cart[index].quantity--;
        localStorage.setItem("products", JSON.stringify(cart))
        location.reload()
      }else{
        newValue==qty;
      }
    }
  })
}
// Fonction pour supprimer le produit
function remove(index){
  cart.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(cart))
  location.reload()
  displayCart()
}
// Formulaire de commande
// Les données duformulaire de l'objet contact
const regexName = /^(([a-zA-ZA-y]+[\s\-]{1}[a-zA-ZA-y]+)|([a-zA-ZA-y]+))$/;
const regexCity = /^(([a-zA-ZA-y]+[\s\-]{1}[a-zA-ZA-y]+)|([a-zA-ZA-y]+)){1,10}$/
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/
const regexAddress = /^(([a-zA-ZA-y0-9]+[\s\-]{1}[a-zA-ZA-y0-9]+)){1,10}$/

const order = document.querySelector('#order');
if(order!=null ){
  order.addEventListener('click', () =>{
    let contact ={
      firstName:document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
  
    }
    if((regexName.test(contact.firstName) ==true)&
    (regexName.test(contact.lastName) ==true)&
    (regexAddress.test(contact.address) == true)&
    (regexCity.test(contact.city) == true)&
    (regexMail.test(contact.email) == true)
    ){
  
      let products = []
      for(listId of cart){
        products.push(listId.id);
      }
  // Gestion de l'envoi du formulaire permettant de passer une commande au backend et renvoit une confirmation de commande avec son identifiant  
     const urlPost = `http://localhost:3000/api/products/order/`
     fetch(urlPost,{
      method:"POST",
      headers :{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({contact,products})
     })
     .then((response) => response.json())
     .then((data) =>{
      localStorage.setItem("order",JSON.stringify(data))
      document.location.href = "../html/confirmation.html"
     })
     .catch((error) =>console.log("error:"+error))
  
    }else{
      errosMsgName = document.getElementById("firstNameErrorMsg")
      if(regexName.test(contact.firstName) == false){
          errosMsgName.innerHTML +=` Merci de renseigner ce champ correctement`
      } 
      errosMsgLastName = document.getElementById('lastNameErrorMsg');
      if(regexName.test(contact.lastName)==false){
        errosMsgLastName.innerHTML += `Merci de renseigner ce champ correctement`
      }
      errosMsgLasAddress = document.getElementById('addressErrorMsg');
      if(regexAddress.test(contact.address)==false){
        errosMsgLasAddress.innerHTML += `Merci de renseigner ce champ correctement`
      }
      errosMsgCity = document.getElementById('cityErrorMsg');
      if(regexCity.test(contact.city)==false){
        errosMsgCity.innerHTML += `Merci de renseigner ce champ correctement`
      }
      errosMsgEmail = document.getElementById('emailErrorMsg');
      if(regexMail.test(contact.email)==false){
        errosMsgEmail.innerHTML += `Merci de renseigner ce champ correctement`
      }
    }
  }) 
}

const orderId = JSON.parse(localStorage.getItem('order')) || []
let informations = document.querySelector("#orderId")
if(informations != null){
  informations.innerHTML += `${orderId.orderId}`
}
