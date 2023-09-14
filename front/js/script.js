// Url de l'api pour recuperer tous les produits
const url = ` http://localhost:3000/api/products/`
fetch(url)
.then((response) => response.json())
.then((data) =>{
    addCards(data)
})
.catch((err) =>{
    alert("Attention votre serveur Node n'est pas lancé")
})
// fonction pour affichage des produits en page d'accueil
function addCards(data) {
    for(product of data){
        const card = document.getElementById("items");
        card.innerHTML += `  <a href="./product.html?_id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}.</p>
        </article>
      </a> `
    }
}