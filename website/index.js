// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

let target = prompt("Give me a city");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const main = document.querySelector("main");
const tableID = document.getElementById("table");
const citiesID = document.getElementById("cities");
const linksID = document.getElementById("links");
const closestSpan = document.getElementById("closest");
const furthestSpan = document.getElementById("furthest");
const body = document.querySelector("body")

// Recommended: Ask for the city name and then the rest of the code


// Funktion för att hitta en stad
const cityFound = findCity(target);
function findCity(target) {
    let foundCity = null;

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === target) {
            foundCity = cities[i];
        }
    }
    return foundCity;
}

// Funktion för att hitta närmaste staden
function findClosestCity(targetCity) {
    let closestCity = null;
    let closestDistance = Infinity;

    for (let i = 0; i < distances.length; i++) {
        let d = distances[i];

        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            let otherCityId = d.city1 === targetCity.id ? d.city2 : d.city1;

            for (let j = 0; j < cities.length; j++) {
                if (cities[j].id === otherCityId) {
                    if (d.distance < closestDistance) {
                        closestCity = cities[j];
                        closestDistance = d.distance;
                    }
                }
            }
        }
    }

    return { city: closestCity, distance: closestDistance };
}

// Funktion för att hitta längst bort staden
function findFurthestCity(targetCity) {
    let furthestCity = null;
    let furthestDistance = -Infinity;

    for (let i = 0; i < distances.length; i++) {
        let d = distances[i];

        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            let otherCityId = d.city1 === targetCity.id ? d.city2 : d.city1;

            for (let j = 0; j < cities.length; j++) {
                if (cities[j].id === otherCityId) {
                    if (d.distance > furthestDistance) {
                        furthestCity = cities[j];
                        furthestDistance = d.distance;
                    }
                }
            }
        }
    }

    return { city: furthestCity, distance: furthestDistance };
}


if (cityFound === null) {
    h2.textContent = target + " finns inte i databasen";
    document.title = "Not found";
} else {
    h2.textContent = cityFound.name + " (" + cityFound.country + ")";
    document.title = cityFound.name;
}

// Hitta närmaste och längst bort-städer
let closest = null;
let furthest = null;

if (cityFound !== null) {
    closest = findClosestCity(cityFound);
    furthest = findFurthestCity(cityFound);
}

// Visa närmaste och längst bort-städer i h3
if (closest !== null && closest.city !== null) {
    closestSpan.textContent = closest.city.name;
} else {
    h3.textContent = null;
}

if (furthest !== null && furthest.city !== null) {
    furthestSpan.textContent = furthest.city.name;
} else {
    h3.textContent = null;
}

// Skapa rutorna för städerna
for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    let cityElement = document.createElement("p");
    cityElement.classList.add("cityBox");


    if (cityFound !== null) {
        if (city.name === target) {
            cityElement.classList.add("target");
        }
        if (closest !== null && closest.city !== null && city.id === closest.city.id) {
            cityElement.classList.add("closest");
            cityElement.textContent = city.name + " ligger " + closest.distance + " mil bort";
        } else if (furthest !== null && furthest.city !== null && city.id === furthest.city.id) {
            cityElement.classList.add("furthest");
            cityElement.textContent = city.name + " ligger " + furthest.distance + " mil bort";
        } else {
            cityElement.textContent = city.name;
        }
    } else {
        cityElement.textContent = city.name;
    }

    citiesID.appendChild(cityElement);
}


//Skapar den första tomma cellen
tableID.innerHTML = `<div class="cell head_row"></div>`;

//Skapar celler med 0-38
for (let i = 0; i < cities.length; i++) {
    tableID.innerHTML += `<div class="cell head_row">${cities[i].id}</div>`;
}

// skapar resten av tabellen
for (let i = 0; i < cities.length; i++) {
    // Bestäm om det är en jämn rad (för att ge klassen `even_row`)
    const rowClass = i % 2 === 0 ? "even_row" : "";

    // Lägg till första cellen i raden (stadsinfo)
    tableID.innerHTML += `<div class="cell head_column ${rowClass}">${cities[i].id}-${cities[i].name}</div>`;

    for (let j = 0; j < cities.length; j++) {
        const colClass = j % 2 === 0 ? "even_col" : "odd_col"; // Varannan kolumn

        if (i === j) {
            // Lägg till tom cell på diagonalen
            tableID.innerHTML += `<div class="cell ${rowClass} ${colClass}"></div>`;
        } else {
            // Hämta distansen mellan städer
            let distance = "";
            for (const d of distances) {
                if ((d.city1 === i && d.city2 === j) || (d.city1 === j && d.city2 === i)) {
                    distance = d.distance;
                    break;
                }
            }

            // Lägg till cell med avstånd och använd korrekt rad- och kolumnklass
            tableID.innerHTML += `<div class="cell ${rowClass} ${colClass}">${distance / 10}</div>`;
        }
    }
}

// tabell
/*
tableID.innerHTML = `<div class="cell head_row"></div>`
for (let i = 0; i < cities.length; i++){
   tableID.innerHTML+= `<div class="cell head_row">${cities[i].id}</div>`;
}

for (let i = 0; i < cities.length; i++){
    if (i % 2 === 0 ){
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
        tableID.innerHTML += `<div class="cell even_row">${distance /10 }</div>`;}
       else {
        tableID.innerHTML += `<div class="cell">${distance /10 }</div>`;}
        }
    }
}
*/

/*
const emptyCell = document.createElement("p");

emptyCell.classList.add("cell");

tableID.appendChild(emptyCell);


for (let city of cities){
    const idCell = document.createElement ("p");
    idCell.classList.add("cell","head_row");
    idCell.textContent = city.id;
    tableID.appendChild(idCell);
}


for (let cityRow of cities){
    let classEvenrows = "";
        if (cityRow.id% 2 == 0){
        classEvenrows="even_row";
}


const cityCell = document.createElement("p");
cityCell.classList.add("cell","head_column");
cityCell.textContent = `${cityRow.id}-${cityRow.name}`;
cityCell.classList.add("even_row");
tableID.appendChild(cityCell);


for (let cityColumn of cities) {
    let classEvenCols = "";
        if ( cityColumn.id % 2 === 0) {
        classEvenCols = "even_col";
    }
        if (cityRow.id== cityColumn.id) {
        tableID.innerHTML += `<p class= "cell ${classEvenrows}"${classEvenCols}</p>`;
    } 
        else{
        let match = distances.filter(d=> d.city1 == cityRow.id&& d.city2 == cityColumn.id
            || d.ity1 == cityColumn.id && d.city2 == cityRow.id)[0]
        tableID.innerHTML += `<p class="cell ${classEvenrows}${classEvenCols}">${match.distance / 10}</p>`
       }
    }
}
*/
