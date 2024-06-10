


//---------------------------agencije1--------------------------------


let agencije1 = {}; 
getSVeagencije1();

function getSVeagencije1() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        
        try{removeTableRows("sveagencije1");}catch{}

        agencije1 = JSON.parse(request.responseText);
        

        for (let id in agencije1) {
          let agencija = agencije1[id];
          appendagencijaRow1("listaAgencija",id,agencija)
        }}}
  };

  request.open("GET", "https://kt1-ar-default-rtdb.firebaseio.com/" + "/agencije.json");
  request.send();
}


function appendagencijaRow1(tBody, id, agencija) {
  let agencijaRow = document.createElement("li");
    agencijaRow.style.setProperty("display","block");
    agencijaRow.style.setProperty("padding","2%");
    agencijaRow.style.setProperty("word-break","keep-all");

    
  let nazivTabela = document.createElement("a");
  nazivTabela.innerText = agencija.naziv;
  nazivTabela.id=id
  nazivTabela.onclick = function() {
    showPageAgencijaDefault(id);
  };
  agencijaRow.appendChild(nazivTabela);
  

  document.getElementById(tBody).appendChild(agencijaRow);
}

function showPageAgencijaDefault(id){
  let agencijaId = id;
  window.location.href = "../agencijaDefault.html?id=" + agencijaId;
}

//------------------------destinacije1-----------------------

let destinacije1 = {}; getSvedestinacije1();

function getSvedestinacije1() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        
        try{removeTableRows("listaDestinacija");}
        catch{}

        destinacije1 = JSON.parse(request.responseText);
        
        for (let id in destinacije1) {
            let destinacije2 = destinacije1[id];
            for(let id2 in destinacije2){
              let destinacija1=destinacije2[id2]
              try {
                appenddestinacija1Row("listaDestinacija", id2, destinacija1);
              } catch {
                
              } 
  
            }
          }
      }
    }
  };

  request.open("GET", "https://kt1-ar-default-rtdb.firebaseio.com/" + "/destinacije.json");
  request.send();
}
  let ubacene = [];

  function appenddestinacija1Row(tBody, id, destinacija1) {
    let destinacija1Row = document.createElement("li");
    destinacija1Row.style.setProperty("display", "block");
    destinacija1Row.style.setProperty("padding", "0%");
    destinacija1Row.style.setProperty("word-break", "keep-all");
  
    let nazivTabela = document.createElement("a");
    nazivTabela.innerText = destinacija1.naziv;
    nazivTabela.id=id
    nazivTabela.addEventListener("click", function() {
      showPagedestinacija1Default(id);
    });
    if (!ubacene.includes(destinacija1.naziv)) {
      ubacene.push(destinacija1.naziv);
      destinacija1Row.appendChild(nazivTabela);
    } 
  
    let tip = destinacija1.tip;
  
    let rowId = `row-${tip}`;
    let rowElement = document.getElementById(rowId);
    if (!rowElement) {
  
      let listElement = document.createElement("a");
      listElement.classList.add("navDropdown");
      listElement.innerText = tip;
      listElement.addEventListener("click", function() {
        showDestinacije(tip);
      });
      // listElement.addEventListener("mouseleave", function() {
      //   hideDestinacije(tip);
      // });
      document.getElementById(tBody).appendChild(listElement);
  
      rowElement = document.createElement("ul");
      rowElement.id = rowId;
      rowElement.style.display = "none"; 
      rowElement.style.marginLeft = "100px";
      rowElement.style.marginTop = "-28px";
      document.getElementById(tBody).appendChild(rowElement);
    }
  
    // Append the destination to the corresponding row
    rowElement.appendChild(destinacija1Row);
  }

  function showDestinacije(tip) {
    let ulElement = document.getElementById(`row-${tip}`);
    if(ulElement.style.display == "block"){
      ulElement.style.display = "none"
    }
    else{
      ulElement.style.display = "block";
    }
    
  }

function showPagedestinacija1Default(id){
  let destinacijaId = id;
  window.location.href = "../destinacijaDefault.html?id=" + destinacijaId;
}



// -----------------prijava i registracija-------------------
function submitForm() {
  var korisnickoImeInput = document.getElementById('korisnicko ime prijava');
  var lozinkaInput = document.getElementById('lozinka prijava');

  var korisnickoIme1 = korisnickoImeInput.value;
  var lozinka1 = lozinkaInput.value;

  console.log('Korisničko ime:', korisnickoIme1);
  console.log('Lozinka:', lozinka1);




  let korisniCi={}
   let request = new XMLHttpRequest();

   request.onreadystatechange = function () {
     if (this.readyState == 4) {
       if (this.status == 200) {
         
         korisniCi = JSON.parse(request.responseText);
        let poruka=""
        let korisniK={}
        for (let i in korisniCi){
          if(korisniCi[i].korisnickoIme == korisnickoIme1){
            korisniK=korisniCi[i]
            }}

        if(lozinka1==""||korisnickoIme1==""){
          poruka="Niste uneli sva polja"
          console.log(poruka)
        }
        else if (Object.keys(korisniK).length === 0){
          poruka="Nismo pronasli korisnika sa tim korisnickim imenom"
            console.log(poruka)
        }
        else if(korisniK.lozinka==lozinka1){
          poruka="uspesno ste prijavljeni"
            console.log(poruka)
          }
        else if(korisniK.lozinka!=lozinka1){
          poruka="Pogresna lozinka"
              console.log(poruka)
          }
          let errorMsg= document.getElementById('error-message');
          errorMsg.innerText=poruka
        
        
        } 
      
      
      }
      
      }
    
    
    request.open("GET",  "https://kt1-ar-default-rtdb.firebaseio.com/" + "/korisnici.json");
    request.send();
    
  }

  function submitRegistracija() {
    var imeInput = document.getElementById('ime-registracija');
    var prezimeInput = document.getElementById('prezime-registracija');
    var korisnickoImeInput1 = document.getElementById('korisnicko-ime-registracija');
    var lozinkaInput1 = document.getElementById('lozinka-registracija');
    var emailInput = document.getElementById('email-registracija');
    var datumInput = document.getElementById('datum-rodjenja-registracija');
    var adresaInput = document.getElementById('adresa-registracija');
    var gradInput = document.getElementById('grad-registracija');
    var postBrojInput = document.getElementById('postanski-broj-registracija');
    var telefonInput = document.getElementById('telefon-registracija');
  
    var korisnickoIme2 = korisnickoImeInput1.value;
    var lozinka2 = lozinkaInput1.value;
    var ime = imeInput.value;
    var prezime = prezimeInput.value;
    var email = emailInput.value;
    var datum = datumInput.value;
    var adresa = adresaInput.value;
    var grad = gradInput.value;
    var postBroj = postBrojInput.value;
    var telefon = telefonInput.value;
  
    let errorMsg2 = document.getElementById('error-message2');
    var lista = [korisnickoIme2, lozinka2, ime, prezime, email, datum, adresa, grad, postBroj, telefon];
    for (let i in lista) {
      if (lista[i] === "") {
        errorMsg2.innerText = "Niste popunili sva polja";
        return; // Exit the function if any field is empty
      } else if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email) === false) {
        errorMsg2.innerText = "Email nije dobrog oblika";
        return; // Exit the function if email format is incorrect
      } else if (isNaN(telefon) === true) {
        errorMsg2.innerText = "Telefon nije dobrog oblika";
        return; // Exit the function if telefon format is incorrect
      } else if (isNaN(postBroj) === true) {
        errorMsg2.innerText = "Postanski broj nije dobrog oblika";
        return; // Exit the function if postanski broj format is incorrect
      }
    }
  
    errorMsg2.innerText = "Uspesno ste se registrovali";
    var korisnik = {
      ime: ime,
      prezime: prezime,
      korisnickoIme: korisnickoIme2,
      lozinka: lozinka2,
      email: email,
      datumRodjenja: datum,
      adresa: adresa + "," + grad + "," + postBroj,
      telefon: telefon
    };
  
    // Save the "korisnik" object in Firebase
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Korisnik uspesno sacuvan");
      }
    };
  
    request.open("POST", "https://kt1-ar-default-rtdb.firebaseio.com/korisnici.json/");
    request.send(JSON.stringify(korisnik));
  }
  
function resetRegistracija(){
  var korisnickoImeInput1 = document.getElementById('korisnicko-ime-registracija');
  var lozinkaInput1 = document.getElementById('lozinka-registracija');
  var imeInput = document.getElementById('ime-registracija');
  var prezimeInput= document.getElementById('prezime-registracija');
  var emailInput = document.getElementById('email-registracija');
  var datumInput = document.getElementById('datum-rodjenja-registracija');
  var adresaInput = document.getElementById('adresa-registracija');
  var gradInput=document.getElementById('grad-registracija')
  var postBrojInput=document.getElementById('postanski-broj-registracija')
  var telefonInput = document.getElementById('telefon-registracija');
  let errorMsg2= document.getElementById('error-message2');
  var lista=[imeInput,lozinkaInput1,korisnickoImeInput1,prezimeInput,emailInput,datumInput,adresaInput,gradInput,postBrojInput,telefonInput]
   for(let i in lista){
  lista[i].value=""}
  errorMsg2.innerText=""

}
 