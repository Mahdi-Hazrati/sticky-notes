import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../Components/Header/Header"
import Input from "../Components/Input/Input"
import Note from "../Components/Note/Note"
import color from "../Utils/color-palette"
import getContrastColor from '../Utils/getContrastColor';
import "shiftgrid"
import './App.css';

function App() {
  const [notes, setNotes] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [localStorageKey, setLocalStorageKey] = useState("notes")
  // get notes from local strage and setstate
  useEffect(() => {
    setNotes(getFromLocalStorage(localStorageKey))


  }, [localStorageKey])

  function getFromLocalStorage(key) {
    // console.log("You try to get from local storage", key)
    if (key && typeof key === "string") {
      let dataFromLocalStorage = JSON.parse(localStorage.getItem(key))
      // validate data from local storage  data !=== null
      if (dataFromLocalStorage === null) {
        // console.log("Local storage is empty and return empty array")
        return []
      } else {
        // console.log(`Local storage have some data with ${key} key.`)
        return dataFromLocalStorage

      }

    }
  }
  function setToLocalStorage(key, newObject) {
    // validate args value
    if (key && typeof key === "string" && typeof newObject === "object") {
      // set new list to local storage object
      localStorage.setItem(key, JSON.stringify(newObject))

    } else {
      console.log("Error to setitem in local storage")
    }
  }
  function handleInputValueChange(event) {
    let mainInputValue = event.target.value
    setInputValue(mainInputValue)
  }
  function RandomColor() {
    let randomInt = Math.floor(Math.random() * color.length)
    return color[randomInt]
  }

  function submitNewNote(value) {
    if (value && typeof value === "string") {
      // create new todo object
      let bgColor = RandomColor()
      let textColor = getContrastColor(bgColor)
      let newNote = {
        id: notes.length + 1,
        value: value.trim(),
        backgroundColor: bgColor,
        color: textColor,
      }
      // set new note on state
      setNotes([...notes, newNote])
      // make input value empty
      setInputValue("")
      // save new note on local storage
      setToLocalStorage(localStorageKey, [...notes, newNote])
    }
  }
  function removeNote(noteID) {
    let userConfirmResult = window.confirm("Do You Want to Remove This Note? \t" + noteID)
    if (userConfirmResult) {
      let filteredNotes = notes.filter((note) => {
        return note.id !== noteID
      })
      // update state
      setNotes(filteredNotes)
      // update local storage
      setToLocalStorage(localStorageKey, filteredNotes)
    } else {
      console.log("user cancel note remove proccess! \t", noteID)
    }
  }

  return (
    <div className="app container">
      <div className="row">
        <div className="col">
          <Header
            innerText={"Sticky Notes - Web App"}
            className={""}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Input
            className={""}
            onChange={handleInputValueChange.bind(this)}
            value={inputValue}
            placeholder={"enter your sticky note"}
            onSubmit={submitNewNote}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {notes.map((note) => (
            <Note
              className={"col g-10"}
              key={note.id}
              id={note.id}
              value={note.value}
              color={note.color}
              backgroundColor={note.backgroundColor}
              handleRemove={removeNote}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
