import React, { useState } from 'react'
import Match from '../Match/Match'
import BarLoader from "react-spinners/BarLoader"

// import Bronze from '../../assets/ranked-emblems/Emblem_Bronze.png'
// import Challenger from '../../assets/ranked-emblems/Emblem_Challenger.png'
// import Diamond from '../../assets/ranked-emblems/Emblem_Diamond.png'
// import Gold from '../../assets/ranked-emblems/Emblem_Gold.png'
// import Grandmaster from '../../assets/ranked-emblems/Emblem_Grandmaster.png'
// import Iron from '../../assets/ranked-emblems/Emblem_Iron.png'
// import Master from '../../assets/ranked-emblems/Emblem_Master.png'
// import Platinum from '../../assets/ranked-emblems/Emblem_Platinum.png'
// import Silver from '../../assets/ranked-emblems/Emblem_Silver.png'
import './ResultsBox.scss'


const version = '13.3.1'

const ResultsBox = ({ rankData, playerData, matches, isLoading }) => {
  let emblemName = ''

  if(rankData !== undefined){
    emblemName = 'Emblem_' + rankData.tier.substring(0,1) + rankData.tier.substring(1).toLowerCase() + '.png'
  }
  

  return (
    <div className='results-wrapper'>
      {
        isLoading ? (
          <div className='loading-container'>
            <BarLoader 
              color={'rgb(159, 49, 49)'}
              cssOverride={{width: '100%'}}
            />
          </div>
        ) : (
          <div className='results'>
          {playerData.status === 400 || playerData.status === 404 ? (
            <h2 className='error-message'>Summoner not found.</h2>
          ) : ( 
            <div>
              <div className='summoner-wrapper'>
                <div className='summoner-left-side'>
                  <div className='summoner-icon-area'>
                    <img 
                        className='summoner-icon' 
                        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${playerData.profileIconId}.png`} 
                        alt='summoner-icon'
                    />
                    <p className='summoner-level'>{playerData.summonerLevel}</p>
                  </div>
                  <div className='summoner-name-info'>
                    <h2 className='summoner-name'>{playerData.name}</h2>
                    {rankData && <p className='win-lose'>
                        W-L: <span style={{fontWeight: 'bold', marginLeft: '5px'}}>{rankData.wins} - {rankData.losses}</span>
                        <span style={{fontWeight: 'normal', marginLeft: '5px'}}>{"("}{Math.round(((rankData.wins)/(rankData.wins + rankData.losses)*100))}{"%)"}</span>
                      </p>}
                  </div>
                </div>

                <div className='summoner-right-side'>
                  {rankData === undefined ? <p style={{ backgroundColor: '#222', color: 'white', padding: '8px', marginLeft: '20px', borderRadius: '5px' }}>UNRANKED</p> : (
                    <div className='summoner-rank-info'>
                      <img className='rank-image' src={`/images/${emblemName}`}  alt='rank'/>
                      <div className='summoner-rank-details'>
                        <h3 className='lp'>LP: <span style={{fontWeight: 'bold'}}>{rankData.leaguePoints}</span></h3>
                        {rankData === undefined ? <p>Unranked.</p> : (
                        <div>
                          <p className='rank'>Rank: <span style={{fontWeight: 'bold'}}>{rankData.tier} {(rankData.tier !== 'MASTER' && rankData.tier !== 'GRANDMASTER' && rankData.tier !== 'CHALLENGER') ? rankData.rank : ''}</span></p>
                        </div>
                        )
                      }
                      </div>
                    </div>
                  )
                }
                </div>
              </div>
              
              <div className='matches'>
                {matches.length !== 0 ? matches.map((match) => (
                  <Match key={match.info.gameId} match={match} playerData={playerData}/>
                )) : (
                  <p>No match info...</p>
                )}
              </div>
            </div>
            )}
          </div>
        )
      }
      
    </div>
  )
}

export default ResultsBox