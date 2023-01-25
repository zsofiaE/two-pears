// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

//const clientId = "befOWXko_VO5MAUZByFqicKzazdX8IHU6gsSb6BXadc"; // Nr. 1
//const clientId = "8FAQOMjMmHK-HJmM7eLkhcRwyWZVg_TZ5ybi20qw9Dw"; // Nr. 2
const clientId = "f-pm4kGZgNh2VI_tYGJHAV2pEUazn_deA1KiMjMQUYg"; // Nr. 3
// const clientId = "h_3sisufaSWfhCD0Zsog_yjhnKj-yr1RTyjhuKr3VFY"; // Nr. 4 
// const clientId = "nhHInUCkFEGWWmSpsJt3pJLTYevYEE1oy4pvyWatKiM"; // Nr. 5

let allImages; // this will store all the images
let currentImage = 0; // will track the current large image
const gallery = document.querySelector(".gallery");

function searchPhotos(){
    let searchInput = document.getElementById("search-input").value;
    const url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${searchInput}&per_page=14`;
    const gallery = document.querySelector(".gallery");

fetch(url)
    .then (function (data) {
        return data.json();
    })  .then (function (data) {
        return data
    })
     .then(function (jsonData) {
       // console.log(jsonData.results)
        allImages = jsonData.results

        gallery.innerHTML='';

        //console.log(allImages)

        jsonData.results.forEach((photo, index) => {

          let newImg = "";
          newImg = document.createElement('img');
          newImg.src = photo.urls.regular;
          newImg.className = "gallery-img";
          gallery.appendChild(newImg);

          //console.log(newImg);

          newImg.addEventListener('click', () => {
            console.log(currentImage);

            currentImage = index;
            
            showPopup(photo);
            
        })  

     });
})
}

function randomImages(){
    const random_url = `https://api.unsplash.com/photos/random/?client_id=${clientId}&count=10`;
    
fetch (random_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        //console.log(allImages)
        makeImages(allImages);
     });
    }

        const makeImages = (data) => {

     gallery.innerHTML='';
    //console.log(data)
    data.forEach((photo, index) => {
     
        let newImg = document.createElement('img')
        newImg.src = photo.urls.regular;
        newImg.className = "gallery-img";
        gallery.appendChild(newImg);
        //console.log(newImg)

         // popup image

        newImg.addEventListener('click', () => {
            currentImage = index;
           // console.log(currentImage)
            showPopup(photo);
        })    
        
    })
};


const showPopup = (photo) => {
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const largeImage = document.querySelector('.image-large');
    const postcardBtn = document.querySelector('.submit-btn')
    
    // ArrowBtn()
    popup.classList.remove('hide');
    downloadBtn.href = photo.links.html;
    largeImage.src = photo.urls.regular;

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
    })

    //postcrad-popup

    postcardBtn.addEventListener('click', () => {
        postcardPopup(largeImage);
    })

}

//randomImages();


const postcardPopup = (photo) => {
    let postcardPopup = document.querySelector('.postcard-popup');
    
    const closeBtn = document.querySelector('#postcard-close-btn');
    const imgPostcard = document.querySelector('.postcard-image');
    const largeImage = document.querySelector('.image-large');
   
    postcardPopup.classList.remove('hide');
    imgPostcard.src = largeImage.src;

    closeBtn.addEventListener('click', () => {
        postcardPopup.classList.add('hide');
        function clearfields(){
            document.querySelector('.input-title').value="";
            document.querySelector('.textarea').value="";
        }
    })
}

// controls


function ArrowBtn(){
const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn');


preBtns.addEventListener('click', () => {
    if(currentImage > 0){
        currentImage--;
        showPopup(allImages[currentImage]);
        console.log(currentImage)
    }
})

nxtBtns.addEventListener('click', () => {
    if(currentImage < allImages.length - 1){
        currentImage++;
        showPopup(allImages[currentImage]);
        console.log(currentImage)
    }
})
}

ArrowBtn()