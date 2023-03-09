import React, { useState, useEffect } from 'react';
import Header from './Header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {storeInLocalStorage, fetchFromLocalStorage} from "./Storage";
import { v4 as uuid } from "uuid";
import NoteList from './NoteList';
import { Outlet } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";

export default function Home() {

  const [localNotes, setLocalNotes]= useState(JSON.parse(localStorage.getItem("notes")) || []);
  useEffect(() => { localStorage.setItem("notes", JSON.stringify(localNotes))});
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  let date = today.toISOString().slice(0, 16);

  const navigate = useNavigate();
  useEffect(() => { navigate(`/base/`, { replace: true })}, []);

    const initialState = {
        notes: fetchFromLocalStorage('notes'),
        count: 0,
      }
    
    const [collapsed, setCollapsed] = React.useState(false);
    const toggle = ()=> {
        setCollapsed(!collapsed);
    }

    function plusNote() {
    onSaveNoteClicked();
    }

    const [formData, setFormData] = useState({
        noteTitle: "",
        noteContent: ""
      });
    
      const onSaveNoteClicked = () => {
        let newID = uuid();
        const newNote = {
          id: newID, // generate a unique id for the note
          title: 'Untitled',
          content: '',
          date: date
        }
        setLocalNotes([newNote, ...localNotes]);
        navigate(`/edit/${newID}`, { replace: true })
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
            <button id = 'plus-button' onClick={plusNote}>&#43;</button>
          </div>
          
          <NoteList notes={localNotes}/>
          
        </div>

        <div id = 'pageContent-right'>
        
        <Outlet context={[localNotes, setLocalNotes]} />
        
        </div>
      </div>
    </>
  )
}
