import React from 'react'
import ReactDOM from 'react-dom'
import Messages from "./components/messages.jsx"
import { createRoot } from 'react-dom/client';
import Game from "./components/game.jsx"


// import Messages from "./components/messages";

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<Messages />, document.body.appendChild(document.createElement('div')))
// })

const gameEl = document.getElementById('game');
const root = createRoot(gameEl);
root.render(<Game gameid={gameEl.dataset.gameid} playerid={gameEl.dataset.playerid}/>);

const messageEl = document.getElementById('messages');
const messageRoot = createRoot(messageEl);
messageRoot.render(<Messages gameid={messageEl.dataset.gameid}/>);
