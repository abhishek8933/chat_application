import './App.css';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const username=nanoid(4);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat=(e)=>{
    e.preventDefault();
    socket.emit("chat",{ message,username});
    setMessage('');
  }
  useEffect(() => {
    socket.on("chat",(payload)=>{
      setChat([...chat,payload])
    })
   
  })
  

  return (
    <div className="App">
      <h1>Chatty App</h1>
      {
        chat.map((payload,index)=>{
          return (
            <p key={index}>{payload.message}:<span>id:{payload.username}</span></p>
          )
        })
      }
      <form onSubmit={sendChat}>
        <input type='text' name="chat"
          placeholder="Send Text"
          value={message}
          onChange={
            (e) => {
              setMessage(e.target.value)
            }
          }
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
