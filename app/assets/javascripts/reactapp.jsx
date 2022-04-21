import React from 'react'
import ReactDOM from 'react-dom'
import Messages from "./components/messages.jsx"
import { createRoot } from 'react-dom/client';
import Game from "./components/game.jsx"


// import Messages from "./components/messages";

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<Messages />, document.body.appendChild(document.createElement('div')))
// })

const root = createRoot(document.getElementById('game'));
root.render(<Game />);

var messageEl = document.getElementById('messages');
const messageRoot = createRoot(messageEl);
messageRoot.render(<Messages gameid={messageEl.dataset.gameid}/>);
