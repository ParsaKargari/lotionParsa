import react from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function NoteList({notes}) {

    const {id} = useParams();
    console.log(id)
    if (!notes || notes.length === 0) 
    return (<p className='sideBar-noNotes'>No Notes Yet</p>);

    

    function highlight(n) {
        if (n === id) {
            return 'clickedON';
        }
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatDate = (tday) => {
        const formatted = new Date(tday).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "No date specified";
        }
        return formatted;
      };

    return (
        <div id = 'sideBar-content'>
            {notes.map(note => {
                const noteText = (note.content.substring(0, 25) + '...').replace(/<[^>]*>?/gm, '');
                return(
                    <Link to={`/view/${note.id}`} key={`${note.id}`}>
                    <div className={`noteBlock ${highlight(note.id)}`} id={`${note.id}`} key={`${note.id}`} >
                        <div className='noteBlock-title'>
                            {note.title.substring(0, 20)}
                        </div>
                        <div className='noteBlock-date'>{formatDate(note.date)}</div>
                        <div className='noteBlock-content'>
                            {noteText}
                        </div>
                    </div>
                    </Link>
                )
            })}
        </div>
    )
}
