let firebaseUrl =
"https://kt1-ar-default-rtdb.firebaseio.com/";

let ID= getParamValue("id");
let IDdestinacija=ID[1]
let IDagencije=ID[0]
let destinacija = {};


let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
  if (getRequest.readyState == 4) {
    if (getRequest.status == 200) {
      destinacija = JSON.parse(getRequest.responseText);
      document.getElementById("cena").value = destinacija.cena;
      document.getElementById("maxOsoba").value = destinacija.maxOsoba;
      document.getElementById("opis").value = destinacija.opis;
      document.getElementById("prevoz").value = destinacija.prevoz;
      document.getElementById("naziv").value = destinacija.naziv;
      console.log(destinacija);
    } else {
      alert("Greška prilikom učitavanja destinacija.");
    }
  }
};

getRequest.open("GET", firebaseUrl + "/destinacije/"+IDagencije+"/" + IDdestinacija + ".json");
getRequest.send();



let editForm = document.getElementById("editForm");
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let cena = document.querySelector("#cena").value.trim();
  let maxOsoba = document.querySelector("#maxOsoba").value.trim();
  let opis = document.querySelector("#opis").value.trim();
  let prevoz = document.querySelector("#prevoz").value.trim();
  let naziv = document.querySelector("#naziv").value.trim();

  
  if (cena != "") {
    destinacija.cena = cena;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if(isNaN(cena) === true){
    errorMsgIzmena.innerText="Cena nije dobrog oblika"}
  if (maxOsoba != "") {
    destinacija.maxOsoba = maxOsoba;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if(isNaN(maxOsoba) === true){
    errorMsgIzmena.innerText="Maksimalan broj osoba nije dobrog oblika"}
  if (opis != "") {
    destinacija.opis = opis;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if (prevoz != "") {
    destinacija.prevoz = prevoz;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }
  if (naziv != "") {
    destinacija.naziv = naziv;
  }
  else{
    errorMsgIzmena="Prazno polje";
  }

  

  let putRequest = new XMLHttpRequest();

  putRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.href = "AdminPanelDestinacije.html";
      } else {
        alert("Greška prilikom izmene destinacija.");
      }
    }
  };

  putRequest.open("PUT", firebaseUrl + "/destinacije/" +IDagencije+"/" + IDdestinacija + ".json");
  putRequest.send(JSON.stringify(destinacija));
});


function getParamValue(name) {
var id;
  let location = decodeURI(window.location.toString());
  let index1 = location.indexOf("?") + 4;
    let subs = location.substring(index1, location.length);
    let splitted = subs.split("&");

    
    return splitted;
    
}
