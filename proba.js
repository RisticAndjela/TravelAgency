let firebaseUrl ='https://kt1-ar-default-rtdb.firebaseio.com/'

let agencije = {}; 
getSVeAgencije();

function getSVeAgencije() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        

        agencije = JSON.parse(request.responseText);
        //console.log(agencije);

        for (let id in agencije) {
          let agencija = agencije[id];
         
         try {
          appendagencijaRow("sveAgencije",id, agencija); 
          getSVeDestinacije3(agencija.destinacije);
        } catch { }
         } 
      } else {
        alert("Greška prilikom učitavanja svih agencija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/agencije.json");
  request.send();
}

var brojac = 0;
function appendagencijaRow(tBody,id, agencija) {
  let sveAgencije = document.getElementById(tBody);

    if (brojac % 3 === 0 )  {
      let newRow = document.createElement("div");
      newRow.classList.add("row1"); 
      sveAgencije.appendChild(newRow);
    }

  

  let currentRow = sveAgencije.lastElementChild;
  let agencijaDiv = document.createElement("div");
  
  let logoTabela = document.createElement("img");
  logoTabela.src = agencija.logo;
  logoTabela.referrerPolicy="no-referrer"
  logoTabela.id = id;
  logoTabela.onclick = function() {
    showPageAgencijaDefault(id);
  };
  agencijaDiv.appendChild(logoTabela);

  let nazivTabela = document.createElement("p");
  nazivTabela.innerText = agencija.naziv;
  nazivTabela.id = id;
  nazivTabela.onclick = function() {
    showPageAgencijaDefault(id);
  };
  agencijaDiv.appendChild(nazivTabela);

  let destinacijeDiv=document.createElement("p")
  destinacijeDiv.id=agencija.destinacije
  destinacijeDiv.style.display="none"
  agencijaDiv.appendChild(destinacijeDiv)
  
  
  currentRow.appendChild(agencijaDiv);
  

  brojac++;
}


function showPageAgencijaDefault(id){
  let agencijaId = id;
  window.location.href = "agencijaDefault.html?id=" + agencijaId;
}







let destinacije={}
let naziviSpecificnihDestinacija=[]
function getSVeDestinacije3(destinacijeID) {
  let request = new XMLHttpRequest();
  
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        destinacije = JSON.parse(request.responseText);
        while (naziviSpecificnihDestinacija.length > 0) {
          naziviSpecificnihDestinacija.pop();
        }
       
        for (let id in destinacije) {
          if (id == destinacijeID) {
            for (let id2 in destinacije[id]) {
              naziviSpecificnihDestinacija.push(destinacije[id][id2].naziv);
            }
          }
        }

        //console.log(naziviSpecificnihDestinacija);

        let paragrafDestinacije = '';
        for (let i = 0; i < naziviSpecificnihDestinacija.length; i++) {
          paragrafDestinacije += naziviSpecificnihDestinacija[i];

          // Add comma after every element except the last one
          if (i !== naziviSpecificnihDestinacija.length - 1) {
            paragrafDestinacije += ', ';
          }
        }

        let div = document.getElementById(destinacijeID);
        div.textContent = paragrafDestinacije;

      } else {
        alert("Greška prilikom učitavanja svih destinacija.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/destinacije.json");
  request.send();
}

let pronadjenoID=[]
function Pretraga(){
  while(pronadjenoID.length>0){
    pronadjenoID.pop;
  }
  let sakri=document.getElementById("sveAgencije")
  sakri.style.display="none"
  let prikazi=document.getElementById("rezultatiPretrage")
  prikazi.style.display="block"
  var input =document.getElementById("myInput")
  var inputValue=input.value;
  let inputValuMalaSlova=inputValue.toLowerCase()
  //console.log(inputValue)
  let paragrafi = document.getElementsByTagName('p');
  for (let i = 0; i < paragrafi.length-1; i++) {
    let tekst = paragrafi[i].innerText;
    let tekstMalaSlova=tekst.toLowerCase();
    //console.log(tekst);
    if(tekstMalaSlova.includes(inputValuMalaSlova)){
      if(!pronadjenoID.includes(paragrafi[i].id)){
        pronadjenoID.push(paragrafi[i].id)
      }
      }
    }
    let sveUpotrbljivo={}
    for(let i in pronadjenoID){
      for(let m in agencije){
        if(pronadjenoID[i]==m){
          sveUpotrbljivo[m]=agencije[m]
        }
        else{
          for(let n in destinacije){
            if(pronadjenoID[i]==n){
                if(agencije[m].destinacije==n){
                  sveUpotrbljivo[m]=agencije[m]
    
            }
          }
        }  
      }
    }
  }

  if(Object.keys(sveUpotrbljivo).length!=0){
  
    for(let i in sveUpotrbljivo){
      appendagencijaRow("rezultatAgencije",i,sveUpotrbljivo[i])
    }
  }
  else{
    let poruka=document.createElement("p")
    poruka.innerText="Nismo uspeli da pronadjemo ni jednu agenciju sa datim nazivom ili destinacijom :"+tekst;
    let divdiv=document.getElementById("rezultatAgencije")
    divdiv.appendChild(poruka)
  }
}


