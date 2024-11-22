// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code


let target = prompt("Give me a city");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const main = document.querySelector("main");
const tableID = document.getElementById("table");
const citiesID = document.getElementById("cities");
const linksID = document.getElementById("links");
const cityFound = findCity(target);
const closestSpan = document.getElementById("closest");
const furthestSpan = document.getElementById("furthest");


// Funktion för att hitta en stad i databasen
function findCity(target) {
    let foundCity = null;
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === target) {
            foundCity = cities[i];
            break; // Avbryt loopen om staden hittas
        }
    }
    return foundCity;
}

// Funktion för att hitta den närmaste staden
function findClosestCity(targetCity) {
    let closestDistance = Infinity;
    let closestCity = null;

    for (let i = 0; i < distances.length; i++) {
        let d = distances[i];
        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            let otherCityId = d.city1 === targetCity.id ? d.city2 : d.city1;

            for (let j = 0; j < cities.length; j++) {
                if (cities[j].id === otherCityId) {
                    if (d.distance < closestDistance) {
                        closestDistance = d.distance;
                        closestCity = cities[j];
                    }
                }
            }
        }
    }

    return { city: closestCity, distance: closestDistance };
}

// Funktion för att hitta den längst bort liggande staden
function findFurthestCity(targetCity) {
    let furthestDistance = -Infinity;
    let furthestCity = null;

    for (let i = 0; i < distances.length; i++) {
        let d = distances[i];
        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            let otherCityId = d.city1 === targetCity.id ? d.city2 : d.city1;

            for (let j = 0; j < cities.length; j++) {
                if (cities[j].id === otherCityId) {
                    if (d.distance > furthestDistance) {
                        furthestDistance = d.distance;
                        furthestCity = cities[j];
                    }
                }
            }
        }
    }

    return { city: furthestCity, distance: furthestDistance };
}


// Kontrollera om staden hittades
if (cityFound === null) {
    h2.textContent = target + " finns inte i databasen";
    document.title = "Not found";
} else {
    h2.textContent = cityFound.name + " (" + cityFound.country + ")";
    document.title = cityFound.name;
}

let closest = null;
let furthest = null;

if (cityFound !== null) {
    closest = findClosestCity(cityFound);
    furthest = findFurthestCity(cityFound);
}

// Uppdatera span-taggar för närmaste och längst bort-städer
if (closest !== null && closest.city !== null) {
    closestSpan.textContent = closest.city.name; // Endast namn
} else {
    h3.textContent = null}

if (furthest !== null && furthest.city !== null) {
    furthestSpan.textContent = furthest.city.name; // Endast namn
} else {
    h3.textContent = null
}

// Skapa rutorna för alla städer
citiesID.innerHTML = ""; // Töm innehållet innan städer läggs till

for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    let cityElement = document.createElement("p");
    cityElement.classList.add("cityBox");

    // Markera den sökta staden
    if (cityFound !== null && city.name === target) {
        cityElement.classList.add("target");
    }

    // Markera närmaste staden
    if (closest !== null && closest.city !== null && city.id === closest.city.id) {
        cityElement.classList.add("closest");
        cityElement.textContent = city.name + " ligger " + closest.distance + " mil bort";
    }
    // Markera längst bort staden
    else if (furthest !== null && furthest.city !== null && city.id === furthest.city.id) {
        cityElement.classList.add("furthest");
        cityElement.textContent = city.name + " ligger " + furthest.distance + " mil bort";
    }
    // Om staden inte är närmast eller längst bort
    else {
        cityElement.textContent = city.name;
    }

    citiesID.appendChild(cityElement);
}



// tabell

tableID.innerHTML = `<div class="cell head_row"></div>`
for (let i = 0; i < cities.length; i++){
   tableID.innerHTML+= `<div class="cell head_row">${cities[i].id}</div>`;
}

for (let i = 0; i < cities.length; i++){
    if (i % 2=== 0 ){
        tableID.innerHTML+= `<div class="cell head_column even_row">${cities[i].id}-${cities[i].name}</div>`  
    }
    else{
        tableID.innerHTML+= `<div class="cell head_column">${cities[i].id}-${cities[i].name}</div>`  
    }
    
    for (let j = 0; j < cities.length; j++){
        if (i === j){
            tableID.innerHTML += `<div class="cell even_col"></div>`;
        }

        else {
            let distance = ""
            for (const d of distances){
            if ((d.city1 === i && d.city2 === j) || (d.city1 === j && d.city2 === i)){
            distance = d.distance
            break
            }
        }
       if( j % 2 === 0) {
        tableID.innerHTML += `<div class="cell even_col">${distance /10 }</div>`;
       }
       else if ( i % 2 === 0 ){
        tableID.innerHTML += `<div class="cell  even_row">${distance /10 }</div>`; }
       else {
        tableID.innerHTML += `<div class="cell">${distance /10 }</div>`;       }
        }
    }
}

