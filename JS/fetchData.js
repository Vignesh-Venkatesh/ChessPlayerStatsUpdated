// Fetch certain player profile
export async function getPlayerDetails(username) {
    return fetch(`https://api.chess.com/pub/player/${username}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data; // Return the data
        })
        .catch(error => {
            console.error(error);
        });
}


// Fetch List of titled-player usernames.
export function getListOfTitledPlayerUsernames(title_abbrev){
    fetch(`https://api.chess.com/pub/titled/${title_abbrev}`)
        .then(response => response.json())
        .then(response => {
            console.log('getListOfTitledPlayerUsernames',response)
        })
        .catch(error => {
            console.log(error)
        })
}

// Get ratings, win/loss, and other stats about a player's game play, tactics, lessons and Puzzle Rush score.

export async function getPlayerStats(username) {
    return fetch(`https://api.chess.com/pub/player/${username}/stats`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data; // Return the data
        })
        .catch(error => {
            console.error(error);
            throw error; // Rethrow the error to be caught by the caller
        });
}



// Array of Daily Chess games that a player is currently playing
export function getPlayerGames(username){
    fetch(`https://api.chess.com/pub/player/${username}/games`)
        .then(response => response.json())
        .then(response => {
            console.log('getPlayerGames',response)
        })
        .catch(error => {
            console.log(error)
        })
}


// getPlayerStats('iiigiv2k3')
// getPlayerStats('iiigiv')
// getPlayerGames('erik')
