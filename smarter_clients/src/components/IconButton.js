import React from 'react'


const IconButton = ({BtnIcon,BtnText}) => {
  return (
    <div className="iconBtn">
        <span className="iconBtnIco">{<BtnIcon/>}</span>
        <span className="iconBtnText">{BtnText}</span>
    </div>
  )
}

export default IconButton