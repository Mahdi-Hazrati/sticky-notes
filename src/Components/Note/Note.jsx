import React from 'react'
import "./Note.css"

function Note({ id, value }) {
  return (
    <div>
      <h1>{id} | {value}</h1>
    </div>
  )
}

export default Note