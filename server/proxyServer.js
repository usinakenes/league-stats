var express = require('express')
var cors = require('cors')
var axios = require('axios')
var dotenv = require('dotenv')

dotenv.config()

var app = express()

app.use(cors())

const API_KEY = process.env.SECRET_API_KEY

function getPlayerPUUID(playerName, regionPrefix){
    return axios.get('https://' + regionPrefix + '.api.riotgames.com' + '/lol/summoner/v4/summoners/by-name/' 
        + playerName + '?api_key=' + API_KEY)
        .then(res => {
            return res.data.puuid
        }).catch(err => {
            console.error(err)
        })
}

function getPlayerID(playerName, regionPrefix){
    return axios.get('https://' + regionPrefix + '.api.riotgames.com' + '/lol/summoner/v4/summoners/by-name/' 
        + playerName + '?api_key=' + API_KEY)
        .then(res => {
            return res.data.id
        }).catch(err => {
            console.error(err)
        })
}

app.get('/api/searchPlayer', async (req, res) => {
    const playerName = req.query.username
    const regionPrefix = req.query.regionPrefix

    const playerData = await axios.get('https://' + regionPrefix + '.api.riotgames.com' + '/lol/summoner/v4/summoners/by-name/' 
    + playerName + '?api_key=' + API_KEY)
    .then(res => res.data)
    .catch(err => err)

    res.json(playerData)
})

app.get('/api/getPlayerRank', async (req, res) => {
    const playerName = req.query.username
    const regionPrefix = req.query.regionPrefix
    
    const ID = await getPlayerID(playerName, regionPrefix)
    const API_CALL = 'https://' + regionPrefix + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + ID + '?api_key=' + API_KEY

    const playerRank = await axios.get(API_CALL)
        .then(res => res.data)
        .catch(err => err)

    res.json(playerRank)
 })


app.get('/api/latest20Matches', async (req, res) => {
    const playerName = req.query.username
    const regionPrefix = req.query.regionPrefix
    const continentPrefix = req.query.continentPrefix

    const PUUID = await getPlayerPUUID(playerName, regionPrefix)
    const API_CALL = 'https://' + continentPrefix + '.api.riotgames.com' + '/lol/match/v5/matches/by-puuid/' 
        + PUUID + '/ids' + '?api_key=' + API_KEY

    const matchIds = await axios.get(API_CALL)
        .then(res => res.data)
        .catch(err => err)

    var matchDataArray = []
    
    for(var i = 0; i < matchIds.length; i++){
        const matchId = matchIds[i]
        const matchData = await axios.get('https://' + continentPrefix + '.api.riotgames.com' + '/lol/match/v5/matches/' 
            + matchId + '?api_key=' + API_KEY)
            .then(res => res.data)
            .catch(err => err)
        
        matchDataArray.push(matchData)
    }
        
    res.json(matchDataArray)
})

app.listen(4000, function(){
    console.log("Server started on port 4000");
})