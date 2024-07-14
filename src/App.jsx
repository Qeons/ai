import './App.css';
import { requestToGroqAI } from './utils/groq'; 
import { useState, useEffect } from 'react';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import backgroundImage from './utils/background.jpg';

function App() {
  const [data, setData] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(""); 

  const handlesubmit = async (event) => {
    event.preventDefault();
    const ai = await requestToGroqAI(inputValue);
    setData(ai);
    setIsVisible(true);
    setInputValue(""); 
  };

  useEffect(() => {
    if (data) {
      setIsVisible(true); 
    }
  }, [data]);

  return (
    <main className="main">
      <h1 className='text-4xl text-indigo-500'>Qeons Ai</h1>
      <form className='input-container' onSubmit={handlesubmit}>
        <input 
          placeholder='ketik prompt disini...' 
          className='input-field' 
          id='content'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          type='submit'
          className='button'
        >
          Kirim
        </button>
      </form>
      <div className={`response-container ${isVisible ? 'visible' : ''}`}>
        {data ? (
          <SyntaxHighlight language="javascript" style={synthwave84} wrapLongLines={true}>
            {data}
          </SyntaxHighlight>
        ) : null}
      </div>
    </main>
  );
}

export default App;
