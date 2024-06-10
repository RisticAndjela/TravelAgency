
let ID = getParamValue("id");

if(ID==0){
    let postoji=document.getElementById(trazimID);
    var IDagencije=postoji.innerText
}
else{
    
    var IDagencije = ID[0];
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
    if (pName != name) {
      return 0;
    }
    else{
        let sacuvajID=document.getElementById("trazimID")
        sacuvajID.innerText=pValue;
        return pValue;

    }
  }
}
  
  


function napravi() {
  
    var nazivInput = document.getElementById('naziv');
    var cenaInput = document.getElementById('cena');
    var maxOsobaInput = document.getElementById('maxOsoba');
    var opisInput = document.getElementById('opis');
    var prevozInput = document.getElementById('prevoz');
    var slikeInput = document.getElementById('slike');

    var naziv = nazivInput.value;
    var cena = cenaInput.value;
    var maxOsoba = maxOsobaInput.value;
    var opis = opisInput.value;
    var prevoz = prevozInput.value;
    var slike = slikeInput.value;
  
    let errorMsg3 = document.getElementById('error-message3');
    
      if (naziv == "") {
        errorMsg3.innerText = "Niste popunili sva polja";
        return; 
      } 
      if (cena == "") {
        errorMsg3.innerText = "Niste popunili sva polja";
        return; 
      } 
      else if(isNaN(cena) === true){
        errorMsg3.innerText = "Cena treba da je broj";
        return; 
      }
      if (maxOsoba == "") {
        errorMsg3.innerText = "Niste popunili sva polja";
        return; 
      } 
      else if(isNaN(maxOsoba) === true){
        errorMsg3.innerText = "Maksimalan broj osoba treba da je broj";
        return; 
      }
      if (opis == "") {
        errorMsg3.innerText = "Niste popunili sva polja";
        return; 
      } if (prevoz == "") {
        errorMsg3.innerText = "Niste popunili sva polja";
        return; 
      } if (slike == "") {
        errorMsg3.innerText = "Niste popunili sva polja";
        return; 
      } 
  
    errorMsg3.innerText = "Uspesno ste napravili destinaciju";
    var destinacija = {
      naziv: naziv,
      cena: cena,
      maxOsoba: maxOsoba,
      opis: opis,
      prevoz: prevoz,
      slike: slike,
      
    };
  console.log(destinacija)
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Destinacija uspesno sacuvan");
      }
    };
  
    request.open("POST", "https://kt1-ar-default-rtdb.firebaseio.com/destinacije/"+IDagencije+".json");
    request.send(JSON.stringify(destinacija));
  }