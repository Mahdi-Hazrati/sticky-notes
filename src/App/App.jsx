import React from 'react';
import { useState } from 'react';
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
      let newNote = {
        id: notes.length + 1,
        value: value,
        backgroundColor: bgColor,
        color: "white"
      }
      // set new note on state
      setNotes([...notes, newNote])
      // make input value empty
      setInputValue("")
    }
  }
  function removeNote(noteID) {
    let userConfirmResult = window.confirm("Do You Want to Remove This Note? \t" + noteID)
    if (userConfirmResult) {
      let filteredNotes = notes.filter((note) => {
        return note.id !== noteID
      })

      setNotes(filteredNotes)
    }else{
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
