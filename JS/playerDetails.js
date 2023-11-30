import {getPlayerDetails, getPlayerStats} from './fetchData.js'

const input = document.getElementById('username')


const player_details_div = document.getElementById('player-details-display-info')

const avatar = document.getElementById('player-details-avatar')
const username = document.getElementById('player-details-username')
const name = document.getElementById('player-details-name')
const id = document.getElementById('player-details-id')
const profile_link = document.getElementById('player-details-link')
const streamer = document.getElementById('player-details-streamer')
const followers = document.getElementById('player-details-followers')
const joined = document.getElementById('player-details-joined')
const last_online = document.getElementById('player-details-last-online')

// Wins, Loss, Draws, Stats
const details_div = document.getElementById('player-details-wins-loss-draw')

const bullet_stats = document.getElementById("bullet-stats")
const bullet_stats_games_played = document.getElementById("bullet-stats-games-played")
const bullet_stats_wins = document.getElementById("bullet-stats-wins")
const bullet_stats_loss = document.getElementById("bullet-stats-loss")
const bullet_stats_draws = document.getElementById("bullet-stats-draws")

const blitz_stats = document.getElementById("blitz-stats")
const blitz_stats_games_played = document.getElementById("blitz-stats-games-played")
const blitz_stats_wins = document.getElementById("blitz-stats-wins")
const blitz_stats_loss = document.getElementById("blitz-stats-loss")
const blitz_stats_draws = document.getElementById("blitz-stats-draws")

const rapid_stats = document.getElementById("rapid-stats")
const rapid_stats_games_played = document.getElementById("rapid-stats-games-played")
const rapid_stats_wins = document.getElementById("rapid-stats-wins")
const rapid_stats_loss = document.getElementById("rapid-stats-loss")
const rapid_stats_draws = document.getElementById("rapid-stats-draws")


// Current Player, Stats
const current_player_stats_div = document.getElementById('player-details-current-stats-info')

const current_bullet_info_div = document.getElementById("current-bullet-info")
const current_bullet_info_score = document.getElementById("current-bullet-info-score")
// const current_bullet_info_matches = document.getElementById("current-bullet-info-matches")

const current_blitz_info_div = document.getElementById("current-blitz-info")
const current_blitz_info_score = document.getElementById("current-blitz-info-score")
// const current_blitz_info_matches = document.getElementById("current-blitz-info-matches")

const current_rapid_info_div = document.getElementById("current-rapid-info")
const current_rapid_info_score = document.getElementById("current-rapid-info-score")
// const current_rapid_info_matches = document.getElementById("current-rapid-info-matches")

// Best Player, Stats
const best_player_stats_div = document.getElementById('player-details-best-stats-info')

const best_bullet_info_div = document.getElementById("best-bullet-info")
const best_bullet_info_score = document.getElementById("best-bullet-info-score")
// const best_bullet_info_matches = document.getElementById("best-bullet-info-matches")

const best_blitz_info_div = document.getElementById("best-blitz-info")
const best_blitz_info_score = document.getElementById("best-blitz-info-score")
// const best_blitz_info_matches = document.getElementById("best-blitz-info-matches")

const best_rapid_info_div = document.getElementById("best-rapid-info")
const best_rapid_info_score = document.getElementById("best-rapid-info-score")
// const best_rapid_info_matches = document.getElementById("best-rapid-info-matches")


const userNotFound = document.getElementById("user-not-found")
function displayUserNotFound(){
    userNotFound.style.display = "block"
}
function hideUserNotFound(){
    userNotFound.style.display = "none"
}

input.addEventListener("change", () => {
    setTimeout(playerDetails(input), 1000)
    setTimeout(playerWinsLossDraws(input), 1000)
    setTimeout(playerCurrentStats(input), 1000)
    setTimeout(playerBestStats(input), 1000)

    // playerDetails(input)
    // playerWinsLossDraws(input)
    // playerCurrentStats(input)
    // playerBestStats(input)
})

function getDate(timestamp){
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' }); // Months are zero-based, so add 1
    const day = date.getDate();

    return `${month} / ${day} / ${year}`;

}


function playerDetails(input){
    getPlayerDetails(input.value)
    .then(data => {
        if (data.code == 0){
            player_details_div.style.display = "none"
            displayUserNotFound()
            // console.log("NOTHING")
        }
        else{
            hideUserNotFound()
            player_details_div.style.display = "flex"

            if (data.avatar == undefined){
                avatar.src = '../Assets/Images/default_player_image.svg'
            }
            else{
                avatar.src = data.avatar
                
            }
            username.innerHTML = `<span>Username:</span> ${data.username}`
            name.innerHTML = `<span>Name:</span> ${data.name}`
            id.innerHTML = `<span>Player ID:</span> ${data.player_id}`
            profile_link.href = data.url
            profile_link.innerHTML = `Visit ${data.username}'s profile`
            followers.innerHTML = `<span>Followers:</span> ${data.followers}`
            joined.innerHTML = `<span>Date Joined:</span> ${getDate(data.joined)}`
            last_online.innerHTML = `<span>Last Online:</span> ${getDate(data.last_online)}`
    
            if (data.is_streamer){
                streamer.style.display = "block"
                streamer.innerHTML = `<span>Streamer:</span> Yes`
            }
            else{
                streamer.style.display = "none"
            }
        }
        
    })
    .catch(error => {
        player_details_div.style.display = "none"
        displayUserNotFound()
        console.log(error)
    })
}

function playerWinsLossDraws(input){
    getPlayerStats(input.value)

    .then(data => {

        if (data.code == 0){
            details_div.style.display = "none"
            // console.log("NOTHING")
        }
        else{
            hideUserNotFound()
            details_div.style.display = "flex"
            if (data.chess_bullet != undefined){
                bullet_stats.style.display = "block"
                let draw = data.chess_bullet.record.draw
                let loss = data.chess_bullet.record.loss
                let win = data.chess_bullet.record.win
                let total_games = draw+loss+win
                bullet_stats_games_played.innerHTML = `Total Games: ${total_games}`
                bullet_stats_wins.innerHTML = `Wins: ${win}`
                bullet_stats_loss.innerHTML = `Losses: ${loss}`
                bullet_stats_draws.innerHTML = `Draws: ${draw}`
            }
            else{
                bullet_stats.style.display= "none"
            }
    
            
            if (data.chess_blitz != undefined){
                blitz_stats.style.display = "block"
                let draw = data.chess_blitz.record.draw
                let loss = data.chess_blitz.record.loss
                let win = data.chess_blitz.record.win
                let total_games = draw+loss+win
                blitz_stats_games_played.innerHTML = `Total Games: ${total_games}`
                blitz_stats_wins.innerHTML = `Wins: ${win}`
                blitz_stats_loss.innerHTML = `Losses: ${loss}`
                blitz_stats_draws.innerHTML = `Draws: ${draw}`
            }
            else{
                blitz_stats.style.display= "none"
            }
    
    
            if (data.chess_rapid != undefined){
                rapid_stats.style.display = "block"
                let draw = data.chess_rapid.record.draw
                let loss = data.chess_rapid.record.loss
                let win = data.chess_rapid.record.win
                let total_games = draw+loss+win
                rapid_stats_games_played.innerHTML = `Total Games: ${total_games}`
                rapid_stats_wins.innerHTML = `Wins: ${win}`
                rapid_stats_loss.innerHTML = `Losses: ${loss}`
                rapid_stats_draws.innerHTML = `Draws: ${draw}`
            }
            else{
                rapid_stats.style.display= "none"
            }
        }
        
    })
    .catch(error => {
        details_div.style.display = "none"
        console.log(error)
    })
}


function playerCurrentStats(input){
    getPlayerStats(input.value)
    
        .then(data => {
            if (data.code == 0){
                current_player_stats_div.style.display = "none"
                // console.log("NOTHING")
            }
            else{
                hideUserNotFound()
                current_player_stats_div.style.display = "flex"
                if (data.chess_bullet != undefined){
                    current_bullet_info_div.style.display = "block"
                    current_bullet_info_score.innerHTML = data.chess_bullet.last.rating
                    let draw = data.chess_bullet.record.draw
                    let loss = data.chess_bullet.record.loss
                    let win = data.chess_bullet.record.win
                    // current_bullet_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
                }
    
                else{
                    current_bullet_info_div.style.display = "none"
                }
    
                if (data.chess_blitz != undefined){
                    current_blitz_info_div.style.display = "block"
                    current_blitz_info_score.innerHTML = data.chess_blitz.last.rating
                    let draw = data.chess_blitz.record.draw
                    let loss = data.chess_blitz.record.loss
                    let win = data.chess_blitz.record.win
                    // current_blitz_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
                }
    
                else{
                    current_blitz_info_div.style.display = "none"
                }
    
                if (data.chess_rapid != undefined){
                    current_rapid_info_div.style.display = "block"
                    current_rapid_info_score.innerHTML = data.chess_rapid.last.rating
                    let draw = data.chess_rapid.record.draw
                    let loss = data.chess_rapid.record.loss
                    let win = data.chess_rapid.record.win
                    // current_rapid_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
                }
    
                else{
                    current_rapid_info_div.style.display = "none"
                }
            }
            
            
        })
        .catch(error => {
            current_player_stats_div.style.display = "none"
            console.log(error)
        })
}

function playerBestStats(input){
    getPlayerStats(input.value)
    
        .then(data => {
            if (data.code == 0){
                best_player_stats_div.style.display = "none"
                // console.log("NOTHING")
            }
            else{
                hideUserNotFound()
                best_player_stats_div.style.display = "flex"
                if (data.chess_bullet != undefined){
                    best_bullet_info_div.style.display = "block"
                    best_bullet_info_score.innerHTML = data.chess_bullet.best.rating
                    let draw = data.chess_bullet.record.draw
                    let loss = data.chess_bullet.record.loss
                    let win = data.chess_bullet.record.win
                    // best_bullet_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
                }
    
                else{
                    best_bullet_info_div.style.display = "none"
                }
    
                if (data.chess_blitz != undefined){
                    best_blitz_info_div.style.display = "block"
                    best_blitz_info_score.innerHTML = data.chess_blitz.best.rating
                    let draw = data.chess_blitz.record.draw
                    let loss = data.chess_blitz.record.loss
                    let win = data.chess_blitz.record.win
                    // best_blitz_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
                }
    
                else{
                    best_blitz_info_div.style.display = "none"
                }
    
                if (data.chess_rapid != undefined){
                    best_rapid_info_div.style.display = "block"
                    best_rapid_info_score.innerHTML = data.chess_rapid.best.rating
                    let draw = data.chess_rapid.record.draw
                    let loss = data.chess_rapid.record.loss
                    let win = data.chess_rapid.record.win
                    // best_rapid_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
                }
    
                else{
                    best_rapid_info_div.style.display = "none"
                }
            }
            
            
        })
        .catch(error => {
            best_player_stats_div.style.display = "none"
            console.log(error)
        })
}