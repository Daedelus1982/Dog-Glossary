const dogButton = document.getElementById("button-random-dog");
const dogBreedButton = document.getElementById("button-show-breed");
const dogSubBreedButton = document.getElementById("button-show-sub-breed");
const allBreedsButton = document.getElementById("button-show-all");
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
    showJSON(fetchSubBreeds(breedName.value.toLowerCase()));
});

allBreedsButton.addEventListener("click", () => {
   showJSON(JSON.parse(httpGet(`https://dog.ceo/api/breeds/list/all`)));
});

function showJSON(json) {
    newDogDiv.innerHTML = '';
    if ( json.status === 'error') {
        newDogDiv.insertAdjacentHTML("beforeend", "<p>Breed not found!</p>");
    }
    else {
        if (json.message.length === 0) {
            newDogDiv.insertAdjacentHTML("beforeend", "<p>No sub-breeds found!</p>");
        } else {
            let list = document.createElement("ol");
            if (Array.isArray(json.message)) {
            json.message.forEach((item) => {
                let newItem = document.createElement("li");
                newItem.textContent = item;
                list.appendChild(newItem);
                newDogDiv.appendChild(list);
            })} else {
                let allDogs = Object.entries(json.message);
                allDogs.forEach((item) => {
                    let newItem = document.createElement("li");
                    newItem.textContent = item[0];
                    if (item[1].length > 0) {
                        let breeditems = document.createElement("ul");
                        let breedItem = document.createElement("li");
                        breedItem.textContent = item[1];
                        breeditems.appendChild(breedItem);
                        newItem.appendChild(breeditems);
                    }
                    list.appendChild(newItem);
                    newDogDiv.appendChild(list);
                })
            }}
    }
    dogDiv.replaceWith(newDogDiv);
}

function httpGet(theUrl)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
