import React, { useState } from 'react';
import Header from './Header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {storeInLocalStorage, fetchFromLocalStorage} from "./Storage";
import { v4 as uuid } from "uuid";
import NoteList from './NoteList';

export default function App() {
  // localStorage.clear();

  const initialState = {
    notes: fetchFromLocalStorage('notes'),
    count: 0,
  }

  const allNotes = (initialState.notes)

  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = ()=> {
    setCollapsed(!collapsed);
  }

  const [plusNote, setPlusNote] = React.useState(false);
  const plusNoteToggle = ()=> {
    onSaveNoteClicked();
    if (plusNote === false) {
      setPlusNote(true);
    }
  }

  const [formData, setFormData] = useState({
    noteTitle: "",
    noteContent: ""
  });

  const onNoteTitleChange = (event) => {
    setFormData(prevData => {
      return {
        ...prevData,
        noteTitle: event.target.value
      }
    })
  }
  
  const onNoteContentChange = (value) => {
    setFormData(prevData => {
      return {
        ...prevData,
        noteContent: value
      }
    })
  }

  const onSaveNoteClicked = () => {
    let newID = uuid();
    const newNote = {
      id: newID, // generate a unique id for the note
      title: 'Untitled',
      content: ''
    }
    const updatedNotes = [...initialState.notes, newNote];
    storeInLocalStorage('notes', updatedNotes);
    setFormData({ noteTitle: "", noteContent: "" });
    console.log(initialState.notes)
  }

  const onSaveNoteClicked2 = () => {
    console.log(initialState.currentUUID)
  }
  
  return (
    <>
      <header id = 'header-container'>
        <Header toggle={toggle}/>
      </header>
    
      <div id = 'pageContent-container'>
        <div id = 'pageContent-left' className={`${collapsed ? "hidden" : ""}`}>
          <div id = 'sideBar-title'>
            <h2>Notes</h2>
            <button id = 'plus-button' onClick={plusNoteToggle}>&#43;</button>
          </div>
          
          <NoteList notes = {allNotes}/>
          
        </div>

        <div id = 'pageContent-right'>
        <div id = 'pageContent' className={`${plusNote ? "writenotes" : ""}`}>
          <p id='default-noNote'>Select a note, or create a new one.</p>
          <header id='notes-header'>
            <input id='noteTitle' type='text' placeholder='Note Title' 
            value={formData.noteTitle} onChange={onNoteTitleChange} />
            <div id='buttonGroup'>
              <button id='save-button' onClick={onSaveNoteClicked2}>Save</button>
              <button id='delete-button'>Delete</button>
            </div>

          </header>
          <ReactQuill id='noteContent' theme="snow" value={formData.noteContent} onChange={onNoteContentChange} />
        </div>

        </div>
      </div>
    </>
  )
}