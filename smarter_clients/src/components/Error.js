import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import '../pages/global.css'
const Error = ({errText}) => {
  return (
    <div className='errorBox'>
<span className="errorIcon">
<ErrorIcon/>
</span>
<span className="errorText">
{errText}
</span>
    </div>
  )
}

export default Error