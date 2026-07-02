const input = document.getElementById("input")
const infoElement = document.getElementById("info-text")
const title = document.getElementById("title")
const meaning = document.getElementById("meaning")
const meaningContainer = document.getElementById("meaning-container")
const audio = document.getElementById("audio")
const audioAlt = document.getElementById("audio-alt")



 function fetchAPI(word){
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    fetch(url)
    .then((res) =>  {
        return res.json()})
    .then((res) => {
        title.innerHTML = res[0].word
        meaning.innerHTML = res[0].meanings[0].definitions[0].definition
        const audioUrl = res[0].phonetics[0].audio;
        if(!audioUrl){
            audio.style.display = "none"
            audioAlt.style.display = "block"
        }
        else{
            audioAlt.style.display = "none"
            audio.src = audioUrl
            audio.style.display = "inline-block"
        }
        infoElement.style.display = "none"
        meaningContainer.style.display = "block"
        })
    .catch((e) => {
        infoElement.style.display = "block"
        meaningContainer.style.display = "none"
        infoElement.innerHTML = `THE WORD DOES NOT EXIST IN OUR DATABASE. TRY ANOTHER WORD...`
        console.log(e)})
}


input.addEventListener("keyup", (e) => {
    if(e.target.value && e.key === "Enter"){
        meaningContainer.style.display = "none"
        infoElement.innerHTML = `Searching...`
        infoElement.style.display = "block"
        fetchAPI(e.target.value); 
    }

})