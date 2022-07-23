import React from 'react'

const Li = ({text,skillsLinksClicked}) => {
  return (
    <>
    <div onClick={(e)=>skillsLinksClicked(e,text)} className='searchListItem'>
    {text}
    </div>
    </>
  )
}

export default Li