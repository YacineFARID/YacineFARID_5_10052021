// Récupération des champs du formulaire
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

//Déclaration de la variable productStorage dans laquelle on récupère les clés et valeurs stockées dans le localStorage
let productStorage = JSON.parse(localStorage.getItem("product"));
//console.log(productStorage);

let totalPrice = 0;
const cart = document.getElementById("cart");

//Creer une fonction pour afficher les informations necessaires
async function myCart() {
    //SI le panier est vide, affiche un message Vôtre panier est vide -------------Plan de Test----------------------
    if (productStorage === null || productStorage == 0) {
        const emptyCart = `
        <div class="empty">Vôtre Panier Est Vide</div>  
        `;
        cart.innerHTML = emptyCart;                          
    } else {
	for (let i = 0; i < productStorage.length; i++) {
		
		    cart.innerHTML += `<div class="flex-cart">
	                <div class="cart-img-flex">
		                <img src="${productStorage[i].img}" class"img-cart">
	                </div>
	                <div class="description-cart">
		                <h2 class="h2">${productStorage[i].name}</h2>
		                <p>Quantité :${productStorage[i].quantity}</p>
		                <p class="price-cart">prix : ${productStorage[i].price} €</p>
	                </div>
	                <div class="total-price-flex">
		                <p class="total-price">total: ${productStorage[i].quantity * productStorage[i].price}€</p>
		                <button class="delete" type="submit">Supprimer</button>
	                </div>
                </div>`;

            totalPrice += productStorage[i].quantity * productStorage[i].price;
            //console.log(totalPrice);

		    //console.log(cart);

		    //Supprimer une ligne
            //déclaration de la variable qui va nous servir à ciblé les boutons supprimer
		    let deleteButton = document.querySelectorAll(".delete");

            //boucle for de nos boutons delete qui met à jour le localStorage et recharge la page après suppression de la ligne supprimée
		    for (let i = 0; i < deleteButton.length; i++) {
			    deleteButton[i].addEventListener("click", e => {
				    let newSheet = productStorage.indexOf(productStorage[i]);
				    productStorage.splice(newSheet, 1);
				    localStorage.setItem("product", JSON.stringify(productStorage));
				    deleteButton[i].parentElement.parentElement.remove();
				    window.location.reload();
			    });
		    }
	    }
        //console.log(totalPrice);
    const totalPriceOrder = `<div class="total-cart">Montant total de vôtre commande : ${totalPrice} €</div>`;
    //console.log(totalPriceOrder);
    
    cart.insertAdjacentHTML('beforeend', totalPriceOrder);
    }
}
myCart();


async function inputRegexTests() {
    //input prénom
    //console.log(inputRegexName(firstName.value));
    if (!inputRegexName(firstName.value)) {
      messageError =
        "💡️ Votre PRENOM doit contenir au moins 1 lettre sans caractères spéciaux et sans chiffres.";
      inputError = true;
    }
  
    //input nom
    //console.log(inputRegexName(lastName.value));
    if (!inputRegexName(lastName.value)) {
      messageError =
        "💡️ Votre NOM doit contenir au moins 1 lettre sans caractères spéciaux et sans chiffres.";
      inputError = true;
    }

    //input adresse
    //console.log(inputRegexAdress(address.value));
    if (!inputRegexAdress(address.value)) {
      messageError =
        "💡️ Votre ADRESSE POSTALE ne doit pas contenir de caractères spéciaux.";
      inputError = true;
    }
  
    //input ville
    //console.log(inputRegexName(city.value));
    if (!inputRegexName(city.value)) {
      messageError =
        "💡️ Votre VILLE ne doit pas contenir de caractères spéciaux.";
      inputError = true;
    }
  
    //input mail
    //console.log(inputRegexMail(email.value));
    if (!inputRegexMail(email.value)) {
      messageError =
        "💡️ Votre MAIL ne doit pas contenir de caractères spéciaux et doit contenir @ et un .";
      inputError = true;
    }
};
  

// déclaration de la variable qui va nous servir a ciblé le formulaire
let myForm = document.getElementById('myform');

// Envoi du Formulaire et du Panier à l'API
myForm.addEventListener("submit", async(event) => {
    event.preventDefault();

    //Appel de la function inputRegexTests() pour tester nos inputs
  inputRegexTests();

    // Création de l'objet contact et de l'array products
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

    // Création de l'array products
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
            window.location = `./confirmation.html?totalOrder=${totalPrice}&orderId=${data.orderId}`;
        });
    });
});