// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

//let target = prompt("Give me a city");
const h2 = document.querySelector("h2");
const h3 = document.querySelector ("h3");
const main = document.querySelector("main");
const tableID = document.getElementById("table");
const closestID = document.getElementById("closest");
const citiesID = document.getElementById("cities");
const linksID = document.getElementById("links");
const furthestID = document.getElementById("furthest");

//if (typeof cities === "undefined"){
//    console.log("Staden finns inte i vår databas")
//}


for (let city of cities){
    citiesID.innerHTML += `<p class="cityBox"> ${city.name}</p>`
}

//const nRows = prompt("Ange antal rader");//const nCols = prompt("Ange antal kolumner");
//for (let row = 0; row <= nRows; row++){
// for (let col = 0; col <=nCols; col++){
//     const cell = document.createElement("div");
//     cell.classList.add("cell")
//     cell.textContent = `${row}, ${col}`;
//   main.appendChild(cell);
//} //}

//for (let distance = 0; distance < distances.length; distance++){
    //for (let city = 0; city < cities.length; city++){
       //let cell = document.createElement("div")
        //cell.classList.add("cell")
        //cell.textContent = `${distance}, ${city}`
        //tableID.appendChild(cell)
    //}
//}

    // Lägg till stadens namn som kolumnrubriker
    for (let i = 0; i < cities.length; i++) {
        const column = document.createElement("div");
        column.textContent = `${i} - ${cities[i]}`; // T.ex. "0 - Strasbourg"
        tableID.appendChild(column);
    }
   // table.appendChild(headerRow);

    // Skapa tabellens rader
    for (let i = 0; i < distances.length; i++) {
        const row = document.createElement("div");

        // Lägg till radrubrik (stadens namn)
        const rowHeader = document.createElement("div");
        rowHeader.textContent = `${i} - ${cities[i]}`; // T.ex. "0 - Strasbourg"
        row.appendChild(rowHeader);

        // Lägg till celler med distanser
        for (let j = 0; j < distances[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = distances[i][j]; // Hämta distansvärdet
            row.appendChild(cell);
        }

        table.appendChild(row); // Lägg till raden i tabellen
    }

    // Lägg till tabellen i container-elementet
    //container.appendChild(table);

