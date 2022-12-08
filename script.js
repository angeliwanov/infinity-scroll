const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash Api
const count = 10;
const mykey = config.MY_KEY;
const secretkey = config.SECRET_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${mykey}&count=${count}`;

// helper function to set attributes 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for photos, add to DOM
function displayPhotos () {
    photosArray.forEach((photo) => {
         // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create <img> 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // put <img> inside <a>, put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


// Get photos from unsplash Api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray) 
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

// Load
getPhotos();