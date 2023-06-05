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
          <div className="people__container">
            <div className="others">
              <div className="others__item">
                <h1><i class="fa-solid fa-user-group"></i>Friends</h1>
              </div>
            </div>
            <hr />
            <div className="people__wrapper">
              <div className="people">
                <div className='person'>
                  <img src="/profilepicture.jpg" />
                  <h1>Erik</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                <div className='person'>
                  <img src="/simona.jpg" />
                  <h1>Simona</h1>
                </div>
                
                
              </div>
            </div>
          </div>
          <div className="messages__container">
            <div className="top__message__container"></div>
            <div className="bottom__message__container"></div>
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
