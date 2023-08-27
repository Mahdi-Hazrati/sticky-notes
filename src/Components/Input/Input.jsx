import "./Input.css"
import React from 'react'

function Input({ onChange, value, onSubmit }) {
  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        value={value}
      />
      <button onClick={() => onSubmit(value)}>add</button>
    </div>
  )
}

export default Input