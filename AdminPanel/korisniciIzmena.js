let firebaseUrl =
"https://kt1-ar-default-rtdb.firebaseio.com/";

let IDkorisnika = getParamValue("id");
let korisnik = {};

 
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
  if (getRequest.readyState == 4) {
    if (getRequest.status == 200) {
      korisnik = JSON.parse(getRequest.responseText);
      document.getElementById("adresa").value = korisnik.adresa;
      document.getElementById("datumRodjenja").value = korisnik.datumRodjenja;
      document.getElementById("email").value = korisnik.email;
      document.getElementById("ime").value = korisnik.ime;
      document.getElementById("korisnickoIme").value = korisnik.korisnickoIme;
      document.getElementById("lozinka").value = korisnik.lozinka;
      document.getElementById("prezime").value = korisnik.prezime;
      document.getElementById("telefon").value = korisnik.telefon;
      console.log(korisnik);
    } else {
      alert("Greška prilikom učitavanja korisnika.");
    }
  }
};

getRequest.open("GET", firebaseUrl + "/korisnici/" + IDkorisnika + ".json");
getRequest.send();



let editForm = document.getElementById("editForm");
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let adresa = document.querySelector("#adresa").value.trim();
  let datumRodjenja = document.querySelector("#datumRodjenja").value.trim();
  let email = document.querySelector("#email").value.trim();
  let ime = document.querySelector("#ime").value.trim();
  let korisnickoIme = document.querySelector("#korisnickoIme").value.trim();
  let lozinka = document.querySelector("#lozinka").value.trim();
  let prezime = document.querySelector("#prezime").value.trim();
  let telefon = document.querySelector("#telefon").value.trim();

  
  if (adresa != "") {
    korisnik.adresa = adresa;
  }
  if (datumRodjenja != "") {
    korisnik.datumRodjenja = datumRodjenja;
  }
  if (email != "") {
    korisnik.email = email;
  }
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)===false){
    errorMsgIzmena.innerText="Email nije dobrog oblika"
   }
  if (ime != "") {
    korisnik.ime = ime;
  }
  if (korisnickoIme != "") {
    korisnik.korisnickoIme = korisnickoIme;
  }
  if (lozinka != "") {
    korisnik.lozinka = lozinka;
  }
  if (prezime != "") {
    korisnik.prezime = prezime;
  }
  if (telefon != "") {
    korisnik.telefon = telefon;
  }
  if(isNaN(telefon) === true){
    errorMsgIzmena.innerText="Telefon nije dobrog oblika"}
  

  let putRequest = new XMLHttpRequest();

  putRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.href = "AdminPanelKorisnici.html";
      } else {
        alert("Greška prilikom izmene korisnika.");
      }
    }
  };

  putRequest.open("PUT", firebaseUrl + "/korisnici/" + IDkorisnika + ".json");
  putRequest.send(JSON.stringify(korisnik));
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
