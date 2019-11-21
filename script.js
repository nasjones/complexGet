const apiKey = 'api_key=g1iC5cphPQEWGeoKWzidykfGFvolnhqCVpSPTFIV';
let hasitRun = false;

function getRepos() {
    let states = document.getElementById("states").value;
    let amt = document.getElementById('park-amount').value;
    let link = 'https://developer.nps.gov/api/v1/parks?stateCode=' + states + '&' + apiKey + '&limit=' + amt;
    $('#parkStage').empty();
    $('#errorMsg').empty();
    fetch(link)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson =>
            showRepos(responseJson, states, amt))
        .catch(error => {
            $('#errorMsg').text(`Something went wrong: ${error.message}`);
        });
    $('.results').removeClass('hidden');
}

function showRepos(responseJson, states, amt) {
    $('#parkStage').append(`<h2> Here's the ${amt} park(s) from ${states}</h2>
     <ul id="parkList"></ul>`);
    console.log(responseJson);
    for (let i = 0; i < responseJson.data.length; i++) {
        console.log(responseJson.data[i].name);
        $('#parkList').append(`<li>${responseJson.data[i].name}:<br>${responseJson.data[i].description}<br><a href="${responseJson.data[i].url} target="_blank"">Visit the website!</a></li><br>`);
    }
}

function submit() {
    $('form').submit(e => {
        e.preventDefault();
        getRepos();
    });
}

submit();