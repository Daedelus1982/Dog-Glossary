const dogButton = document.getElementById("button-random-dog");
const dogBreedButton = document.getElementById("button-show-breed");
const dogSubBreedButton = document.getElementById("button-show-sub-breed");
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

function fetchSubBreeds(subBreed) {
    const response = httpGet(`https://dog.ceo/api/breed/${subBreed}/list`);
    return JSON.parse(response);
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
});

dogSubBreedButton.addEventListener("click", () => {
    const response = fetchSubBreeds(breedName.value.toLowerCase());
    newDogDiv.innerHTML = '';
    if (response.status === 'error') {
        newDogDiv.insertAdjacentHTML("beforeend", "<p>Breed not found!</p>");
    }
    else {
        if (response.message.length === 0) {
            newDogDiv.insertAdjacentHTML("beforeend", "<p>No sub-breeds found!</p>");
        } else {
            let list = document.createElement("ol");
            response.message.forEach((item) => {
                let newItem = document.createElement("li");
                newItem.textContent = item;
                list.appendChild(newItem);
                newDogDiv.appendChild(list);
        })}
    }
    dogDiv.replaceWith(newDogDiv);
});

function httpGet(theUrl)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
