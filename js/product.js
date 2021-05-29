const apiUrl = "http://localhost:3000/api/cameras";
const idUrl = window.location.search;
const urlParams = new URLSearchParams(idUrl);
const idCamera = urlParams.get('id');

const cameraDOM = document.querySelector(".camera-container");
const cameraName = document.querySelector(".camera-name");
const cameraImg = document.querySelector(".camera-img");
console.log(cameraName);
const cameraDescription = document.querySelector(".camera-description");
const cameraPrice = document.querySelector(".camera-price");
const cameraOptions = document.querySelector(".camera-options");

const addToCartButton = document.querySelector(".button-addToCart");

class CartItem {
    constructor(id, option) {
        this.id = id;
        this.option = option;
    }
}

// Getting the camera
async function getCamera() {
    try {
        let result = await fetch(apiUrl + '/' + idCamera);
        //console.log(result.text());
        let data = await result.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error(error);
    }
}

// Displaying the Camera
function displayCamera(camera) {
    cameraName.innerHTML = camera.name;
    cameraImg.src = camera.imageUrl;
    cameraDescription.innerHTML = camera.description;
    cameraPrice.innerHTML = camera.price / 100 + " €";

    //lenses options
    let lenseOption = '';

    camera.lenses.forEach(lense => {
        lenseOption += `
        <option class="camera-option" value="${lense}">${lense}</option>
        `;
    });

    cameraOptions.innerHTML = lenseOption;
}

//Adding to cart
function addToCart(camera) {
    const optionValue = cameraOptions.options[cameraOptions.selectedIndex].value;
    
    console.log("item count : " + itemCounter);
    
    // console.log("ici c'est les items :" + item);
    if (panier.some(item => item.id === idCamera) && panier.some(item => item.option === optionValue)) {
        //console.log(item);
        alert("L'objet est deja dans votre panier.");
    } else {
        const item = new CartItem(idCamera, optionValue);
        console.log(item)
        panier.push(item);
        localStorage.setItem("panier", JSON.stringify(panier));
        //Displaying cart item number
        console.log(localStorage);
        itemCounter.textContent = "( " + panier.length + " )";
        //Cart notification
        let cartNotification = document.querySelector(".cart-notification");
        cartNotification.classList.add("d-block");
        setTimeout(function() {
            cartNotification.classList.remove("d-block")
        }, 2000);
    }
}

// MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    //Getting the camera and displaying
    getCamera().then(camera => {
        console.log(camera);
        displayCamera(camera);
        // Adding to cart and local storage
        console.log(camera);
        addToCartButton.addEventListener("click", () => {
            addToCart(camera)
        });
    });
});