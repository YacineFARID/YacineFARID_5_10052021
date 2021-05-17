console.log("accueil");

const getProductsFromApi = async () => {

	return await fetch("http://localhost:3000/api/cameras/")
		.then((response) => response.json())
		.catch((error) => new Error(error));
};

const displayProduct = async () => {
    const container = document.getElementById("camera")
    const data = await getProductsFromApi();
    data.forEach(element => console.log(element));

}

 displayProduct();

 
