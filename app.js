const imageDisplay = document.getElementById("img-display");
const productTitle = document.getElementById("title-name");
const searchButton = document.getElementById("btn-search");
const outputList = document.getElementById("list-output");

//old search that was only text input
// const searchtTag = document.getElementById("input-search-brand");
// const searchProduct = document.getElementById("input-search-product");

const selectProduct = document.getElementById("select-product");
const selectTags = document.getElementById("select-tag");

const wishlistBtn = document.getElementById("wishlist-btn");

let currentListArray = {};
let currentListItem = {};
let wishlistArray = [];

searchButton.addEventListener("click", getProducts);

// wishlistBtn.addEventListener("click", getCurrentProduct);

function getProducts(){
    // let searchInputTxt = document.getElementById("input-search").value;

    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${selectTags.value}&product_type=${selectProduct.value}`).then(getJson).then(updateDisplay).catch(reportError);
}

function getJson(aResponse){
    // console.log(aResponse);

    const theResponse = aResponse.json();
    console.log(theResponse);

    return theResponse;
}

function updateDisplay(jsonObj){

    let currentListArray = jsonObj;
    console.log(currentListArray);

    outputList.innerHTML = "";

    for(let i = 0; i < currentListArray.length; i++){
       
        let brandName = currentListArray[i].brand;
        let productName = currentListArray[i].name;
        let productImage = currentListArray[i].image_link;
        let productTags = currentListArray[i].tag_list;
        let productDesc = currentListArray[i].description;
        let productRating = currentListArray[i].rating;
        // console.log(productTags);        

        let card = document.createElement("ion-card");

        let cardContent = document.createElement("ion-card-content");

        cardContent.innerHTML = `
        <ion-card>
            <ion-img expand="full"src="${productImage}"></ion-img>
            <ion-card-header>
                <ion-card-title>
                    Name: ${productName}
                </ion-card-title>
                <ion-card-subtitle>
                    Brand: ${brandName}
                </ion-card-subtitle>
            </ion-card-header>


            <ion-card-content>

                // add rating here maybe

                <p>${productDesc}</p>
                <br>
                <ion-button expand="block" id="wishlist-btn" onclick='saveItem("${productName}", "${brandName}", "${productImage}")'>Add to list</ion-button>
                <ion-button expand="block">Button</ion-button>
                
            </ion-card-content>

        <ion-card>
        `;

        //den pls dont forget to add da link to buttons (currentListArray[].website_link)
        //add rating
        outputList.appendChild(cardContent);
    }
}

function saveItem(name, brand, image_link, description){
    //removed description as there are problems with commas and parentheses in description

    let item = {
        productName: name ,
        brandName: brand ,
        imageLink: image_link,
        // description: description,
    };

    wishlistArray.push(item);
    console.log(wishlistArray);
}


function savedItemDisplay(){
    
}


function reportError(anError){
    console.log(anError);
}



