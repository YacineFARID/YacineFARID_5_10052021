//Récupération de l'id du produit sélectionné
const productId = window.location.search.substr(4);

const container = document.getElementById("product");

const addToCart = document.getElementById("add-to-cart");

const quantity = document.getElementById("product-quantity");

fetch(`http://localhost:3000/api/cameras/${productId}`)
.then((response) => response.json())
.then( product => {

    const divImg = document.createElement('div');
    divImg.classList.add('img-product');
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.classList.add('img')
    const divDescription = document.createElement('div');
    divDescription.classList.add('description-product');
    const h2 = document.createElement('h2');
    h2.textContent = product.name;
    h2.classList.add('h2');
    const p = document.createElement('p');
    p.textContent = product.price / 100 + '€';
    p.classList.add('price')
    const h3 = document.createElement('p');
    h3.textContent = product.description;
    h3.classList.add('description')
    const select = document.createElement('select');
    product.lenses.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
        console.log(element);
    });

    const divBuy = document.createElement('div');
    divBuy.classList.add('buy-product');
    const price = document.createElement('p');
    price.textContent = product.price / 100 + '€';
    price.classList.add('price')
    
    
    container.appendChild(divImg);
    divImg.appendChild(img);
    container.appendChild(divDescription);
    divDescription.appendChild(h2);
    divDescription.appendChild(p);
    divDescription.appendChild(select);
    divDescription.appendChild(h3);
    container.appendChild(divBuy);
    divBuy.appendChild(price);
    divBuy.appendChild(quantity);
    divBuy.appendChild(addToCart);

    });

    // function ajout du produit dans le panier
    document.getElementById('add-to-cart').addEventListener('click', async()=> { 
        // stockage produit dans un objet
        let objOrder = {
            id: productId,
            img : document.querySelector('.img').src,
            name : document.querySelector('.h2').innerHTML,
            price : document.querySelector('.price').innerHTML,
            quantity : document.querySelector('.select-quantity').value,
        };

        // création de la clé panier avec pour valeur nôtre objet
        localStorage.setItem(localStorage.length, JSON.stringify(objOrder));
        
        // rechargement de la page
        document.location.reload();
    });








       
        



