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

//import {cities, distances} from '.database.js' ????

//if (typeof cities === "undefined"){
//    console.log("Staden finns inte i vår databas")
//}


for (let city of cities){
    
    citiesID.innerHTML += `<p class="cityBox"> ${city.name}</p>`
}