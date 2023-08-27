import React from 'react';
import { useState } from 'react';
import Input from "../Components/Input/Input"
import Note from "../Components/Note/Note"
import "shiftgrid"
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, value: "Remember to buy groceries" },
    { id: 2, value: "Call mom to check on her" },
    { id: 3, value: "Finish report for work" },
    { id: 4, value: "Prepare for upcoming meeting" },
    { id: 5, value: "Pay bills by end of the week" },
    { id: 6, value: "Schedule dentist appointment" },
    { id: 7, value: "Start new book for leisure reading" },
    { id: 8, value: "Plan weekend activities" },
    { id: 9, value: "Complete workout session" },
    { id: 10, value: "Clean and organize desk space" },
  ])
  const [inputValue, setInputValue] = useState("")

  function handleInputValueChange(event) {
    let mainInputValue = event.target.value
    console.log("value changed")
    setInputValue(mainInputValue)
  }
  function submitNewNote(value) {
    console.log("new note submit")
    let newNote = {
      id: notes.length + 1,
      value: value
    }
    setNotes([...notes, newNote])
  }
  return (
    <div className="app container">

      {/* input */}
      <Input
        onChange={handleInputValueChange.bind(this)}
        value={inputValue}
        onSubmit={submitNewNote}
      />
      {/* note list */}
      {notes.map((note) => (
        <Note key={note.id} id={note.id} value={note.value} />

      ))}
    </div>
  );
}

export default App;
