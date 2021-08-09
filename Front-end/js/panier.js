// Récupération des champs du formulaire
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

console.log(productStorage);

//-----------------------------------------------Affichage des produits du panier-----------------------------------
//Sélection de l'Id ou on va injecter le html de la page panier
const container = document.getElementById('cart');

let totalPrice = 0;

//Si le panier est vide
if(productStorage === null){
    const cartEmpty = `
    <p class="cart-empty">Vôtre panier est vide</p>
    `;
    container.innerHTML = cartEmpty;
} else{
// Si le panier n'est pas vide : afficher les produits du localStorage
    let buildProductCart = [];

    for(j = 0; j < productStorage.length; j++){
        buildProductCart = buildProductCart + `
            <div class="flex-cart">
	            <div>
		            <img src="${productStorage[j].img}" class"img-cart">
	            </div>
	            <div class="description-cart">
		            <h2 class="h2">${productStorage[j].name}</h2>
		            <p>Quantité :${productStorage[j].quantity}</p>
		            <p class="price-cart">prix : ${productStorage[j].price} €</p>
	            </div>
	            <div>
		            <p class="total-price">total: ${productStorage[j].quantity * productStorage[j].price}€</p>
		            <button class="delete-button" type="button">Supprimer</button>
	            </div>
            </div>
        `;
    }
    totalPriceOrder = `<div class="total-cart">Total de vôtre commande : €</div>
    `;
    
    if(j === productStorage.length){
        //injection
        container.innerHTML = buildProductCart;
    }

};




let myForm = document.getElementById('myform');

// Envoi du Formulaire et du Panier à l'API
myForm.addEventListener("submit", async(event) => {
    event.preventDefault();

    // Création de l'objet contact + products
    let orderData = {
        contact: {},
        products: []
    };

    //Création de l'objet contact
    orderData.contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,   
    };

    // Création de l'objet products
    productStorage.forEach(productId => {
        const product = productStorage[productId];
        if (product) {
            orderData.products.push(product.id);
        }
    });

    //console.log(orderData);
    
    //Envoi validation commande au backend
    const postParameters = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(orderData),
    };
    
   
    await fetch("http://localhost:3000/api/cameras/order" , postParameters)
        .then((response) => { response.json() 
        .then((data) => {
            console.log(data);
            window.location = `./confirmation.html?orderId=${data.orderId}`;
        });
    });
});




