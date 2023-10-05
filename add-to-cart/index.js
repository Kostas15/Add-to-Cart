// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//#AC485A red

const firebaseConfig = {
  apiKey: "AIzaSyDpdXkWzMeRDjrtG1S3byxSXoR08kAMm78",
  authDomain: "first-3bb71.firebaseapp.com",
  databaseURL: "https://first-3bb71-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-3bb71",
  storageBucket: "first-3bb71.appspot.com",
  messagingSenderId: "502682154315",
  appId: "1:502682154315:web:21d991b10da689c5c524ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const shoppingList = ref(database, "shoppingList")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("submit")
const shoppingListElement = document.getElementById("shopping-list")

addButton.addEventListener("click", function() {
    let inputValue = inputField.value;
    push(shoppingList, inputValue)
    clearInputField()
})

onValue(shoppingList, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            addListElement(currentItem)
        }
    } else {
        shoppingListElement.innerHTML = "No items here... yet"
    }
    
})

function clearShoppingList() {
    shoppingListElement.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}

function addListElement(item) {
    //shoppingListElement.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1] 
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItem = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItem)
    })

    shoppingListElement.append(newEl)
}


