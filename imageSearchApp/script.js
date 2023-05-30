/*use unsplash api for images*/
/* access key -- d4iNBtgXJ61D8XdWy8C90cKpjGrxOgMH4pd_riupJXQ*/
// store the access key inside variable
const accessKey = "d4iNBtgXJ61D8XdWy8C90cKpjGrxOgMH4pd_riupJXQ";
// collect elements from html and store them inside variables.
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

// input data gives all the keywords that are typed by any user.
let inputData = "";
// default page number, if show more is clicked add more pages.
let page = 1;
// create function.
async function searchImages() {
  inputData = inputElement.value;
  // create a dynamic url to fetch the images that are being searched.
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  // data is in response variable fetched through url variable.
  const response = await fetch(url);
  //  get data in form of json format , and then convert data into the images and text.
  const data = await response.json();
  const results = data.results;
  //  initialise pagenumber
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    //  push the data inside the div template where 3 images are stored and displayed(search-results). generate new boxes for new images.
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.innerHTML;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // now append these elements inside html
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  // if the images full the page increase the page number go to next page.
  page++;
  //  use show more button,change from display none to block
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}
// create evet listners for function to work
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
// call the function again when user clicks on show more button
showMoreButton.addEventListener("click", () => {
  searchImages();
});
