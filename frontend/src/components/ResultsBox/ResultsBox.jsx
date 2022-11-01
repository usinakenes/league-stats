import React, { useState } from 'react'
import Match from '../Match/Match'
import BarLoader from "react-spinners/BarLoader"

import './ResultsBox.scss'

const ResultsBox = ({ playerData, matches, isLoading }) => {

  return (
    <div className='results-wrapper'>
      {
        isLoading ? (
          <div className='loading-container'>
            <BarLoader 
              color={'#f00'}
              cssOverride={{width: '100%'}}
            />
          </div>
        ) : (
          <div className='results'>
            <div className='champion-wrapper'>
              <img 
                  className='summoner-icon' 
                  src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${playerData.profileIconId}.png`} 
                  alt='summoner-icon'
              />
              <h2 className='summoner-name'>{playerData.name}</h2>
              <p className='summoner-level'>Level: {playerData.summonerLevel}</p>
            </div>
            <div className='matches'>
              {matches.length !== 0 ? matches.map((match) => (
                <Match key={match.info.gameId} match={match} playerData={playerData}/>
              )) : (
                <h2>no info</h2>
              )}
            </div>
          </div>)
      }
      
    </div>
  )
}

export default ResultsBox