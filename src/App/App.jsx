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
  // app state inital
  const [notes, setNotes] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [localStorageKey, setLocalStorageKey] = useState("notes")
  // get notes from local strage and setstate on first time load
  useEffect(() => {
    // it's return a array of object then set to state
    setNotes(getFromLocalStorage(localStorageKey))
  }, [localStorageKey])
  // this function give a local storage key and return standard format array of item object
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
  // this function set new object to local storage with key and object argumnet object foramt most be array to ittrable
  function setToLocalStorage(key, newObject) {
    // validate args value
    if (key && typeof key === "string" && typeof newObject === "object") {
      // set new list to local storage object
      localStorage.setItem(key, JSON.stringify(newObject))

    } else {
      console.log("Error to setitem in local storage")
    }
  }
  // this function handle value change in main input get value and set to input state
  function handleInputValueChange(event) {
    let mainInputValue = event.target.value
    setInputValue(mainInputValue)
  }
  // this function give a colors array and return random item of array
  function RandomColor(colors) {
    let randomInt = Math.floor(Math.random() * color.length)
    return colors[randomInt]
  }
  // when press enter or + button call this function and submit new note in state
  function submitNewNote(value) {
    if (value && typeof value === "string") {
      // create new todo object
      let bgColor = RandomColor(color)
      let textColor = getContrastColor(bgColor)
      let newNote = {
        id: notes.length + 1,
        value: value.trim(),
        backgroundColor: bgColor,
        color: textColor,
      }
      // set new note to state
      setNotes([...notes, newNote])
      // make input value empty
      setInputValue("")
      // save new note on local storage
      setToLocalStorage(localStorageKey, [...notes, newNote])
    }
  }
  // this function give a note id and remove from state and local storage - call when click on (x) button in note
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
              className={"col"}
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
