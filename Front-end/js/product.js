const productId = window.location.search.substr(4);

const container = document.getElementById("product");


fetch(`http://localhost:3000/api/cameras/${productId}`)
.then((response) => response.json())
.then( product => {
    const h2 = document.createElement("h2");
    h2.textContent = product.name;
    const p = document.createElement("p");
    p.textContent = product.price / 100 + "€";
    const img = document.createElement("img");
    img.src = product.imageUrl;
    const h3 = document.createElement("h3");
    h3.textContent = product.description;
    const select = document.createElement("select");
    console.log(product.lenses);
    product.lenses.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
        console.log(element);
    
    })

    container.appendChild(h2);
    container.appendChild(img);
    container.appendChild(h3);
    container.appendChild(p);
    container.appendChild(select);

        });

