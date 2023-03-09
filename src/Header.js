import React from 'react'

export default function Header({toggle}) {
  const today = new Date();
  const dateTime = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = today.toLocaleDateString('en-US', dateTime);
  
  return (
    <>
      <div id='left-header'>
      <button id="menu-button" onClick={toggle}>
        &#9776;
      </button>
      </div>
      <div id='middle-header'>
        <h1>Lotion</h1>
        <p>Like Notion, but worse.</p>
      </div>
      <div id = 'right-header-main'>
      <img src='https://i.kym-cdn.com/photos/images/original/002/429/796/96c.gif' id='duck-dance' alt='duck-dance'></img>
        <div id='right-header'>
          <p>Today's date</p>
          <h3>{date}</h3>
        </div>
      </div>
    </>
  )
}
