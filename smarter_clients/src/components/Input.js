import React from 'react'


const Input = ({setUserLoginDetails,Icon,textHead,type,placeH}) => {
  return (
    <div className='inputContainer'>
        <aside className="upInput d-flex">
          <span className="icon">{<Icon/>}</span>
          <span className="textHead">{textHead}</span>
        </aside>

        <aside className='downInput'>
              <input onChange={(e)=>setUserLoginDetails(e)} type={type} name={textHead} className='input' placeholder={placeH} />
        </aside>

    </div>
  )
}

export default Input