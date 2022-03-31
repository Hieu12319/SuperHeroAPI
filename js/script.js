// make superhero key variable
const key = 4918461728208751;
//make a function to get the hero Id
function getHero() {
    
  
    const inputId = document.querySelector(".input-id");
    const id = inputId.value;
    console.log(id);
  
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const URL = `https://superheroapi.com/api/${key}/${id}`;
  
    fetch(proxyUrl + URL).then(response =>
        response.json().then(data => {
          console.log(data);
          buildHero(data);
          openHero();
        })
      );
    }
  //make a container for hero information
  function buildHero(data) {
    let heroContainer = document.querySelector(".hero-container");
  
     let heroBuild = "";
  
     heroBuild = `
     <span onclick="closeHero()" class="closer-hero flex-center">X</span>
     <img src="${data.image.url}" alt="${data.name}">
     <h3>${data.name}, ${data.biography["full-name"]}</h3>
     `;
   heroBuild =
     heroBuild +
     buildBiography(data.biography) +
     buildAppearance(data.appearance) +
     `<div class="info-hero powerstats">
       <h1>Power Stats</h1>
     `;
     console.log(heroBuild);
  
    heroContainer.innerHTML = heroBuild;
       buildPowerstats(data.powerstats);
  }
  // make section for biography 
  function buildBiography(biography) {
    let divBio = `
      <div class="info-hero biography">
        <h1>Biography</h1>
        <p>HomeTown: ${biography["place-of-birth"]}</p>
        <p>Publisher: ${biography.publisher}</p>
        <p>First-Appearance: ${biography["first-appearance"]}</p>
        <p>Alter-Egos: ${biography["alter-egos"]}</p>
      </div>
      `
    console.log(divBio);

    return divBio;
 
  }
  
  function buildAppearance(profile) {
    let divAppear = `
      <div class="info-hero profile">
        <h1>Profile</h1>
        
        <p>Eye Color: ${profile["eye-color"]}</p>
        <p>Hair Color: ${profile["hair-color"]}</p>
        <p>Heigth: ${profile.height[0]}</p>
        <p>Weight: ${profile.weight[0]}</p>
        <p>Race: ${profile.race}</p>

      </div>
      `;
    return divAppear;
  }
  // make another div for the powerstats 
  function buildPowerstats(powerstats) {
    const powerTypes = ["combat","durability","intelligence","power","speed","strength"];
  
    let divPower = document.querySelector(".powerstats");
  
    let powers = "<h1>Power Stats</h1>";
  //make a for loop for a powerstats progressbar;just like hp in games
    for(i = 0; i < powerTypes.length; i++){
      powers = powers + `
      <p>${powerTypes[i]}</p>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${powerstats[powerTypes[i]]}%;" aria-valuenow="${powerstats[powerTypes[i]]}" aria-valuemin="0"
          aria-valuemax="100">${powerstats[powerTypes[i]]}</div>
      </div>
      `
    }
  
    divPower.innerHTML = powers;
  }
  
  // FUNCTIONS TOOGLE HERO INFORMATIONS
  var heroContainer = document.querySelector(".hero-container");
  
  function openHero() {
    heroContainer.id = "open-hero";
  }
  
  function closeHero() {
    heroContainer.id = "";
  }