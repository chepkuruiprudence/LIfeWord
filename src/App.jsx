import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [advice, setAdvice] = useState('Fetching advice ...');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

const getAdvice = async (e) => {
  e.preventDefault();
  setLoading (true);
  try {;
  const response = await fetch ('https://api.adviceslip.com/advice');
  if (!response.ok) {
    throw new Error("Something went rong");
  }
  const advice = await response.json();
  setAdvice(advice.slip.advice);
  setLoading(false);
} catch (e) {
  setAdvice('Failed to fetch advice. Please try again.');
  setLoading(false);
} finally{
 setLoading(false);
}
};

useEffect(() => {
  getAdvice({preventDefault: () => {}});
}, []);

  return (
    <>
    <div className='container'>
      <h1>words that count</h1>

      {loading ? (<p>Loading ...</p>) : (<textarea value={advice} error = {error} id="adviceTxt" readOnly>  {advice}</textarea>)}
      
      <button className='getBtn' onClick={getAdvice}>get advice</button>
    </div> 
    </>
  )
}

export default App;
