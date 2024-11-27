let target = prompt("Give me a city");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const main = document.querySelector("main");
const tableID = document.getElementById("table");
const citiesID = document.getElementById("cities");
const closestSpan = document.getElementById("closest");
const furthestSpan = document.getElementById("furthest");

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

function findClosestCity(targetCity) {
    let closestCity = null;
    let closestDistance = Infinity;

    for (let i = 0; i < distances.length; i++) {
        let d = distances[i];

        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            let otherCityId
            if (d.city1 === targetCity.id){
                otherCityId = d.city2
            } else{
                otherCityId = d.city1
            } 

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

function findFurthestCity(targetCity) {
    let furthestCity = null;
    let furthestDistance = -Infinity;

    for (let i = 0; i < distances.length; i++) {
        let d = distances[i];

        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            let otherCityId
            if (d.city1 === targetCity.id){
                otherCityId = d.city2
            } else{
                otherCityId = d.city1
            } 

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

let closest = null;
let furthest = null;

if (cityFound !== null) {
    closest = findClosestCity(cityFound);
    furthest = findFurthestCity(cityFound);
}

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


tableID.innerHTML = `<div class="cell head_row"></div>`;
for (let i = 0; i < cities.length; i++) {
    tableID.innerHTML += `<div class="cell head_row">${cities[i].id}</div>`;
}

for (let i = 0; i < cities.length; i++) {
    let rowClass = "";
    if (i % 2 === 0) {
        rowClass = "even_row";
    }

    tableID.innerHTML += `<div class="cell head_column ${rowClass}">${cities[i].id}-${cities[i].name}</div>`;

    for (let j = 0; j < cities.length; j++) {
        let colClass = "";
        if (j % 2 === 0) {
            colClass = "even_col";
        } else {
            colClass = "odd_col";
        }

        if (i === j) {
            tableID.innerHTML += `<div class="cell ${rowClass} ${colClass}"></div>`;
        } else {
            let distance = "";
            for (const d of distances) {
                if ((d.city1 === i && d.city2 === j) || (d.city1 === j && d.city2 === i)) {
                    distance = d.distance;
                    break;
                }
            }
            tableID.innerHTML += `<div class="cell ${rowClass} ${colClass}">${distance / 10}</div>`;
        }
    }
}