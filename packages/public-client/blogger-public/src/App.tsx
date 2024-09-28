import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [message, setMessage] = useState<string[]>([]);
  const fetchApi = async () => {
    const response = await axios.get('http://localhost:3000/');
    setMessage(response.data.message);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold underline text-red-500">
          {' '}
          Hello, Tailwind CSS in React!!
        </h1>
        <h1 className="text-sky-500">{message}</h1>
      </div>
    </div>
  );
}

export default App;
