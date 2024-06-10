let firebaseUrl ='https://kt1-ar-default-rtdb.firebaseio.com/'


//-------------------KORISNICI--------------------------

let korisnici = {}; 
getSviKorisnici();

function getSviKorisnici() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        
        try{removeTableRows("sviKorisnici");}catch{}
        

        korisnici = JSON.parse(request.responseText);
        console.log(korisnici);

        for (let id in korisnici) {
          let korisnik = korisnici[id];
         
         try{ appendKorisnikRow("sviKorisnici", id, korisnik);}catch{}
        }
      } else {
        alert("Greška prilikom učitavanja svih korisnika.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici.json");
  request.send();
}

function showEditPageKorisnici() {
  let clickedBtn = this;
  
  let korisnikId = clickedBtn.getAttribute("data-id");
  window.location.href = "KorisnikIzmena.html?id=" + korisnikId;
}


function deleteKorisnik() {
  let clickedBtn = this;
  let korisnikId = clickedBtn.getAttribute("data-id");

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getSviKorisnicii();
      } else {
        alert("Greška prilikom brisanja korisnika.");
      }
    }
  };

  request.open("DELETE", firebaseUrl + "/korisnici/" + korisnikId + ".json");
  request.send();
}



function appendKorisnikRow(tBody, id, korisnik) {
  let korisnikRow = document.createElement("tr");

  let adresaTabela = document.createElement("td");
  adresaTabela.innerText = korisnik.adresa;
  korisnikRow.appendChild(adresaTabela);
  let datumRodjenjaTabela = document.createElement("td");
  datumRodjenjaTabela.innerText = korisnik.datumRodjenja;
  korisnikRow.appendChild(datumRodjenjaTabela);
  let emailTabela = document.createElement("td");
  emailTabela.innerText = korisnik.email;
  korisnikRow.appendChild(emailTabela);
  let imeTabela = document.createElement("td");
  imeTabela.innerText = korisnik.ime;
  korisnikRow.appendChild(imeTabela);
  let korisnickoImeTabela = document.createElement("td");
  korisnickoImeTabela.innerText = korisnik.korisnickoIme;
  korisnikRow.appendChild(korisnickoImeTabela);
  let lozinkaTabela = document.createElement("td");
  lozinkaTabela.innerText = korisnik.lozinka;
  korisnikRow.appendChild(lozinkaTabela);
  let prezimeTabela = document.createElement("td");
  prezimeTabela.innerText = korisnik.prezime;
  korisnikRow.appendChild(prezimeTabela);
  let telefonTabela = document.createElement("td");
  telefonTabela.innerText = korisnik.telefon;
  korisnikRow.appendChild(telefonTabela);

  

 
  let editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.innerText = "Izmeni";
  editBtn.onclick = showEditPageKorisnici;
  editBtn.setAttribute("data-id", id);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  korisnikRow.appendChild(editTd);

  let deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Obriši";
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  
  
  // Create the modal div element
  var modal = document.createElement("div");
  modal.id = "myModal";
  modal.className = "modal1";
  deleteTd.appendChild(modal);

// Create the modal content div element
var modalContent = document.createElement("div");
modalContent.className = "modal1-content";
modal.appendChild(modalContent);

// Create the paragraph element
var paragraph = document.createElement("p");
paragraph.textContent = "Da li ste sigurni da zelite da obrisete?";
modalContent.appendChild(paragraph);

// Create the "Da" button
var btnDa = document.createElement("button");
btnDa.id = "da";
btnDa.textContent = "Da";
modalContent.appendChild(btnDa);

// Create the "Ne" button
var btnNe = document.createElement("button");
btnNe.id = "ne";
btnNe.textContent = "Ne";
modalContent.appendChild(btnNe);

// Attach event handlers
deleteBtn.onclick = function () {
  modal.style.display = "block";
};

btnDa.onclick = function () {
  modal.style.display = "none";
  deleteKorisnik;
  console.log("obrisali smo ...");
};

btnNe.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
korisnikRow.appendChild(deleteTd);

document.getElementById(tBody).appendChild(korisnikRow);

}





//---------------------------AGENCIJE--------------------------------


let agencije = {}; 
getSVeAgencije();

function getSVeAgencije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        
        try{removeTableRows("sveAgencije");}catch{}

        agencije = JSON.parse(request.responseText);
        console.log(agencije);

        for (let id in agencije) {
          let agencija = agencije[id];
         
         try {
          appendagencijaRow("sveAgencije", id, agencija); } catch { }
         } 
      } else {
        alert("Greška prilikom učitavanja svih agencija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/agencije.json");
  request.send();
}

function showEditPageAgencija() {
  let clickedBtn = this;
  
  let agencijaId = clickedBtn.getAttribute("data-id");
  window.location.href = "agencijaIzmena.html?id=" + agencijaId;
}


function deleteagencija() {
  let clickedBtn = this;
  let agencijaId = clickedBtn.getAttribute("data-id");

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getSVeAgencije();
      } else {
        alert("Greška prilikom brisanja agencija.");
      }
    }
  };

  request.open("DELETE", firebaseUrl + "/agencije/" + agencijaId + ".json");
  request.send();
}



function appendagencijaRow(tBody, id, agencija) {
  let agencijaRow = document.createElement("tr");

  let adresaTabela = document.createElement("td");
  adresaTabela.innerText = agencija.adresa;
  agencijaRow.appendChild(adresaTabela);
  let brojTelefonaTabela = document.createElement("td");
  brojTelefonaTabela.innerText = agencija.brojTelefona;
  agencijaRow.appendChild(brojTelefonaTabela);
  // let destinacijeTabela = document.createElement("td");
  // destinacijeTabela.innerText = agencija.destinacije;
  // agencijaRow.appendChild(destinacijeTabela);
  let emailTabela = document.createElement("td");
  emailTabela.innerText = agencija.email;
  agencijaRow.appendChild(emailTabela);
  let godinaTabela = document.createElement("td");
  godinaTabela.innerText = agencija.godina;
  agencijaRow.appendChild(godinaTabela);
  let logoTabela = document.createElement("td");
  let logoImg = document.createElement("img");
  logoImg.src = agencija.logo;
  logoImg.referrerPolicy = "no-referrer";
  logoImg.style.setProperty("width", "100%");
  logoImg.style.setProperty("height", "100%");
  logoTabela.appendChild(logoImg);
  agencijaRow.appendChild(logoTabela);

  let nazivTabela = document.createElement("td");
  nazivTabela.innerText = agencija.naziv;
  agencijaRow.appendChild(nazivTabela);

  let editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.innerText = "Izmeni";
  editBtn.onclick = showEditPageAgencija;
  editBtn.setAttribute("data-id", id);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  agencijaRow.appendChild(editTd);

  let deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Obriši";
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  
  
  // Create the modal div element
  var modal = document.createElement("div");
  modal.id = "myModal";
  modal.className = "modal1";
  deleteTd.appendChild(modal);

// Create the modal content div element
var modalContent = document.createElement("div");
modalContent.className = "modal1-content";
modal.appendChild(modalContent);

// Create the paragraph element
var paragraph = document.createElement("p");
paragraph.textContent = "Da li ste sigurni da zelite da obrisete?";
modalContent.appendChild(paragraph);

// Create the "Da" button
var btnDa = document.createElement("button");
btnDa.id = "da";
btnDa.textContent = "Da";
modalContent.appendChild(btnDa);

// Create the "Ne" button
var btnNe = document.createElement("button");
btnNe.id = "ne";
btnNe.textContent = "Ne";
modalContent.appendChild(btnNe);

// Attach event handlers
deleteBtn.onclick = function () {
  modal.style.display = "block";
};

btnDa.onclick = function () {
  modal.style.display = "none";
  deleteagencija;
  console.log("obrisali smo ...");
};

btnNe.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
agencijaRow.appendChild(deleteTd);

document.getElementById(tBody).appendChild(agencijaRow);

}

function removeTableRows(tBodyId) {
  let tBody = document.getElementById(tBodyId);
  while (tBody.firstChild) {
    tBody.removeChild(tBody.lastChild);
  }
}


//------------------------DESTINACIJE-----------------------

let destinacije = {}; getSveDestinacije();

function getSveDestinacije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        
        try{removeTableRows("sveDestinacije");}
        catch{}
        

        destinacije = JSON.parse(request.responseText);
        console.log(destinacije);

        for (let id in destinacije) {
          let destinacije2 = destinacije[id];
          for(let id2 in destinacije2){
            let destinacija=destinacije2[id2]
            try {
              appendDestinacijaRow("sveDestinacije", id,id2, destinacija);
            } catch {} 

          }
        }
      } else {
        alert("Greška prilikom učitavanja svih destinacija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/destinacije.json");
  request.send();
}

function showEditPageDestinacije() {
  let clickedBtn = this;
  
  let destinacijaId = clickedBtn.getAttribute("data-id");
  let destinacijaId2 = clickedBtn.getAttribute("destinacijaId-id");
  window.location.href = "DestinacijaIzmena.html?id=" + destinacijaId+"&"+destinacijaId2;
}


function deleteDestinacija() {
  let clickedBtn = this;
  let destinacijaId = clickedBtn.getAttribute("data-id");
  let destinacijaId2 = clickedBtn.getAttribute("destinacijaId-id");
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getSveDestinacije();
      } else {
        alert("Greška prilikom brisanja destinacijaa.");
      }
    }
  };

  request.open("DELETE", firebaseUrl + "/destinacije/" + destinacijaId +"/"+destinacijaId2+ ".json");
  request.send();
}



function appendDestinacijaRow(tBody, id,id2, destinacija) {
  let destinacijaRow = document.createElement("tr");

  let cenaTabela = document.createElement("td");
  cenaTabela.innerText = destinacija.cena;
  destinacijaRow.appendChild(cenaTabela);
  let maxOsoobaTabela = document.createElement("td");
  maxOsoobaTabela.innerText = destinacija.maxOsoba;
  destinacijaRow.appendChild(maxOsoobaTabela);
  let nazivTabela = document.createElement("td");
  nazivTabela.innerText = destinacija.naziv;
  destinacijaRow.appendChild(nazivTabela);
  let opisTabela = document.createElement("td");
  opisTabela.innerText = destinacija.opis.substring(0,50)+"...";
  destinacijaRow.appendChild(opisTabela);
  let prevozTabela = document.createElement("td");
  prevozTabela.innerText = destinacija.prevoz;
  destinacijaRow.appendChild(prevozTabela);
 

  

 
  let editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.innerText = "Izmeni";
  editBtn.onclick = showEditPageDestinacije;
  editBtn.setAttribute("data-id", id);
  editBtn.setAttribute("destinacijaId-id", id2);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  destinacijaRow.appendChild(editTd);







  let deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Obriši";
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  
  
  // Create the modal div element
  var modal = document.createElement("div");
  modal.id = "myModal";
  modal.className = "modal1";
  deleteTd.appendChild(modal);

// Create the modal content div element
var modalContent = document.createElement("div");
modalContent.className = "modal1-content";
modal.appendChild(modalContent);

// Create the paragraph element
var paragraph = document.createElement("p");
paragraph.textContent = "Da li ste sigurni da zelite da obrisete?";
modalContent.appendChild(paragraph);

// Create the "Da" button
var btnDa = document.createElement("button");
btnDa.id = "da";
btnDa.textContent = "Da";
modalContent.appendChild(btnDa);

// Create the "Ne" button
var btnNe = document.createElement("button");
btnNe.id = "ne";
btnNe.textContent = "Ne";
modalContent.appendChild(btnNe);

// Attach event handlers
deleteBtn.onclick = function () {
  modal.style.display = "block";
};

btnDa.onclick = function () {
  modal.style.display = "none";
  deleteDestinacija;
  console.log("obrisali smo ...");
};

btnNe.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
destinacijaRow.appendChild(deleteTd);

document.getElementById(tBody).appendChild(destinacijaRow);

}
