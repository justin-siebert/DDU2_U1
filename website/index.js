// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

let target = prompt("Give me a city");
const h2 = document.querySelector("h2");
const h3 = document.querySelector ("h3");
const main = document.querySelector("main");
const tableID = document.getElementById("table");
const closestID = document.getElementById("closest");
const citiesID = document.getElementById("cities");
const linksID = document.getElementById("links");
const furthestID = document.getElementById("furthest");
const span = document.querySelector("span")
const cityFound = findCity(target)


function findCity(target){
    for (let city of cities){
        if (city.name == target){
            return city;
        }
    }
    return null;
}

if (cityFound == null){
    h2.textContent = `${target} finns inte i databasen`
    document.title = "Not found"       
} 
else{
    h2.textContent = `${cityFound.name} (${cityFound.country})`
    document.title = cityFound.name
}


for (let city of cities){
    citiesID.innerHTML += `<p class="cityBox"> ${city.name}</p>`
}

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
       else {
        tableID.innerHTML += `<div class="cell">${distance /10 }</div>`;       }
        }
    }
}

