import './App.css';
import { requestToGroqAI } from './utils/groq'; 
import { useState } from 'react';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userMessage = { type: 'user', text: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    const context = messages
      .filter(msg => msg.type === 'user')
      .map(msg => `User: ${msg.text}`)
      .join('\n') + `\nUser: ${inputValue}\nAI:`;

    const aiResponse = await requestToGroqAI(context);
    const botMessage = { type: 'bot', text: aiResponse };
    setMessages(prevMessages => [...prevMessages, botMessage]);

    setInputValue(""); 
  };

  return (
    <main className="main">
      <h1 className='text-4xl text-indigo-500'>Qeons Ai</h1>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.type === 'user' ? (
              <div className="user-message">{msg.text}</div>
            ) : (
              <SyntaxHighlight language="javascript" style={twilight} wrapLongLines={true}>
                {msg.text}
              </SyntaxHighlight>
            )}
          </div>
        ))}
      </div>
      <form className='input-container' onSubmit={handleSubmit}>
        <input 
          placeholder='Message Qeons Ai' 
          className='input-field' 
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='button'>Kirim</button>
      </form>
    </main>
  );
}

export default App;
