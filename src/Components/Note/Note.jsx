import React from 'react'
import { TiDelete } from "react-icons/ti"
import "./Note.css"

function Note({ id, value, color, backgroundColor, handleRemove, className }) {
  return (
    <div className={`note ${className}`} style={{ backgroundColor: backgroundColor, color: color }}>
      <span style={{ color: color }} className="index">#{id}</span>
      <TiDelete
        className='icon'
        style={{ color: color }}
        onClick={() => handleRemove(id)}
      />
      <p style={{ color: color }}>{value}</p>
    </div>
  )
}

export default Note