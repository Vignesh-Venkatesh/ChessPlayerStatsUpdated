import {getPlayerStats} from './fetchData.js'

const input = document.getElementById('username')

const player_stats_div = document.getElementById('player-details-stats-info')

const bullet_info_div = document.getElementById("bullet-info")
const bullet_info_score = document.getElementById("bullet-info-score")
const bullet_info_matches = document.getElementById("bullet-info-matches")

const blitz_info_div = document.getElementById("blitz-info")
const blitz_info_score = document.getElementById("blitz-info-score")
const blitz_info_matches = document.getElementById("blitz-info-matches")

const rapid_info_div = document.getElementById("rapid-info")
const rapid_info_score = document.getElementById("rapid-info-score")
const rapid_info_matches = document.getElementById("rapid-info-matches")

input.addEventListener("change", () => {
    console.log(input.value)
    getPlayerStats(input.value)
    
        .then(data => {
            player_stats_div.style.display = "flex"
            if (data.chess_bullet != undefined){
                bullet_info_div.style.display = "block"
                bullet_info_score.innerHTML = data.chess_bullet.last.rating
                let draw = data.chess_bullet.record.draw
                let loss = data.chess_bullet.record.loss
                let win = data.chess_bullet.record.win
                bullet_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
            }

            else{
                bullet_info_div.style.display = "none"
            }

            if (data.chess_blitz != undefined){
                blitz_info_div.style.display = "block"
                blitz_info_score.innerHTML = data.chess_blitz.last.rating
                let draw = data.chess_blitz.record.draw
                let loss = data.chess_blitz.record.loss
                let win = data.chess_blitz.record.win
                blitz_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
            }

            else{
                blitz_info_div.style.display = "none"
            }

            if (data.chess_rapid != undefined){
                rapid_info_div.style.display = "block"
                rapid_info_score.innerHTML = data.chess_rapid.last.rating
                let draw = data.chess_rapid.record.draw
                let loss = data.chess_rapid.record.loss
                let win = data.chess_rapid.record.win
                rapid_info_matches.innerHTML = `<span id="win">${win}</span> / <span id="loss">${loss}</span> / <span id="draw">${draw}</span>`
            }

            else{
                rapid_info_div.style.display = "none"
            }
            
        })
})