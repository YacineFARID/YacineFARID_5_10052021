// Récupération des champs du formulaire
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');


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

const productsCart = localStorageToArray();
const container = document.getElementById('cart');

if (Object.keys(productsCart).length <= 0) {
    // création d'un message si le panier est vide
    const divNul = document.createElement('p');
    divNul.textContent = "Vôtre panier est vide";

    // chemin d'affichage du message ci-dessus
    container.appendChild(divNul);
}
else {
    Object.keys(productsCart).forEach(productId => {
        const product = productsCart[productId]
        //console.log(product);
        if (product) {
            // création des éléments du produit dans le panier img, nom, quantité, prix, total, bouton supprimer
            const divProduct = document.createElement('div');
            divProduct.classList.add("flex-product");
            const divImg = document.createElement('div');
            const img = document.createElement('img');
            img.src = product.img;
            img.classList.add('img-cart');
            const divDescription = document.createElement('div');
            divDescription.classList.add('description-product');
            const h2 = document.createElement('h2');
            h2.textContent = product.name;
            h2.classList.add('h2');
            const quantity = document.createElement('p');
            quantity.textContent = 'quantité : ' + product.quantity;
            const divPrice = document.createElement('div');
            divPrice.classList.add('div-price');
            const pPrice = document.createElement('p');
            pPrice.classList.add('price-cart');
            pPrice.textContent = 'prix : ' + product.price;
            const pTotal = document.createElement('p');
            totalPrice = (parseFloat(product.price) * product.quantity);
            pTotal.textContent = 'total : ' + totalPrice + '€';
            pTotal.classList.add('total-price');
            const supr = document.getElementById('clear');
            
            //chemin d'affichage des éléments créé ci-dessus
            container.appendChild(divProduct);
            divProduct.appendChild(divImg);
            divImg.appendChild(img);
            divProduct.appendChild(divDescription);
            divDescription.appendChild(h2);
            divDescription.appendChild(quantity);
            divProduct.appendChild(divPrice);
            divPrice.appendChild(pPrice);
            divPrice.appendChild(pTotal);
            divProduct.appendChild(supr);

            // function du boutton supprimer, pour supprimer le produit
            document.getElementById('clear').addEventListener('click', () => {
                localStorage.clear();
                document.location.reload();
            });
        }
    })
};


let myForm = document.getElementById('myform');

myForm.addEventListener("submit", async(event) => {

    let orderData = {
        contact: {},
        products: []
    };
    
    //Création de l'objet validationOrder contact + products
    orderData.contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,   
    };
    
    productCarts.forEach((article) => {
        console.log(article);
        /*const quantity = productsCart.quantity;
        console.log(quantity);
        for (i=0; i < quantity ; i++) {
            console.log(article.id);
            validationOrder.products.push(article.id)
        }*/
    });

    console.log(orderData);
    
    //Envoi validation commande au backend
    /*const validationFetch = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(orderData),
    };
    
   
    fetch("http://localhost:3000/api/cameras/order" , validationFetch)
        .then(function (response) { response.json()
            .then(function (resOrder) {
            console.log(resOrder);
        });
    });*/

    event.preventDefault();

});




