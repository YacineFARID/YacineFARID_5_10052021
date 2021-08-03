// récupération de la chaîne de requête dans l'url
const queryStringUrl = window.location.search;
//console.log(window.location.search);


// récupération de l'Id de la commande et du montant total de la commande
const urlSearchParams = new URLSearchParams(queryStringUrl);

const orderId = urlSearchParams.get('orderId');
console.log(orderId);


const totalOrder = urlSearchParams.get('totalOrder');
console.log(totalOrder);

//création de éléments de confirmation à afficher
const container = document.getElementById('confirmation');
const idConfirmation = document.createElement('p');
idConfirmation.classList.add('idconfirmation');
idConfirmation.textContent = 'vôtre commande n° : ' + orderId + ' a bien été prise en compte';
const totalConfirmation = document.createElement('p');
totalConfirmation.classList.add('totalconfirmation');
totalConfirmation.textContent = 'Voici le total de vôtre commande ' + totalOrder + '€';

container.appendChild(idConfirmation);
container.appendChild(totalConfirmation);
