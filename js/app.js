'use strict';
// Refactor ideas
  // array of 6 elements

 /****************
  * Global Variables 
  **/
  const maxClicks = 25;
  let totalClicks = 0;
  const productNames = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck",                        "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb",                              "water-can", "wine-glass"];
  let allProducts = [];

/****************** 
 * DOM variables 
 **/
  let productImages = document.getElementById("productImages");

  let firstProduct = document.getElementById("firstProduct");
  let firstProductTitle = document.getElementById("firstProductTitle");

  let secondProduct = document.getElementById("secondProduct");
  let secondProductTitle = document.getElementById("secondProductTitle");

  let thirdProduct = document.getElementById("thirdProduct");
  let thirdProductTitle = document.getElementById("thirdProductTitle");

  let pChart = document.getElementById("productChart");
  pChart.hidden = true;

/******************* 
 * Product constructor 
 * */
  function Product (name) {
    this.filepath = (name === "usb" || name === "sweep") ? `img/${ name }.png` : `img/${ name }.jpg`;
    this.name = name;
    this.views = 0;
    this.clicks = 0;
    this.currentImage = false;

    allProducts.push(this);
  }

/******************** 
 * Create Product objects 
 * */
  function instantiateProducts() {
    for (let i = 0; i < productNames.length; i++)
    {
      new Product(productNames[i]);
    }
  }


/*********************
 * Show Random Product images 
 * */
  function showRandomProducts() {
    let currentProductIndexes = [];
    // let previousProductIndexes = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor(Math.random() * allProducts.length);

      if (!currentProductIndexes.includes(randomNumber) /* && !previousProductIndexes.includes(randomNumber) */) {
        currentProductIndexes.push(randomNumber);
      } else {
        while(currentProductIndexes.includes(randomNumber) /* && previousProductIndexes.includes(randomNumber) */) {
          randomNumber = Math.floor(Math.random() * allProducts.length);
        }

        currentProductIndexes.push(randomNumber);
      }
    }

    console.log(`CURRENT: ${ currentProductIndexes[0] }, ${ currentProductIndexes[1] }, ${ currentProductIndexes[2] }`);

    for (let i = 0; i < currentProductIndexes.length; i++) {
      allProducts[currentProductIndexes[i]].views++;

      if (i === 0) {
        firstProduct.src = allProducts[currentProductIndexes[i]].filepath;
        firstProduct.alt = allProducts[currentProductIndexes[i]].name;
        firstProductTitle.innerText = allProducts[currentProductIndexes[i]].name;
      }

      if (i === 1) {
        secondProduct.src = allProducts[currentProductIndexes[i]].filepath;
        secondProduct.alt = allProducts[currentProductIndexes[i]].name;
        secondProductTitle.innerText = allProducts[currentProductIndexes[i]].name;
      }

      if (i === 2) {
        thirdProduct.src = allProducts[currentProductIndexes[i]].filepath;
        thirdProduct.alt = allProducts[currentProductIndexes[i]].name;
        thirdProductTitle.innerText = allProducts[currentProductIndexes[i]].name;
      }
    }
  }

  
/******************* 
 * Return a random number 
 * */
  let randomizer = () => Math.floor(Math.random() * allProducts.length);


/******************** 
 * This function calls all of the others 
 * */
  function main() {
    instantiateProducts();
    showRandomProducts();
  }


/********************* 
 * This function shows the results 
 * */
  function showResults() {
    pChart.hidden = false;
    let timesClicked = [];
    let ctx = document.getElementById("productChart").getContext("2d");

    for (let i = 0; i < allProducts.length; i++) {
      timesClicked.push(allProducts[i].clicks);
    }

    let productChart = new Chart(ctx, {
      type: "bar",

      data: {
        labels: productNames,

        datasets: [{
          label: "# of Clicks",
          data: timesClicked,
          backgroundColor: "#a7cab1",
          borderColor: "#310A31",
          borderWidth: 1
        }]
       },

      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


/***********************
 * This function handles the clicking of an image 
 * */
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