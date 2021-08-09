// déclaration de variables
let productHtml = ''; //variable qu'on utilisera pour injecter la structure html de nôtre produit
let objOrder = {} ;
let product = {} ;


// récupération de la chaîne de requête dans l'url et récupération de nôtre id dans l'url
const productIdParams = new URLSearchParams(window.location.search);
let cameraId = productIdParams.get('id');
//console.log(cameraId); //------------Plan de test-----------

// Affichage du produit
const showProduct = async () => {
    
    // création d'une variable dans laquelle on attend la réponse de l'api qui nous renvoit l'id de nôtre produit
    let data = await fetch(`${getUrl()}/${cameraId}`);
    try {
        if (data.ok) {
            product = await data.json();
            //console.log(product);

            let lenses = "";

            objOrder = {
                id: product._id,
                img : product.imageUrl,
                name : product.name,
                price : product.price,
                quantity : 0,
            };
            //console.log(objOrder);
      
            //Option de nôtre produit, choix de l'objectif de l'appareil photo, forEach product.lenses
            product.lenses.forEach((lense) => {
                lenses += `<option value="${lense}">${lense}</option>`;
            });

            //Structure Html de la page produit
            productHtml = `
                        <div class="img-product">
                            <img src="${product.imageUrl}" alt="Photographie de l'appareil" class="img">
                        </div>
                        <div class ="description-product">
                            <h2 class="h2">${product.name}</h2>
                            <p class="price">${product.price/100} €</p>
                            <label for="lentille">Type de lentille :</label><br>
                            <select name="lentille" id="lentille">${lenses}</select>
                            <p class="description">${product.description}</p>
                        </div>
                        <div class="buy-product">
                            <p class="price">${product.price/100} €</p>
                            <div id="product-quantity">Quantité : <input type="number" class="select-quantity" min="1" max="10" value="1"></div>
                            <button id="add-to-cart" type="submit" name="add-to-cart">Ajouter au panier</button>
                        </div>`;
                                      
        }
        
        //injection de la structure HTML
        document.getElementById("product").innerHTML = productHtml;
        
    }  catch (error) {
        //console.log(error);
    }


    const addToCart = document.getElementById("add-to-cart");

    // function ajout du produit dans le panier
    addToCart.addEventListener('click', function(event) { 
            event.preventDefault();


        // stockage produit dans un objet
            objOrder = {
                id: product._id,
                img : product.imageUrl,
                name : product.name,
                price : product.price/100,
                quantity : parseFloat(document.querySelector('.select-quantity').value),
            }
        
            function addProductInCart() {
                const productStorage = JSON.parse(localStorage.getItem("product")) || [];
                let productInCart = false;
                for (let i = 0; i < productStorage.length; i++) {
                    if (productStorage[i].id === objOrder.id) {
                        productInCart = true;
                        productStorage[i].quantity += parseInt(objOrder.quantity);
                        productStorage[i].price = objOrder.price;
                    }
                    console.log(productStorage[i].price);
                }
                if (!productInCart) {
                    objOrder.price = (product.price / 100) * objOrder.quantity;
                    productStorage.push(objOrder);
                }
                
                localStorage.setItem("product", JSON.stringify(productStorage));

                // rechargement de la page
                document.location.reload();
            };
            addProductInCart();
    });
};
showProduct();











    








       
        



