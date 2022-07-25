import React from 'react'

const ProfilePageInputs = ({title,type,readonly,value,handleEdit}) => {
  return (
    <div className={title==='About Me' ? `ppinput textBox` : 'ppinput'}>
        <h4 className='ppinputtitle'>{title}</h4>
        {readonly ? <input disabled defaultValue={value} type={type} name={type} id={value} /> : <input onChange={(e)=>handleEdit(e)} defaultValue={value} type={type} name={type} id={title}  />}
    </div>
  )
}

export default ProfilePageInputs