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





//for (let city of cities){
//   // let tableRow = document.createElement("div")
//    tableID.appendChild(tableRow)
//    tableRow.classList.add("head_row")
//    tableRow.textContent = `${city.id}`      
//}
//for (let name of cities){
//    let tableColumn = document.createElement("div")
//    tableID.appendChild(tableColumn)
//    tableRow.classList.add("head_column")
//    tableRow.textContent = `${name.name}`
//}
//for (let city = -1; city < cities.length; city++){
//let tablerow = document.createElement("div")
//    tableID.appendChild(tablerow)
//    tablerow.classList.add("head_row")
//    tablerow.textContent = `${city}`
//    tableID.appendChild(tablerow)
//    for (let j = 0; j < 39; j++){
//        let tablecolumn = document.createElement("div")
//        tablecolumn.classList.add("head_column")
//        tablecolumn.textContent = ` ${city}, ${cities.name}`
//        tableID.appendChild(tablecolumn)
//  }
//}

