let firebaseUrl = "https://kt1-ar-default-rtdb.firebaseio.com/";
let IDdestinacija = getParamValue("id");
let destinacija = {};
let agencije = {};
let destinacije = {};
let agencija = {};
let IDagencija="";

function getSVeDestinacije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        destinacije = JSON.parse(request.responseText);
        getDestinacija();
        getSVeAgencije();
      } else {
        alert("Greška prilikom učitavanja svih destinacija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/destinacije.json");
  request.send();
}

function getDestinacija() {
  for (let j in destinacije) {
    for (let id in destinacije[j]) {
      if (id == IDdestinacija) {
        destinacija = destinacije[j][id];
        break;
      }
    }
  }

}

function getParamValue(name) {
  let location = decodeURI(window.location.toString());
  let index = location.indexOf("?") + 1;
  let subs = location.substring(index, location.length);
  let splitted = subs.split("&");
  for (let i = 0; i < splitted.length; i++) {
    let s = splitted[i].split("=");
    let pName = s[0];
    let pValue = s[1];

    if (pName == name) {
      return pValue;
    }
  }
  return null
}

function getSVeAgencije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        agencije = JSON.parse(request.responseText);
        getAgenciju();
      } else {
        alert("Greška prilikom učitavanja svih agencija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/agencije.json");
  request.send();
  
}
function getAgenciju() {
  for (let a in agencije) {
    if (agencije.hasOwnProperty(a)) {
      let trazimIDd = agencije[a].destinacije;
      for (let j in destinacije) {
        if (destinacije.hasOwnProperty(j)) {
          let destinacijaObj = destinacije[j];
          for (let id in destinacijaObj) {
            if (id === IDdestinacija && trazimIDd == j) {
              agencija = agencije[a];
              IDagencija = a;
              console.log(IDagencija)
              naslov("naslov", destinacija);
              appendDestinacijaRow("informacije", destinacija);
              ubaciSLike("prostor za slike")
              ubaciOpis("opis")
            }
          }
        }
      }
    }
  }
}

getSVeDestinacije();

function naslov(tBody, destinacija) {
  let naslovElement = document.getElementById(tBody);
  if (naslovElement) {
    naslovElement.innerText = destinacija.naziv;
  }
}

function appendDestinacijaRow(tBody, destinacija) {
  let tabelaElement = document.getElementById(tBody);
  if (!tabelaElement) {
    return;
  }

  let destinacijaRow = document.createElement("tr");

  let cenaTabela = document.createElement("td");
  cenaTabela.innerText = destinacija.cena;
  destinacijaRow.appendChild(cenaTabela);

  let maxOsobaTabela = document.createElement("td");
  maxOsobaTabela.innerText = destinacija.maxOsoba;
  destinacijaRow.appendChild(maxOsobaTabela);

  let prevozTabela = document.createElement("td");
  prevozTabela.innerText = destinacija.prevoz;
  destinacijaRow.appendChild(prevozTabela);

  console.log(agencija);
  
  let agencijaDugme = document.createElement("button");
  agencijaDugme.type = "button";
  agencijaDugme.style.setProperty("background-color", "inherit")
  agencijaDugme.style.setProperty("border", "none")
  agencijaDugme.style.setProperty("font", "inherit")
  agencijaDugme.style.setProperty("color", "inherit")
  agencijaDugme.style.setProperty("cursor", "pointer")
  agencijaDugme.innerText = agencija.naziv;
  agencijaDugme.onclick = function() {
    showPageAgencijaDefault(IDagencija);
  };

  let agencijaTabela = document.createElement("td");
  agencijaTabela.appendChild(agencijaDugme);
  destinacijaRow.appendChild(agencijaTabela);

  tabelaElement.appendChild(destinacijaRow);
}

function showPageAgencijaDefault(id) {
  window.location.href = "agencijaDefault.html?id=" + id;
}


function ubaciSLike(tBody){

    let ul = document.createElement('ul');
    ul.id = 'slike';
    ul.classList.add('slides');

    let imageUrls = destinacija.slike

    // Create the <li> elements for each image
    for (let i = 0; i < imageUrls.length; i++) {
    let input = document.createElement('input');
    input.type = 'radio';
    input.name = 'radio-btn';
    input.id = `img-${i + 1}`;
    if (i === 0) {
        input.checked = true;
    }

    // Create the <li> element
    let li = document.createElement('li');
    li.classList.add('slide-container');

    // Create the <div> element for the slide
    let slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');
    
    // Create the <img> element
    let img = document.createElement('img');
    img.src = imageUrls[i];
    img.referrerPolicy="no-referrer"
    // Append the <img> to the slide <div>
    slideDiv.appendChild(img);
    
    // Create the <div> element for navigation
    let navDiv = document.createElement('div');
    navDiv.classList.add('nav');
    
    // Create the "previous" label
    let prevLabel = document.createElement('label');
    prevLabel.htmlFor = `img-${i === 0 ? imageUrls.length : i}`;
    prevLabel.classList.add('prev');
    prevLabel.innerHTML = '&#x2039;';
    
    // Create the "next" label
    let nextLabel = document.createElement('label');
    nextLabel.htmlFor = `img-${i === imageUrls.length - 1 ? 1 : i + 2}`;
    nextLabel.classList.add('next');
    nextLabel.innerHTML = '&#x203a;';
    
    // Append the labels to the navigation <div>
    navDiv.appendChild(prevLabel);
    navDiv.appendChild(nextLabel);
    
    // Append the slide <div> and navigation <div> to the <li> element
    li.appendChild(slideDiv);
    li.appendChild(navDiv);
    
    // Append the input and <li> to the parent <ul> element
    ul.appendChild(input);
    ul.appendChild(li);
    }

    // Create the <li> element for navigation dots
    let navDotsLi = document.createElement('li');
    navDotsLi.classList.add('nav-dots');

    // Create the navigation dots labels
    for (let i = 0; i < imageUrls.length; i++) {
    let dotLabel = document.createElement('label');
    dotLabel.htmlFor = `img-${i + 1}`;
    dotLabel.classList.add('nav-dot');
    dotLabel.id = `img-dot-${i + 1}`;
    
    navDotsLi.appendChild(dotLabel);
    }

    // Append the navigation dots <li> to the parent <ul> element
    ul.appendChild(navDotsLi);

    // Append the <ul> element to the document body
    document.getElementById(tBody).appendChild(ul);

    }

function ubaciOpis(tBody){
    let opisElement = document.getElementById(tBody);
  if (opisElement) {
    opisElement.innerText = destinacija.opis;
    opisElement.style.setProperty("text-align","justify")
}
}