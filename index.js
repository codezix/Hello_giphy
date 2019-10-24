var mirrorText = document.querySelector(".mirror-text");
var form = document.querySelector(".search-form");
var field = document.querySelector(".search-field");
var giphyResult = document.querySelector(".giphyResult");
var clearSearch = document.querySelector(".search__clear");


var url = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "eEe0r8lvLRjRB3jHcamfLfHjITajolsN";
// build query string from user input to request data from API
function getQueryString() {
    var query   = url
                + "q=" + encodeURI(field.value)
                + "&api_key=" + apiKey

    return query;
}

var result = {};
// listen for submit event then return a json response object and push response to result variable
form.addEventListener('submit', function(event) {
    fetch(getQueryString())
    .then(function(response) { return response.json(); })
    .then(function(response) {
        renderImages(response.data);
    });
    // prevent page reload 
    event.preventDefault();
    form.reset();
});
//render images
function renderImages (data) {
    var oldImage = document.querySelectorAll(".search__result");
    if (oldImage.length > 0) {
        oldImage.forEach(function(image) {
            image.remove();
        });
    }

    //loop through response data and creat new image elements
    data.forEach(function(value, key){
        // create anchor tag and append to div
        var anchor = getElement("a", {href: value.url, class: "result__link", target: "_blank"});
        setElement(anchor, ".giphyResult");
        //create an image tag and append the image to the anchor tag
        var image = getElement("img", {src: value.images.fixed_width.url,alt: value.title, class: "search__result"});
        setElement(image, '.result__link');
    });
}
/**
 * createElement
 * @param {string} type 
 * @param {object} attributes 
 */
function getElement(type, attributes) {
    var element = document.createElement(type);
    for (attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }
    return element;
}

//append image to target element
function setElement (element, target) {
    document.querySelector(target).appendChild(element);
}