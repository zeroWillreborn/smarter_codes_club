import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Li from './Li'

const SearchBox = ({searchActive,onFocusedOut,onFocused,handleOpen}) => {


  function openSkillModal(e) {
    
  }
  return (
    <>
   <div className={searchActive ? 'searchContainer searchActive' : 'searchContainer'}>
   <div className='searchBox'>
        <span className="searchIco"><SearchIcon/></span>
        <input  onFocus={(e)=>{onFocused(e)}} type="text" name="search" id="skillSearchInput" placeholder='Search for skills' />
    </div>

    <div className="recommendation">
      
   {
        
        lngDataArray.map((e,i)=>{
          return <Li key={i} text={lngDataArray[i]}/>
        })
      } 
      <span onClick={(e)=>{handleOpen()}} className="addBtn">
        <span className="ico"><AddIcon/></span>
        <span  className="txt">Add a New Skill</span>
      </span> 
    </div>
   </div>
    </>
  )
}

export default SearchBox

const lngDataArray = [
    "HTML",
    "JavaScript",
    "Angular.Js",
    "Vue.Js",
]