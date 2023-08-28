import React from 'react'
import { BsSticky } from "react-icons/bs"
import "./Header.css"

export default function Header() {
  return (
    <div className='header'>
      <BsSticky className="icon" />
      <h1>Sticky Note Web App</h1>
    </div>
  )
}
