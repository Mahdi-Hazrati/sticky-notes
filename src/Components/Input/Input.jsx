import React from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import "./Input.css"

function Input({ onChange, value, onSubmit }) {
  return (
    <div className="note-input-container">
      <input
        type="text"
        onChange={onChange}
        value={value}
        onKeyDown={event => event.key === "Enter" && onSubmit(value)}
        placeholder='enter new sticky note'
        spellCheck={false}
      />
      <button onClick={() => onSubmit(value)}>
        <AiOutlinePlus className='icon' />
      </button>
    </div>
  )
}

export default Input