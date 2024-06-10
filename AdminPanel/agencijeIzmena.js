let firebaseUrl ="https://kt1-ar-default-rtdb.firebaseio.com/";

let IDagencija = getParamValue("id");
let agencija = {};

 
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
  if (getRequest.readyState == 4) {
    if (getRequest.status == 200) {
      agencija = JSON.parse(getRequest.responseText);
      document.getElementById("adresa").value = agencija.adresa;
      document.getElementById("brojTelefona").value = agencija.brojTelefona;
      document.getElementById("destinacije").value = agencija.destinacije;
      document.getElementById("email").value = agencija.email;
      document.getElementById("godina").value = agencija.godina;
      document.getElementById("logo").value = agencija.logo;
      document.getElementById("naziv").value = agencija.naziv;
      console.log(agencija);
    } else {
      alert("Greška prilikom učitavanja agencija.");
    }
  }
};

getRequest.open("GET", firebaseUrl + "/agencije/" + IDagencija + ".json");
getRequest.send();



let editForm = document.getElementById("editForm");
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let adresa = document.querySelector("#adresa").value.trim();
  let brojTelefona = document.querySelector("#brojTelefona").value.trim();
  let destinacije = document.querySelector("#destinacije").value.trim();
  let email = document.querySelector("#email").value.trim();
  let godina = document.querySelector("#godina").value.trim();
  let logo = document.querySelector("#logo").value.trim();
  let naziv = document.querySelector("#naziv").value.trim();
  let errorMsgIzmena= document.getElementById("errorMsgIzmena")
  
  if (adresa != "") {
    agencija.adresa = adresa;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if (brojTelefona != "") {
    agencija.brojTelefona = brojTelefona;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if(isNaN(brojTelefona) === true){
    errorMsgIzmena.innerText="Telefon nije dobrog oblika"
  }
  if (destinacije != "") {
    agencija.destinacije = destinacije;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if (email != "") {
    agencija.email = email;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)===false){
   errorMsgIzmena.innerText="Email nije dobrog oblika"
  }
  if (godina != "") {
    agencija.godina = godina;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if(isNaN(godina) === true){
    errorMsgIzmena.innerText="Godina nije dobrog oblika"}
  if (logo != "") {
    agencija.logo = logo;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if (naziv != "") {
    agencija.naziv = naziv;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }

  

  let putRequest = new XMLHttpRequest();

  putRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.href = "AdminPanelAgencije.html";
      } else {
        alert("Greška prilikom izmene agencija.");
      }
    }
  };

  putRequest.open("PUT", firebaseUrl + "/agencije/" + IDagencija + ".json");
  putRequest.send(JSON.stringify(agencija));
});


function getParamValue(name) {
  let location = decodeURI(window.location.toString());
  let index = location.indexOf("?") + 1;
  let subs = location.substring(index, location.length);
  let splitted = subs.split("&");

  for (i = 0; i < splitted.length; i++) {
    let s = splitted[i].split("=");
    let pName = s[0];
    let pValue = s[1];
    if (pName == name) {
      return pValue;
    }
  }
}




function praviDestinaciju(){
  window.location.href = "DestinacijaNova.html?id=" + IDagencija;
}