import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

import './Dropdown.scss'

const Dropdown = ({ selectedRegion, setSelectedRegion}) => {

    const [isActive, setIsActive] = useState(false)

    const options = ['NA', 'EUNE', 'EUW', 'TR', 'BR', 'KR', 'JP', 'LAN', 'LAS', 'RU', 'OCE']

  return (
    <div className='dropdown'>
        <div className='dropdown-btn' onClick={e => setIsActive(!isActive)}>{selectedRegion}</div>
        <div className='dropdown-icon-wrapper' onClick={e => setIsActive(!isActive)}>
            <BsChevronDown />
        </div>
            {isActive && (
                <div className='dropdown-content'>
                    {options.map((option, index) => (
                        <div 
                          key={index} 
                          onClick={e => {
                            setSelectedRegion(option)
                            setIsActive(false)
                          }}
                          className='dropdown-item'
                        >
                          {option}
                        </div>
                    ))}
                    
                </div>
            )}
    </div>
  )
}

export default Dropdown