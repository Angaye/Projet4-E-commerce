// Panier etant comme un tableau de type array
const cart =JSON.parse(localStorage.getItem("products")) || []
// Class product
class Product{
    
    constructor(id,name,description,price,colors,imageUrl,altTxt,quantity){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price;
        this.colors = colors;
        this.imageUrl = imageUrl;
        this.altTxt = altTxt
        this.quantity = +quantity;
    }
}

// constante necessaire à la recuperation de la chaine et paramètre de l'url
const searchParams = new URLSearchParams(location.search);
// recuperation l'id du prodcut
const newId = searchParams.get('_id');
// Ur du produit
const newUrl = ` http://localhost:3000/api/products/${newId}`
// fectch pour recuperer le produit
fetch(newUrl)
.then((response) => response.json())
.then((data) =>{
    const product = data;
    addCard(product);
    function addCard(product) {
        
        const productImage = document.querySelector('.item__img')
        productImage.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        const productName = document.getElementById('title')
        productName.innerHTML += `${product.name}`;
        const productPrice = document.getElementById("price")
        productPrice.innerHTML += `${product.price}`
        const productDescription = document.getElementById("description")
        productDescription.innerHTML += `${product.description}`

        addColors(product);

    }
    function addColors(product) {
        let options = document.getElementById("colors")
        for(let colors of product.colors){
            options.innerHTML += `<option value="${colors}">${colors}</option>`
        }
    }

    let btnAddToCart = document.getElementById("addToCart")
    btnAddToCart.addEventListener("click", () =>{
        let colors = document.getElementById("colors")
        let quantity = document.getElementById("quantity")
        

        let objetProduit = new Product(
            newId,
            product.name,
            product.description,
            product.price,
            colors.value,
            product.imageUrl,
            product.altTxt,
            quantity.value
        )
        if(colors.value === ""){
            alert("Vous devez choisir une couleur")
        }else if(quantity.value == 0){
             alert("Vous devez indiquer une quantité")
        }else{
            let isInCart = false;
            let indexModification;
            for(products of cart) {
                 switch(products.colors){
                    case objetProduit.colors:
                        isInCart = true;
                        // emplacement du produit que nous cherchons dans le panier,elle renvoit la premiere indice par 
                        // lequel on est dans un tableau
                        indexModification = cart.indexOf(products) 
                 }
            }
    
            if (isInCart){
                cart[indexModification].quantity =+ cart[indexModification].quantity + +objetProduit.quantity;
                localStorage.setItem("products",JSON.stringify(cart));
            }else{
                cart.push(objetProduit)
                localStorage.setItem("products",JSON.stringify(cart));
            }
            alert("Votre produit a été bien ajouté au panier")
        }
    })
})
.catch((err) =>{
    alert("Attention votre serveur node n'est pas lancé");
})