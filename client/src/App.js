import React, { useEffect, useState } from 'react';
import io from "socket.io-client"
import './App.css';
const socket = io('http://localhost:3001', { transports: ['websocket'] });

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  useEffect(() => {
    const cookie = '1234'; // Replace with the actual user ID or cookie value
    socket.auth = { cookie };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("privateMessage", ({from, content}) => {
      setReceivedMessages((prevMessages) => [...prevMessages, content]);
    });
  
    return () => {
      socket.off("privateMessage");
    };
  }, []);
  function sendPrivateMessage(content) {
    socket.emit("privateMessage", ({content}))
  }
  return (
    <div className="App">
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendPrivateMessage(message)}>Send a message</button>
      { receivedMessages.map((e) => {
        return <li key={e}>{e}</li>
      })}
    </div>
  );
}

export default App;
