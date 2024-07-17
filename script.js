let inputField = document.querySelector("#input");
let infoPara = document.querySelector("#info-para");
let contentBox = document.querySelector(".content-box");

inputField.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, " ");
  if (e.key == "Enter" && word) {
    // console.log(word);
    contentBox.style.display = "none";
    fetchMeaning(word);
  }
});

function fetchMeaning(word) {
  infoPara.innerHTML = "Searching...";
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => data(result, word))
    .catch(() => {
      infoPara.innerHTML = "Could not find the meaning of this word";
    });
}

function data(result, word) {
  inputField.value = word;
  infoPara.innerHTML = "";
  if (result.title) {
    infoPara.innerHTML = "Could not find the meaning of this word";
    contentBox.style.display = "none";
  } else {
    contentBox.style.display = "block";
    let definitions = result[0].meanings[0].definitions[0];
    document.querySelector(".word-meaning h2").innerHTML = word;
    document.querySelector(".word-meaning span").innerHTML = result[0].phonetic;
    document.querySelector(".content .meaning").innerHTML =
      definitions.definition;
  }
}