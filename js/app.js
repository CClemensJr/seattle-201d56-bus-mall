'use strict';
// Refactor ideas
  // array of 6 elements

 /* Global Variables */
  const maxClicks = 25;
  let totalClicks = 0;
  const productNames = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck",                        "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb",                              "water-can", "wine-glass"];
  let allProducts = [];

/* DOM variables */
  let productImages = document.getElementById("productImages");

  let firstProduct = document.getElementById("firstProduct");
  let firstProductTitle = document.getElementById("firstProductTitle");

  let secondProduct = document.getElementById("secondProduct");
  let secondProductTitle = document.getElementById("secondProductTitle");

  let thirdProduct = document.getElementById("thirdProduct");
  let thirdProductTitle = document.getElementById("thirdProductTitle");

  let ul = document.getElementById("resultsList");


/* Product constructor */
  function Product (name) {
    this.filepath = (name === "usb" || name === "sweep") ? `img/${ name }.png` : `img/${ name }.jpg`;
    this.name = name;
    this.views = 0;
    this.clicks = 0;
    this.currentImage = false;

    allProducts.push(this);
  }

/* Create Product objects */
  function instantiateProducts() {
    for (let i = 0; i < productNames.length; i++)
    {
      new Product(productNames[i]);
    }
  }


/* Show Random Product images */
  function showRandomProducts() {
    let firstRandomIndex = Math.floor(Math.random() * allProducts.length);
    let secondRandomIndex = Math.floor(Math.random() * allProducts.length);
    let thirdRandomIndex = Math.floor(Math.random() * allProducts.length);

    // while (firstProduct.alt === allProducts[firstRandomIndex].name || 
    //        secondProduct.alt === allProducts[secondRandomIndex].name ||
    //        thirdProduct.alt === allProducts[thirdRandomIndex].name) {

    //   let firstRandomIndex = Math.floor(Math.random() * allProducts.length);

    //   console.log("Duplicate found");
    // }

    allProducts[firstRandomIndex].views++;
    allProducts[secondRandomIndex].views++;
    allProducts[thirdRandomIndex].views++;

    firstProduct.src = allProducts[firstRandomIndex].filepath;
    firstProduct.alt = allProducts[firstRandomIndex].name;
    firstProductTitle.innerText = allProducts[firstRandomIndex].name;

    secondProduct.src = allProducts[secondRandomIndex].filepath;
    secondProduct.alt = allProducts[secondRandomIndex].name;
    secondProductTitle.innerText = allProducts[secondRandomIndex].name;

    thirdProduct.src = allProducts[thirdRandomIndex].filepath;
    thirdProduct.alt = allProducts[thirdRandomIndex].name;
    thirdProductTitle.innerText = allProducts[thirdRandomIndex].name;
  }

  
/* Return a random number */
  let randomizer = () => Math.floor(Math.random() * allProducts.length);


/* This function calls all of the others */
  function main() {
    instantiateProducts();
    showRandomProducts();
  }


/* This function shows the results */
  function showResults() {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement("li");
      let product = document.createTextNode(`${ allProducts[i].name }: ${ allProducts[i].clicks } clicks`);

      li.appendChild(product);
      ul.appendChild(li);
    }

    // document.body.appendChild();
  }


/* This function handles the clicking of an image */
  function handleProductClick(event) {
    console.log(event.target.alt);
    for (let i = 0; i < allProducts.length; i++) {
      if (event.target.alt === allProducts[i].name)
      {
        allProducts[i].clicks++;
      }
    }

    totalClicks++;
    
    if (totalClicks === maxClicks)
    {
      productImages.removeEventListener('click', handleProductClick);
      
      showResults();
    }
    else
    {
      showRandomProducts();
    }
  }

main();

productImages.addEventListener('click', handleProductClick);
// Select three random images from image directory
// Display them in browser
// Track the number of clicks on an image
// Track how many times an image is displayed
// When an image is clicked, three new non-duplicating images should be displayed
// Create a constructor that creates an object associated with each image and has the name of the image, its filepath, the number of times it has been shown, and the number of times it has been clicked
// After 25 selections have been made, turn off the event listeners and display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer"