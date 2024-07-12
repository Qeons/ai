import './App.css';
import { requestToGroqAI } from './utils/groq'; 
import { useState } from 'react';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function App() {
  const [data, setData] = useState("");

  const handlesubmit = async () => {
    const ai = await requestToGroqAI(document.getElementById('content').value);
    setData(ai);
  };

  return (
    <main className="main">
      <h1 className='text-4xl text-indigo-500'>Ai By Qeons.</h1>
      <form className='input-container'>
        <input 
          placeholder='ketik permintaan disini...' 
          className='input-field' 
          id='content'
          type='text'
        />
        <button 
          onClick={handlesubmit}
          type='button'
          className='button'
        >
          Kirim
        </button>
      </form>
      <div className='response-container'>
        {data ? (
          <SyntaxHighlight language="swift" style={darcula} wrapLongLines={true}>
            {data}
          </SyntaxHighlight>
        ) : null}
      </div>
    </main>
  );
}

export default App;
