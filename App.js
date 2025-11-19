import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App(){
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  useEffect(()=> {
    axios.get('/api/hello').then(r => setMsgs(r.data.rows || []));
  }, []);
  const send = async () => {
    if(!text) return;
    await axios.post('/api/message', { text });
    const r = await axios.get('/api/hello');
    setMsgs(r.data.rows || []);
    setText('');
  };
  return (
    <div style={{padding:20,fontFamily:'sans-serif'}}>
      <h1>Simple 3-Tier App</h1>
      <div>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Message" />
        <button onClick={send}>Send</button>
      </div>
      <ul>
        {msgs.map(m => <li key={m.id}>{m.text}</li>)}
      </ul>
    </div>
  );
}
