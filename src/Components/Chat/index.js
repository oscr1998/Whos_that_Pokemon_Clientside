import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../App';
import './chatStyle.css'

export default function Chat() {
    const socket = useContext(SocketContext)

    function sendChatMessage (e) {
        e.preventDefault()
        
        const data = Object.fromEntries(new FormData(e.target))
        const { room, message } = data
    
        socket.emit('chat-message', { room, message })
    }

    return (
    <div className='chatContainer nes-container with-title'>
        <div className='chatLayout'>
            <div className='chatElement'>
                <h2 className="chatHeader" id="chatHeader">Chat</h2>
                <form onSubmit={sendChatMessage}>
                    <input className="chatInputText" type='text' name='room' placeholder='Global channel'></input>
                    <br/>
                    <br/>
                    <input className="chatInputText" type='text' name='message' placeholder='Message' required></input>
                    <br></br>
                    <br></br>
                    <input className="chatInputButton nes-btn is-success" type='submit' value='Send'></input>
                </form>
            </div>

            <div className='chatElement convo'>
                <p></p>
            </div>
            
        </div>
</div>
)
}
