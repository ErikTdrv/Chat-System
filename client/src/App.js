import React, { useEffect, useState } from 'react';
import io from "socket.io-client"
import './App.css';
const socket = io('http://localhost:3001', { transports: ['websocket'] });

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [username, setUsername] = useState(null);
  const [isChatClicked, setIsChatClicked] = useState(false);

  useEffect(() => {
    const cookie = '1234'; // Replace with the actual user ID or cookie value
    socket.auth = { cookie };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("privateMessage", ({ from, content }) => {
      setReceivedMessages((prevMessages) => [...prevMessages, content]);
    });

    return () => {
      socket.off("privateMessage");
    };
  }, []);
  function sendPrivateMessage(content) {
    socket.emit("privateMessage", ({ content }))
  }
  return (
    <>
      {!isChatClicked ? (
        <div className="username__container">
          <div className="username__verifier">
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id='username' onChange={(e) => setUsername(e.target.value)} />
            </div>
            <button onClick={() => setIsChatClicked(true)}>Chat!</button>
          </div>
        </div>
      ) : (
        <div className="chat__window">
          <div className="chat__container">
            <h1>Chat System</h1>
            <hr />
            <div className="chats">
              <div className="people">
                <div className='person'>
                  <h1>Tom</h1>
                </div>
                <div className='person'>
                  <h1>Erik</h1>
                </div><div className='person'>
                  <h1>Ivan</h1>
                </div><div className='person'>
                  <h1>Bogdan</h1>
                </div><div className='person'>
                  <h1>Tom</h1>
                </div>
              </div>
              <div className="messages"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
{/* <input type="text" onChange={(e) => setMessage(e.target.value)} />
<button onClick={() => sendPrivateMessage(message)}>Send a message</button>
{receivedMessages.map((e) => {
  return <li key={e}>{e}</li>
})} */}

export default App;
