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
        <img className='logo' src="/images/league-logo.png" alt="logo" />
        <h2 className='form-title'>Search for a summoner</h2>
        <form className='form'>
            <input 
                className='summoner-input' 
                type='text' 
                placeholder='Summoner name' 
                onChange={e => setSearchText(e.target.value)}
            />
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