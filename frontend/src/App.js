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


  useEffect(() => {

      axios.get('https://league-stats.onrender.com/api/searchPlayer', 
        { params: { username: summonerName, regionPrefix: regionsToRegionPrefixes.get(selectedRegion) } })
      .then(res => {
        setPlayerData(res.data)
      }).catch(err => {
        console.log(err);
      })

      axios.get('https://league-stats.onrender.com/api/getPlayerRank',
        { params: {username: summonerName, regionPrefix: regionsToRegionPrefixes.get(selectedRegion) } })
        .then(res => {

        let target;

          for (let i = 0; i < res.data.length; i++){
            if (res.data[i].queueType === 'RANKED_SOLO_5x5'){
              target = res.data[i]
              break;
            }
          }

          setRankData(target)
        }).catch(err => {
          console.log(err)
        })

      axios.get('https://league-stats.onrender.com/api/latest20Matches', 
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
