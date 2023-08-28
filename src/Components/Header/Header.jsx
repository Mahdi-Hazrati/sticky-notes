import React from 'react'
import { BsSticky } from "react-icons/bs"
import "./Header.css"

export default function Header({innerText, className}) {
  return (
    <div className={`header ${className}`}>
      <BsSticky className="icon" />
      <h1>{innerText}</h1>
    </div>
  )
}
