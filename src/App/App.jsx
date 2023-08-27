import React from 'react';
import Input from "../Components/Input/Input"
import Note from "../Components/Note/Note"
import "shiftgrid"
import './App.css';

function App() {
  return (
    <div className="app col-sm-6 col-md-4">
      
      <h1>Sticky Notes web app</h1>
      <Input />
      <Note />
    </div>
  );
}

export default App;
