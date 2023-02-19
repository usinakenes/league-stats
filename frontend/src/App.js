import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

import './App.scss';
import Searchbar from './components/Searchbar/Searchbar';
import ResultsBox from './components/ResultsBox/ResultsBox';
import { regionsToContinentsMap, regionsToRegionPrefixes} from './assets/regions-continents-map';



function App() {

  const [searchText, setSearchText] = useState('')
  const [summonerName, setSummonerName] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('EUNE')

  const [playerData, setPlayerData] = useState({})
  const [matches, setMatches] = useState([])
  const [rankData, setRankData] = useState({})

  const [isLoading, setIsLoading] = useState(false)




  // console.log(playerData);
  // console.log(matches)

  useEffect(() => {

      axios.get('http://localhost:4000/api/searchPlayer', 
        { params: { username: summonerName, regionPrefix: regionsToRegionPrefixes.get(selectedRegion) } })
      .then(res => {
        setPlayerData(res.data)
      }).catch(err => {
        console.log(err);
      })

      axios.get('http://localhost:4000/api/getPlayerRank',
        { params: {username: summonerName, regionPrefix: regionsToRegionPrefixes.get(selectedRegion) } })
        .then(res => {
          setRankData(res.data[res.data.length-1])
          console.log(rankData)
        }).catch(err => {
          console.log(err)
        })

      axios.get('http://localhost:4000/api/latest20Matches', 
        { params: { 
          username: summonerName,
           regionPrefix: regionsToRegionPrefixes.get(selectedRegion),
           continentPrefix: regionsToContinentsMap.get(selectedRegion)
          } 
        })
      .then(res => {
        setMatches(res.data)
        setIsLoading(false)
      }).catch(err => {
        console.log(err);
      })   

  }, [summonerName])

  console.log(summonerName)


  return (
    <div className='App'>
      <div className='App-inside'>
        <Searchbar 
          searchText={searchText}
          setSearchText={setSearchText}
          summonerName={summonerName}
          setSummonerName={setSummonerName}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          setIsLoading={setIsLoading}
        />
        {
          summonerName !== '' && (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.4 }}
            className='resultsbox'
          >
            <ResultsBox rankData={rankData} playerData={playerData} matches={matches} isLoading={isLoading}/>
          </motion.div>
          
        )}
      </div>
    </div>  
  );
}

export default App;
