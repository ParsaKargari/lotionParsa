import React from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditNote() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [localnotes, setLocalNotes] = useOutletContext();
  const currentNote = localnotes.find(note => note.id === id);
  const [content, setContent] = useState(currentNote.content);
  const [title, setTitle] = useState(currentNote.title);
  const [date, setDate] = useState(currentNote.date);
  console.log(localnotes)

  const saveData = () => {
    currentNote.date = date;
    currentNote.content = content;
    currentNote.title = title;
    localStorage.setItem('notes', JSON.stringify(localnotes))
    navigate(`/view/${id}`, { replace: true })
  };

  const onDelete = () => {
    const response = window.confirm('Are you sure you want to delete this note?');
    if (response) {
      const formattedNotes = localnotes.filter(note => note.id !== id);
      setLocalNotes(formattedNotes);
      
      if (formattedNotes.length > 0) {
        navigate(`/view/${formattedNotes[0].id}`, { replace: true });
      }
      if (formattedNotes.length === 0) {
        navigate(`/base/`, { replace: true });
      }
    }
  }

  return (
    <>
    <div id = 'pageContent'>
    <header id='notes-header'>
            <div className='left-notes-header'>
            <input id='noteTitle' type='text' placeholder='Note Title' 
            value={title} onChange={(e) => setTitle(e.target.value) } 
            maxLength='100'/>
            <input type="datetime-local" id='date-time-input' onChange={(e) => setDate(e.target.value)} value={date} />
            </div>
            <div id='buttonGroup'>
              <button id='save-button' onClick={saveData} >Save</button>
              <button id='delete-button'onClick={onDelete} >Delete</button>
            </div>

    </header>
          <ReactQuill id='noteContent' theme="snow" value={content} onChange={setContent} defaultValue={currentNote} />
    </div>
    </>
  )
}
