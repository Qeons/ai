import './App.css';
import { requestToGroqAI } from './utils/groq'; 
import { useState } from 'react';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

function App() {
  const [data, setData] = useState("");

  const handlesubmit = async () => {
    const ai = await requestToGroqAI(document.getElementById('content').value);
    setData(ai);
  };

  return (
    <main className="main">
      <h1 className='text-4xl text-indigo-500'>Qeons Ai</h1>
      <form className='input-container'>
        <input 
          placeholder='ketik prompt disini...' 
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
          <SyntaxHighlight language="javascript" style={monokai} wrapLongLines={true}>
            {data}
          </SyntaxHighlight>
        ) : null}
      </div>
    </main>
  );
}

export default App;
