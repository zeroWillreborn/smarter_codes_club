import React, { useEffect, useState } from 'react'
import '../pages/global.css'
const Avatar = ({name}) => {
  const [brand, setBrand] = useState("Smart")
  useEffect(() => {
    setBrand(name[0] + ' s_c');
  }, [name,brand])
  
  return (
    <>
        <div className="headerLeft">
        <span className="avatar">{brand}</span>
        <span className="nameaddr"><h1>{name}</h1><h5>Anywhere,India</h5></span>
        </div>
    </>
  )
}

export default Avatar