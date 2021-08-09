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
    //SI le panier est vide, affiche un message Vôtre panier est vide
    if (productStorage === null || productStorage == 0) {
        const emptyCart = `
        <div class="empty">Vôtre Panier Est Vide</div>
        `;
        cart.innerHTML = emptyCart;
    } else {
	for (let i = 0; i < productStorage.length; i++) {
		
		    cart.innerHTML += `<div class="flex-cart">
	                <div>
		                <img src="${productStorage[i].img}" class"img-cart">
	                </div>
	                <div class="description-cart">
		                <h2 class="h2">${productStorage[i].name}</h2>
		                <p>Quantité :${productStorage[i].quantity}</p>
		                <p class="price-cart">prix : ${productStorage[i].price} €</p>
	                </div>
	                <div>
		                <p class="total-price">total: ${productStorage[i].quantity * productStorage[i].price}€</p>
		                <button class="delete" type="submit">Supprimer</button>
	                </div>
                </div>`;

            totalPrice += productStorage[i].quantity * productStorage[i].price;
            //console.log(totalPrice);

		    //console.log(cart);

		    //Supprimer une ligne

		    let deleteButton = document.querySelectorAll(".delete");

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
            window.location = `./confirmation.html?totalOrder=${totalPrice}&orderId=${data.orderId}`;
        });
    });
});