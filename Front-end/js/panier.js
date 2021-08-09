// Récupération des champs du formulaire
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');


const localStorageToArray = () => {
    let result = [];

    for (const[key, value] of Object.entries(localStorage)) {
        let product = JSON.parse(value)
        const productId = product.id

        if (productId in result) {
            result[productId].quantity = parseInt(result[productId].quantity) + parseInt(product.quantity)
        }
        else {
            result[productId] = product
        }
    }
    return result
};

const cart = localStorageToArray();
//console.log(cart);

const container = document.getElementById('cart');

let totalPrice = 0;

// Fonction pour afficher le panier.
function setCart() {
if (Object.keys(cart).length <= 0) {
    // création d'un message si le panier est vide
    const divNul = document.createElement('p');
    divNul.textContent = "Vôtre panier est vide";

    // chemin d'affichage du message ci-dessus
    container.appendChild(divNul);
}
else {
    // récupération des clés de chaque produits dans le localStorage
    Object.keys(cart).forEach(productId  => {
        const product = cart[productId]
        //console.log(product);
        
        if (product && !product.contact) {
            // création des éléments du produit dans le panier img, nom, quantité, prix, total, bouton supprimer
            const divProduct = document.createElement('div');
            divProduct.classList.add("flex-cart");
            const divImg = document.createElement('div');
            const img = document.createElement('img');
            img.src = product.img;
            img.classList.add('img-cart');
            const divDescription = document.createElement('div');
            divDescription.classList.add('description-cart');
            const h2 = document.createElement('h2');
            h2.textContent = product.name;
            h2.classList.add('h2');
            const quantity = document.createElement('p');
            quantity.textContent = 'quantité : ' + product.quantity;
            const divPrice = document.createElement('div');
            const productPrice = document.createElement('p');
            productPrice.classList.add('price-cart');
            productPrice.textContent = 'prix : ' + product.price;
            const totalPriceByProduct = document.createElement('p');
            price = (parseFloat(product.price) * product.quantity);
            totalPriceByProduct.textContent ='total : ' + price + '€';
            totalPriceByProduct.classList.add('total-price');
            totalPrice += price;
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deletebutton');

            
            //chemin d'affichage des éléments créé ci-dessus
            container.appendChild(divProduct);
            divProduct.appendChild(divImg);
            divImg.appendChild(img);
            divProduct.appendChild(divDescription);
            divDescription.appendChild(h2);
            divDescription.appendChild(quantity);
            divProduct.appendChild(divPrice);
            divPrice.appendChild(productPrice);
            divPrice.appendChild(totalPriceByProduct);
            divProduct.appendChild(deleteButton);

            
            
            /* function du boutton supprimer, pour supprimer le produit
            document.getElementsByClassName('deletebutton').addEventListener('click', () => {
               
            })*/
        }
    })
    //console.log(totalPrice);
    const totalPriceOrder = document.createElement('div');
    totalPriceOrder.textContent ='Total de vôtre commande ' + totalPrice + '€';
    totalPriceOrder.classList.add('total-cart');

    container.appendChild(totalPriceOrder);
}
};

setCart();

let delete_Btn = document.querySelectorAll('.deletebutton');
//console.log(delete_Btn);

/*for (let i = 0; i < delete_Btn.length; i++) {
    let deleteId = localStorage.length[i].id;
    console.log(deleteId);

    delete_Btn[i].addEventListener('click', (event) =>{
        event.preventDefault();
        cart = cart.filter(element => element.id !== deleteId);
        console.log(cart);
    });
};*/

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
    Object.keys(cart).forEach(productId => {
        const product = cart[productId];
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




