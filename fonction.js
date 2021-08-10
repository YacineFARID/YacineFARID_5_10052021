//fetch url api
function getUrl() {
    return "http://localhost:3000/api/cameras/";
};

function inputRegexName(name) {
    return /^[A-Za-z]$/.test(name);
}

function inputRegexText(text) {
    return /^[A-Za-z]{1,20}$/.test(text);
}
  
function inputRegexMail(textemail) {
    return /^[A-Za-z0-9-éàè.]+@[a-z.]+[a-z.]$/.test(email);
}
  
function inputRegexAdress(adress) {
    return /^[A-Za-z0-9-éàè\s-,]{1,50}$/.test(adress);
}