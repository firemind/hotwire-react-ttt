// import 'channels'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import consumer from '../channels/consumer'

const Messages = (props) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const MessagesChannel = consumer.subscriptions.create({channel: 'MessagesChannel', game: props.gameid}, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
    },
  })

  useEffect(() => {
    MessagesChannel.received = (data) => setMessages(data.messages)
  }, [])

  const handleSubmit = async (e, gameid) => {
    e.preventDefault()
    // Add the X-CSRF-TOKEN token so rails accepts the request
    await fetch('http://localhost:3000/games/'+gameid+'/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      },
      body: JSON.stringify({ content:  message }),
    })
    setMessage('')
  }

  return (
    <div>
      <input type="text" value={message} onChange={({ target: { value } }) => setMessage(value)} />
      <button onClick={(e) => handleSubmit(e, props.gameid)}>Send message</button>

      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  )
}
export default Messages;