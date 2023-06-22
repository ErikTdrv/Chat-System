import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register/Register';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Register />} />
    </Routes>
  )
}
{/* <input type="text" onChange={(e) => setMessage(e.target.value)} />
<button onClick={() => sendPrivateMessage(message)}>Send a message</button>
{receivedMessages.map((e) => {
  return <li key={e}>{e}</li>
})} */}

export default App;
