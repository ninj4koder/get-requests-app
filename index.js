let userInput = 0;
let userText = "";

function getUserInput() {
    userInput = $('#js-user-input').val();
}

function getUserText() {
    userText = $('#js-user-text').val();
}

function getDogLogs() {         // get a dogs logs button
  fetch(`https://dog.ceo/api/breeds/image/random/${userInput}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson));
}

function displayResults(responseJson) {
    console.log(responseJson);
}

function getDogImgs() {         // get a dogs pics button
    fetch(`https://dog.ceo/api/breeds/image/random/${userInput}`)
      .then(response => response.json())
      .then(responseJson => 
        displayResultsImgs(responseJson));
}

function displayResultsImgs(responseJson) {
    let dogsPictures = responseJson.message.map((dog) => generateDogPicture(dog));
    dogsPictures = dogsPictures.join("");
    $('#picturesPlaceholder').html(dogsPictures)
    //  display the results section
     $('.results').removeClass('hidden');
}

function generateDogPicture(dog) {
    return `<img src="${dog}" class="results-img">`;
    }

function getDogBreed()  {         // get a breed pic button
        fetch(`https://dog.ceo/api/breed/${userText}/images/random`)
            .then(response => response.json())
            .then(responseJson => 
                displayBreed(responseJson))
            .catch(error => alert('Something went wrong. Try again later.'));
}

function displayBreed(responseJson) {

    if (responseJson.status !== "error")    {
    
    $('#picturesPlaceholder').html(generateDogPicture(responseJson.message));
    //  display the results section
     $('.results').removeClass('hidden');
    }   else if (responseJson.status === "error")   {
        $('#picturesPlaceholder').html(`<p><strong>OOOPS! Breed not found.</strong></p>`);
        //  display the results section
         $('.results').removeClass('hidden');
    }
}

function watchForm1() {             //console.log response
  $('#dogs-logs').submit(event => {
    event.preventDefault();
    getUserInput();
    getDogLogs();
  });
}

function watchForm2() {             //displays dogs pictures 
    $('#dogs-imgs').submit(event => {
      event.preventDefault();
      getUserInput();
      getDogImgs();
    });
  }

function watchForm3() {             //displays chosen dog breed picture
    $('#dog-breed').submit(event => {
        event.preventDefault();
        getUserText();
        getDogBreed();
    });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm1();
  watchForm2();
  watchForm3();
});