import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../Components/Header/Header"
import Input from "../Components/Input/Input"
import Note from "../Components/Note/Note"
import Footer from '../Components/Footer/Footer';
import color from "../Utils/color-palette"
import getContrastColor from '../Utils/getContrastColor';
import "shiftgrid"
import './App.css';

function App() {
  // app state inital
  const [appDetails, setAppDetails] = useState({
    app_title: "My Sticky Notes",
    app_input_placeholder: "type new note here",
    our_slogan: "No limits, only possibilities",
    app_release_year: 2023,
    author_username: "Mahdi Hazrati",
    author_website_url: "https://github.com/Mahdi-Hazrati",
    footer_github_text: "Have a bug ? fix an",
    footer_github_url: "https://github.com/Mahdi-Hazrati/sticky-notes",

  })
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
    <div className="app">
      <div className="header-container">
        <Header
          className={"header"}
          innerText={appDetails.app_title}
        />
      </div>
      <div className="main-input-container">
        <Input
          className={"input"}
          onChange={handleInputValueChange.bind(this)}
          value={inputValue}
          placeholder={appDetails.app_input_placeholder}
          onSubmit={submitNewNote}
        />
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            className={"note"}
            key={note.id}
            id={note.id}
            value={note.value}
            color={note.color}
            backgroundColor={note.backgroundColor}
            handleRemove={removeNote}
          />
        ))}
      </div>
      <div className="footer-container">
        <Footer
          slogan={appDetails.our_slogan}
          year={appDetails.app_release_year}
          username={appDetails.author_username}
          userurl={appDetails.author_website_url}
          github_text={appDetails.footer_github_text}
          github_url={appDetails.footer_github_url}
        />
      </div>

    </div>
  );
}

export default App;
