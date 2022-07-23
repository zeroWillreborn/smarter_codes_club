import Button from '@mui/material/Button';
import React from 'react'

const AuthButton = ({onDataSubmit,btntext}) => {
  return (
    <div className='authButton'>
        <Button onClick={(e)=>onDataSubmit(e)}>
            {btntext}
        </Button>
    </div>
  )
}

export default AuthButton