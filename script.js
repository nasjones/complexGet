const apiKey = 'g1iC5cphPQEWGeoKWzidykfGFvolnhqCVpSPTFIV';

function getRepos() {
    let username = document.getElementById("user").value;
    let link = 'https://api.github.com/users/' + username + '/repos';
    $('#repoStage').empty();
    $('#errorMsg').empty();
    fetch(link)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson =>
            showRepos(responseJson, username))
        .catch(error => {
            $('#errorMsg').text(`Something went wrong: ${error.message}`);
        });
    $('.results').removeClass('hidden');
}

function showRepos(responseJson, username) {
    $('#repoStage').append(`<h2> Here are all of ${username}'s repos</h2>
     <ul id="repoList"></ul>`);
    for (let i = responseJson.length - 1; i > 0; i--) {
        $('#repoList').append(`<li>${responseJson[i].name} -- <a href="${responseJson[i].html_url}" target="_blank">link</a> </li>`);
    }
}

function submit() {
    $('form').submit(e => {
        e.preventDefault();
        getRepos();
    });
}

submit();