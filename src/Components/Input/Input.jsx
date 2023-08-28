import React from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import "./Input.css"

function Input({ onChange, value, onSubmit , className, placeholder}) {
  return (
    <div className={`note-input-container ${className}`} >
      <input
        type="text"
        onChange={onChange}
        value={value}
        onKeyDown={event => event.key === "Enter" && onSubmit(value)}
        placeholder={placeholder}
        spellCheck={false}
      />
      <button onClick={() => onSubmit(value)}>
        <AiOutlinePlus className='icon' />
      </button>
    </div>
  )
}

export default Input