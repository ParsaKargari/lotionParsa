import React from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useParams, useNavigate, useOutletContext, Link} from 'react-router-dom';

export default function ViewNote() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [localnotes, setLocalNotes] = useOutletContext();

  const currentNote = localnotes.find(note => note.id === id);

  var stringToHTML = function (str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };

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
      return "";
  }
  return formatted;
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
        <p>{currentNote.title}</p>
        <div>{formatDate(currentNote.date)}</div>
        </div>
        <div id='buttonGroup'>
            <Link to={`/edit/${id}`}>
              <button id='edit-button'>Edit</button>
            </Link>
            <button id='delete-button' onClick={onDelete} >Delete</button>
        </div>
    </header>
    <div id='viewBoxOuter'>
      <div id='viewBox' dangerouslySetInnerHTML={{ __html: currentNote.content }} />
    </div>
    </div>
    </>
  )
}
