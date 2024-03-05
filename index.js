import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputTxt = document.getElementById("input-txt")
const publishBtn = document.getElementById("publish-btn")
const endorsementsList = document.getElementById("endorsements")

const appSettings = {
    databaseURL: "https://we-are-the-champions-62595-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")


publishBtn.addEventListener("click", function() {
    let inputValue = inputTxt.value
    
    push(endorsementListInDB, inputValue)
    
    inputTxt.value = ""
})


onValue(endorsementListInDB, function(snapshot) {
    clearEndorsementList()   
    
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())

        for (let i = 0; i < endorsementArray.length; i++) {
            let currentEndorsement = endorsementArray[i]
            appendToEndorsementList(currentEndorsement)
        }    
    }
})

function clearEndorsementList() {
    endorsementsList.innerHTML = ""
}

function appendToEndorsementList(item) {
    let currentEndorsementValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = currentEndorsementValue
    newEl.classList.add("endorsement")
    endorsementsList.append(newEl)
}