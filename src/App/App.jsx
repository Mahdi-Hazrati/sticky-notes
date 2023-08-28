import React from 'react';
import { useState, useEffect } from 'react';
import Input from "../Components/Input/Input"
import Note from "../Components/Note/Note"
import "shiftgrid"
import './App.css';
import color from "../Utils/color-palette"

function App() {
  const [notes, setNotes] = useState([
    // { id: 1, value: "Remember to buy groceries", backgroundColor: "#3F51B5", color: "white" },
    // { id: 2, value: "Call mom to check on her", backgroundColor: "#3F51B5", color: "white" },
    // { id: 3, value: "Finish report for work", backgroundColor: "#3F51B5", color: "white" },
    // { id: 4, value: "Prepare for upcoming meeting", backgroundColor: "#3F51B5", color: "white" },
    // { id: 5, value: "Pay bills by end of the week", backgroundColor: "#3F51B5", color: "white" },
    // { id: 6, value: "Schedule dentist appointment", backgroundColor: "#3F51B5", color: "white" },
    // { id: 7, value: "Start new book for leisure reading", backgroundColor: "#3F51B5", color: "white" },
    // { id: 8, value: "Plan weekend activities", backgroundColor: "#3F51B5", color: "white" },
    // { id: 9, value: "Complete workout session", backgroundColor: "#3F51B5", color: "white" },
    // { id: 10, value: "Clean and organize desk space", backgroundColor: "#3F51B5", color: "white" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [localStorageKey, setLocalStorageKey] = useState("notes")
  // get notes from local strage and setstate
  useEffect(() => {
    setNotes(getFromLocalStorage(localStorageKey))


  }, [localStorageKey])

  function getFromLocalStorage(key) {
    console.log("You try to get from local storage", key)
    if (key && typeof key === "string") {
      let dataFromLocalStorage = JSON.parse(localStorage.getItem(key))
      // validate data from local storage  data !=== null
      if (dataFromLocalStorage === null) {
        console.log("Local storage is empty and return empty array")
        return []
      } else {
        console.log(`Local storage have some data with ${key} key.`)
        return dataFromLocalStorage

      }

    }
  }
  function setToLocalStorage(key, newObject) {
    // validate args value
    if (key && typeof key === "string" && typeof newObject === "object") {
      console.log("You try to set new note to local storage", key, newObject)
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
  const RandomColor = () => {
    let randomInt = Math.floor(Math.random() * color.length)
    return color[randomInt]
  }
  function submitNewNote(value) {
    console.log("new note submit")
    if (value && typeof value === "string") {
      // create new todo object
      let bgColor = RandomColor()
      let txtColor = "white" // TODO : conditional contrast view
      let newNote = {
        id: notes.length + 1,
        value: value.trim(),
        backgroundColor: bgColor,
        color: txtColor,
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
    <div className="app container-fluid">

      {/* input */}
      <Input
        onChange={handleInputValueChange.bind(this)}
        value={inputValue}
        onSubmit={submitNewNote}
      />
      {/* note list */}
      <div className="notes-container">
        {notes.map((note) => (
          <Note
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
  );
}

export default App;
