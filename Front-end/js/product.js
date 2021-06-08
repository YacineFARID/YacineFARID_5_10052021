const productId = window.location.search.substr(4);

const container = document.getElementById("product");

const addToCart = document.getElementById("add-to-cart");

const quantity = document.getElementById("product-quantity");

const cart = document.getElementById("cart-validation");

fetch(`http://localhost:3000/api/cameras/${productId}`)
.then((response) => response.json())
.then( product => {

    const divImg = document.createElement("div");
    divImg.classList.add("img-product");
    const img = document.createElement("img");
    img.src = product.imageUrl;

    const divDescription = document.createElement("div");
    divDescription.classList.add("description-product");
    const h2 = document.createElement("h2");
    h2.textContent = product.name;
    const p = document.createElement("p");
    p.textContent = product.price / 100 + "€";
    const h3 = document.createElement("h3");
    h3.textContent = product.description;
    const select = document.createElement("select");
    product.lenses.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
        console.log(element);
    });

    const divBuy = document.createElement("div");
    divBuy.classList.add("buy-product");
    const price = document.createElement("p");
    price.textContent = product.price / 100 + "€";
    
    
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
    divBuy.appendChild(cart);

    

        });
        document.getElementById("add-to-cart").addEventListener("click", ()=> {
            console.log(product);
            let objCommand = {
                name : product.h2
            }

        });