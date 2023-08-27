import React from 'react';
import Input from "../Components/Input/Input"
import Note from "../Components/Note/Note"
import "shiftgrid"
import './App.css';

function App() {
  return (
    <div className="app">
      Sticky Notes web app
      <Input />
      <Note />
    </div>
  );
}

export default App;
