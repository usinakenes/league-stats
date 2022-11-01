import React, { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import axios from 'axios'

import './Searchbar.scss'
import Dropdown from '../Dropdown/Dropdown'



const Searchbar = ({
    searchText,
    setSearchText,
    summonerName,
    setSummonerName,
    selectedRegion,
    setSelectedRegion,
    searchForLatestMatches,
    setIsLoading
}) => {

    const onClickHandler = (e) => {
        e.preventDefault()
        setSummonerName(searchText)
        setIsLoading(true)
        console.log('button is clicked');
    }

  return (
    <div className='form-wrapper'>
        <h2 className='form-title'>Search for a summoner</h2>
        <form className='form'>
            <label className='summoner-label'>Summoners name:</label>
            <input 
                className='summoner-input' 
                type='text' 
                placeholder='Ex: TheFaithfulDevil' 
                onChange={e => setSearchText(e.target.value)}
            />
            <label className='region-label'>Region:</label>
            <Dropdown selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            <button 
                className='search-button'
                onClick={e => onClickHandler(e)}
            >
                <div className='arrow-icon'>
                    <AiOutlineArrowRight />
                </div>
            </button>
        </form>
    </div>
  )
}

export default Searchbar