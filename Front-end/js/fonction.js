//fetch url api
function getUrl() {
    return "http://localhost:3000/api/cameras/";
};


function inputRegexText(text) {
    return /^[A-Za-z]{1,20}$/.test(texte);
}
  
function inputRegexMail(textemail) {
    return /^[A-Za-z0-9-éàè.]+@[a-z.]+[a-z.]$/.test(email);
}
  
function inputRegexAdress(textadresse) {
    return /^[A-Za-z0-9-éàè\s]{1,50}$/.test(Adress);
}