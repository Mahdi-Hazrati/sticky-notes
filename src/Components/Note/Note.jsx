import React from 'react'
import { TiDelete } from "react-icons/ti"
import "./Note.css"

function Note({ id, value, color, backgroundColor }) {
  return (
    <div className='note' style={{ backgroundColor: backgroundColor, color: color }}>
      <TiDelete className='icon' style={{color:color}} />
      <p>{value}</p>
    </div>
  )
}

export default Note