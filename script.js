const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


// Unsplash Api
const count = 5;
const mykey = config.MY_KEY;
const secretkey = config.SECRET_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${mykey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
    // console.log(imagesLoaded)
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${mykey}&count=${count}`;
        // console.log('ready = ', ready)
    }
}

// helper function to set attributes 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for photos, add to DOM
function displayPhotos () {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images ', totalImages)
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
        // event listener when image is finished loading
        img.addEventListener('load', imageLoaded);
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

// Load more photos on scrolling to the bottom
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
         ready = false;
         getPhotos()
    }
})

// Load
getPhotos();