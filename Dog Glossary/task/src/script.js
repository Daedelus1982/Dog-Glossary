const dogButton = document.getElementById("button-random-dog");
const dogDiv = document.getElementById("content");
const dogImgElement = document.createElement('img');
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


dogButton.addEventListener("click",() => {
    dogImgElement.src = fetchDogPic();
    dogDiv.replaceWith(newDogDiv);
});

function httpGet(theUrl)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
