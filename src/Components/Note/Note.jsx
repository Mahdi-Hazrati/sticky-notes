import React from 'react'
// import { AiFillDelete } from "react-icons/ai"
import color from "../../Utils/color-palette"
import "./Note.css"

function Note({ id, value }) {
  const RandomColor = () => {
    let randomInt = Math.floor(Math.random() * color.length)
    return color[randomInt]
  }
  return (
    <div className='note' style={{backgroundColor: RandomColor()}}>
      {/* <AiFillDelete className='icon' /> */}
      <p>{value}</p>
    </div>
  )
}

export default Note