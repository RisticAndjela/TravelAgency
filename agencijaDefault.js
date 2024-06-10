let firebaseUrl = "https://kt1-ar-default-rtdb.firebaseio.com/";

let IDagencija = getParamValue("id");
let agencija = {};
let agencije = {};
let destinacije = {};
var odredjeneDestinacije={};


function getSVeAgencije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        try {
          removeTableRows("sveAgencije");
        } catch {}

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
  for (let id in agencije) {
    if (id == IDagencija) {
      agencija = agencije[id];
      break;
    }
  }
 
  appendagencijaRow("informacije", agencija);
  naslov("naslov i logo", agencija);
  getSveDestinacije(karticeDestinacije); // Pass the callback function
}

function getParamValue(name) {
  let location = decodeURI(window.location.toString());
  let index = location.indexOf("?") + 1;
  let subs = location.substring(index, location.length);
  let splitted = subs.split("&");
  console.log(location);
  for (let i = 0; i < splitted.length; i++) {
    let s = splitted[i].split("=");
    let pName = s[0];
    let pValue = s[1];
    if (pName == name) {
      console.log(pValue);
      return pValue;
    }
  }
}

function appendagencijaRow(tBody, agencija) {
  let agencijaRow = document.createElement("tr");

  let adresaTabela = document.createElement("td");
  adresaTabela.innerText = agencija.adresa;
  agencijaRow.appendChild(adresaTabela);

  let brojTelefonaTabela = document.createElement("td");
  brojTelefonaTabela.innerText = agencija.brojTelefona;
  agencijaRow.appendChild(brojTelefonaTabela);

  let emailTabela = document.createElement("td");
  emailTabela.innerText = agencija.email;
  agencijaRow.appendChild(emailTabela);

  let godinaTabela = document.createElement("td");
  godinaTabela.innerText = agencija.godina;
  agencijaRow.appendChild(godinaTabela);

  document.getElementById(tBody).appendChild(agencijaRow);
}

function naslov(tBody, agencija) {
  let agencijaRow = document.createElement("div");
  agencijaRow.classList.add("naslovILogo")

  let logoTabela = document.createElement("img");
  logoTabela.src = agencija.logo;
  logoTabela.referrerPolicy="no-referrer"
  console.log(logoTabela);
  logoTabela.style.setProperty("height", "300px");
  logoTabela.style.setProperty("width", "300px");
  logoTabela.style.setProperty("border-radius", "50%");
  logoTabela.style.setProperty("justify-content", "center");
  logoTabela.style.setProperty("align-items", "center");


  agencijaRow.appendChild(logoTabela);

  let nazivTabela = document.createElement("h1");
  nazivTabela.innerText = agencija.naziv;
  nazivTabela.style.setProperty("margin-left", "25px");
  nazivTabela.style.setProperty("display", "flex");
  nazivTabela.style.setProperty("align-items", "center");
  agencijaRow.appendChild(nazivTabela);

  document.getElementById(tBody).appendChild(agencijaRow);
}

let brojac=0
function karticeDestinacije(destinacije,agencija) {
    let specificneDestinacije=destinacije[agencija.destinacije]
    console.log(specificneDestinacije);
    
    for (let id in specificneDestinacije){
      appenddestinacija2Row(id,specificneDestinacije[id])
      pravljenjeKartica(specificneDestinacije[id],id)
    }
}
function pravljenjeKartica(jednaDestinacija, id,gde="kartica") {
  let agencijaRow = document.createElement("div");
  let sveKarticeDiv = document.getElementById(gde);

   
  
  if(!agencijaRow.contains(document.getElementById(id))){

  let kartica = document.createElement("div");
  kartica.classList.add("sadrzajD");
  kartica.id=id

  let logoTabela = document.createElement("img");
  logoTabela.src = jednaDestinacija.slike[0];
  logoTabela.id = id;
  logoTabela.onclick = function() {
    showPageDestinacijaDefault(id);
  };
  logoTabela.referrerPolicy = "no-referrer";
  kartica.appendChild(logoTabela);

  let nazivTabela = document.createElement("p");
  nazivTabela.style.setProperty("white-space", "nowrap");
  nazivTabela.innerText = jednaDestinacija.naziv;
  nazivTabela.id = id;
  nazivTabela.onclick = function() {
    showPageDestinacijaDefault(id);
  };
  kartica.appendChild(nazivTabela);

  try{sveKarticeDiv.appendChild(kartica);}catch{}

  brojac++;
  sveKarticeDiv.appendChild(agencijaRow); 
}}


function showPageDestinacijaDefault(id){
  let destinacijaId = id;
  window.location.href = "destinacijaDefault.html?id=" + destinacijaId;
}

function getSveDestinacije(callback) {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        try {
          removeTableRows("sveDestinacije");
        } catch {}

        destinacije = JSON.parse(request.responseText);

        // Invoke the callback function with destinacije
        callback(destinacije,agencija);
      } else {
        alert("Greška prilikom učitavanja svih destinacija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/destinacije.json");
  request.send();
}

getSVeAgencije();








//-----------------------destinacije-----------------------




    

let ubaceneTip = [];
let ubacenePrevoz = [];
let destinacijeSve={}
function appenddestinacija2Row(id, destinacija2) {
  destinacijeSve[id]=destinacija2;

    let prevozContainer = document.getElementById("prevozContainer");
    let tipContainer = document.getElementById("tipContainer");
  
    if (!ubacenePrevoz.includes(destinacija2.prevoz)) {
      let prevozRow = document.createElement("div");
  
      let prevoz = document.createElement("input");
      prevoz.type = "checkbox";
      prevoz.id = `prevoz-${destinacija2.prevoz}`;
      prevoz.value = destinacija2.prevoz;
      prevozRow.appendChild(prevoz);
  
      let prevozLabel = document.createElement("label");
      prevozLabel.setAttribute("for", `prevoz-${destinacija2.prevoz}`);
      prevozLabel.innerText = destinacija2.prevoz;
      prevozRow.appendChild(prevozLabel);
  
      prevozContainer.appendChild(prevozRow);
      ubacenePrevoz.push(destinacija2.prevoz);
    }
  
    if (!ubaceneTip.includes(destinacija2.tip)) {
      let tipRow = document.createElement("div");
  
      let tip = document.createElement("input");
      tip.type = "checkbox";
      tip.id = `tip-${destinacija2.tip}`;
      tip.value = destinacija2.tip;
      tipRow.appendChild(tip);
  
      let tipLabel = document.createElement("label");
      tipLabel.setAttribute("for", `tip-${destinacija2.tip}`);
      tipLabel.innerText = destinacija2.tip;
      tipRow.appendChild(tipLabel);
  
      tipContainer.appendChild(tipRow);
      ubaceneTip.push(destinacija2.tip);
    }
  }
  

  function getCheckedValues() {
    let divRezultati= document.getElementById("sviRezultati")
    divRezultati.innerText=""
    let filtriraneDestinacije={};

    let checkedPrevoz = [];
    let checkedTip = [];
  
    let prevozCheckboxes = document.querySelectorAll("#prevozContainer input[type='checkbox']");
    prevozCheckboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedPrevoz.push(checkbox.value);
      }
    });
  
    let tipCheckboxes = document.querySelectorAll("#tipContainer input[type='checkbox']");
    tipCheckboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedTip.push(checkbox.value);
      }
    });
  
    console.log("Checked Prevoz:", checkedPrevoz);
    console.log("Checked Tip:", checkedTip);
    
    for (let id in destinacijeSve) {
      let destinacijaJedna=destinacijeSve[id];
      if(checkedPrevoz!=[]){
        if(checkedPrevoz.includes(destinacijaJedna.prevoz)){
          if(checkedTip!=[]){
            if(checkedTip.includes(destinacijaJedna.tip)){
              filtriraneDestinacije[id]=destinacijaJedna
            }
          }
        }
        
      }
      if(checkedPrevoz!=[]){
        if(checkedPrevoz.includes(destinacijaJedna.prevoz)){
          if(checkedTip.length === 0){
            filtriraneDestinacije[id]=destinacijaJedna          
          }
        }}
        
        if(checkedTip!=[]){
          if(checkedTip.includes(destinacijaJedna.tip)){
            if(checkedPrevoz.length === 0){
                    filtriraneDestinacije[id]=destinacijaJedna
                }
            }
        }
        if(checkedPrevoz.length === 0 && checkedTip.length === 0){
          filtriraneDestinacije[id]=destinacijaJedna
        }
    
    }
    let prethodneAgencije=document.getElementById("kartica")
    prethodneAgencije.style.display="none"
    let paragarf= document.getElementById("Rezultat")
    paragarf.style.display="block"
    if (Object.keys(filtriraneDestinacije).length!=0){
    for(let id2 in filtriraneDestinacije){
      console.log(filtriraneDestinacije[id2])
      pravljenjeKartica(filtriraneDestinacije[id2],id2,"sviRezultati")
    }}
    else {
      let poruka= document.createElement("p");
      poruka.innerText="Agencija Vam ne pruza destinacije sa zadatim filterima"

      divRezultati.appendChild(poruka);
    }
    
}

function otvoriFiltere(){
    let filteriDiv=document.getElementById("filteri");
    if(filteriDiv.style.display=="inline-block"){
        filteriDiv.style.display="none";
    }
    else{
        filteriDiv.style.display="inline-block";
    }
}



