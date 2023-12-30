const dogButton = document.getElementById("button-random-dog");
const dogBreedButton = document.getElementById("button-show-breed");
const dogDiv = document.getElementById("content");
const dogImgElement = document.createElement('img');
const breedName = document.getElementById("input-breed");
dogImgElement.src = fetchDogPic();
dogImgElement.alt = 'random dog image';
const newDogDiv = document.createElement('div');
newDogDiv.id = "content";
newDogDiv.appendChild(dogImgElement);
dogDiv.replaceWith(newDogDiv);

function fetchDogPic() {
    const dogResponse = httpGet("https://dog.ceo/api/breeds/image/random");
    return JSON.parse(dogResponse).message;
}

function fetchByBreed(breed) {
    const dogResponse = httpGet(`https://dog.ceo/api/breed/${breed}/images/random`);
    return JSON.parse(dogResponse);
}


dogButton.addEventListener("click",() => {
    newDogDiv.innerHTML = '';
    dogImgElement.src = fetchDogPic();
    newDogDiv.appendChild(dogImgElement);
    dogDiv.replaceWith(newDogDiv);
})

dogBreedButton.addEventListener("click", () => {
    const response = fetchByBreed(breedName.value.toLowerCase());
    newDogDiv.innerHTML = '';
    if (response.status === 'error') {
        newDogDiv.insertAdjacentHTML("beforeend", "<p>Breed not found!</p>");
    }
    else {
        dogImgElement.src = response.message;
        newDogDiv.appendChild(dogImgElement);
    }
    dogDiv.replaceWith(newDogDiv);
})

function httpGet(theUrl)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
