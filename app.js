//----------------------------------------------search page stuff

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

//----------------------------------------------profile page stuff

const wishlistOutput = document.getElementById("wishlist-output");

const profileBtn = document.getElementById("profile-btn");

profileBtn.addEventListener("click", savedItemDisplay);


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
        let productDesc = currentListArray[i].description;
        let productLink = currentListArray[i].product_link;
        let productPrice = currentListArray[i].price;
        //sometimes the price shows zero as there are some problems with the API itself.

        let card = document.createElement("ion-card");

        let cardContent = document.createElement("ion-card-content");

        cardContent.innerHTML = `
        <ion-card>
            <ion-img expand="full"src="${productImage}"></ion-img>
            <ion-card-header>
                <ion-card-title>
                    ${productName}
                </ion-card-title>
                <ion-card-subtitle>
                    Brand: ${brandName}
                </ion-card-subtitle>
                <ion-card-subtitle>
                Price: $${productPrice}
                </ion-card-subtitle>
            </ion-card-header>


            <ion-card-content>
                <p>${productDesc}</p>
                <br>
                <ion-button expand="block" id="wishlist-btn" onclick='saveItem("${productName}", "${brandName}", "${productImage}", "${productPrice}", "${productLink}")'>Add to list</ion-button>
                <ion-button expand="block" href="${productLink}" target="_blank">Buy item</ion-button>                
                
            </ion-card-content>

        <ion-card>
        `;
        outputList.appendChild(cardContent);
    }
}

function saveItem(name, brand, image_link, price, product_link){
    //removed description as there are problems with commas and parentheses in description
    let item = {
        productName: name ,
        brandName: brand ,
        imageLink: image_link ,
        productLink: product_link ,
        productPrice: price

        // description: description,
    };

    wishlistArray.push(item);
    console.log(wishlistArray);
}

function removeItem(index){
    let wishlist = wishlistArray;

    wishlist.splice(index, 1);

    savedItemDisplay();
}


function savedItemDisplay(){
    console.log(wishlistArray);

    wishlistOutput.innerHTML = "";

    if(wishlistArray.length == 0){

        let card = document.createElement("ion-card");
    
        let cardContent = document.createElement("ion-card-content");
        cardContent.innerHTML = `
        <ion-card>
            <ion-card-content>
                <p>Nothing in wishlist yet!</p>
            </ion-card-content>
        <ion-card>
        `;
        wishlistOutput.appendChild(cardContent);
    }
    else{

        for(let i = 0; i < wishlistArray.length; i++){
            let itemIndex = i;
    
            let brandName = wishlistArray[i].brandName;
            let productName = wishlistArray[i].productName;
            let productImage = wishlistArray[i].imageLink;
            let productLink = wishlistArray[i].productLink;
            let productPrice = wishlistArray[i].productPrice;

    
            let card = document.createElement("ion-card");
    
            let cardContent = document.createElement("ion-card-content");
    
            cardContent.innerHTML = `
            <ion-card>
                <ion-img expand="full"src="${productImage}"></ion-img>
                <ion-card-header>
                    <ion-card-title>
                        ${productName}
                    </ion-card-title>
                    <ion-card-subtitle>
                        Brand: ${brandName}
                    </ion-card-subtitle>
                    <ion-card-subtitle>
                    Price: ${productPrice}
                    </ion-card-subtitle>
                </ion-card-header>
    
    
                <ion-card-content>
                    <ion-button expand="block" onclick='removeItem(${itemIndex})'>Remove from wishlist</ion-button>
                    <ion-button expand="block" href="${productLink}" target="_blank">Buy item</ion-button>                
                </ion-card-content>
    
            <ion-card>
            `;
    
            wishlistOutput.appendChild(cardContent);
        }
    }
}


function reportError(anError){
    console.log(anError);
}