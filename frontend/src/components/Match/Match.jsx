import React from 'react'
import './Match.scss'
import { summonerSpells } from '../../assets/summoner-spells'

const version = '13.3.1'

const Match = ({ match, playerData }) => {
  
    let participantIndex = match.metadata.participants.indexOf(playerData.puuid)
    let participant = match.info.participants[participantIndex]
    let participantTeam = participant.teamId
    let teaminfo = match.info.teams
    let teamIndex = teaminfo.findIndex(e => e.teamId === participantTeam)

    return(
      <div key={match.info.gameId} className={`match-container ${teaminfo[teamIndex].win ? 'win' : 'lose'}`}>
        <div className='left-side'>
          <h5 className={`game-mode ${teaminfo[teamIndex].win ? 'win' : 'lose'}`}>{match.info.gameMode} – {teaminfo[teamIndex].win ? 'Victory' : 'Defeat'}</h5>
          <p className='champion'>{participant.championName}</p>
          <h5 className='score'>{teaminfo[0].objectives.champion.kills} - {teaminfo[1].objectives.champion.kills}</h5>
        </div>
        <div className='middle-side'>
          <div className='middle-top-side'>
            <div className='champion-icon-circle'>
              <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participant.championName}.png`} alt='champion-icon'/>
            </div>
            <div className='level-circle'>
              <p className='level'>{participant.champLevel}</p>
            </div>
            <div className='summoners'>
                <div className='summoners-1'>
                    <img className='summoners-img summoners-1-img' src={summonerSpells[summonerSpells.findIndex(e => e.key === participant.summoner1Id.toString())].icon} alt='summoners-1-img' />
                </div>
                <div className='summoners-1'>
                    <img className='summoners-img summoners-2-img' src={summonerSpells[summonerSpells.findIndex(e => e.key === participant.summoner2Id.toString())].icon} alt='summoners-1-img' />
                </div>
            </div>
            <div className='score-area'>
              <p className='score'>{participant.kills}/{participant.deaths}/{participant.assists}</p>
              <p className='kda'>KDA: {Math.round(((participant.kills + participant.assists)/participant.deaths)*100)/100}</p>
            </div>
            <div className='gold-dmg-area'>
              <p className='cs'> CS: <span style={{fontWeight:'normal'}}>{participant.totalMinionsKilled}</span></p>
              <p className='gold'>Gold: <span style={{fontWeight:'normal'}}>{participant.goldEarned}</span></p>
            </div>
          </div>
        </div>
        <div className='right-side'>
            <ul className='items'>
              
              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item0 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item0}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>

              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item1 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item1}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>
              
              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item2 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item2}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>
              
              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item3 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item3}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>
              
              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item4 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item4}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>
              
              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item5 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item5}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>
              
              <li className='item'>
                <div className='item-icon-area'>
                  {participant.item6 === 0 ? (
                    <div className='empty-slot'></div>
                  ) : (
                    <img className='item-icon' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.item6}.png`} alt='item-icon'/>
                  )}
                </div>
              </li>
            </ul>
          </div>
      </div>
      
    )
  }

export default Match