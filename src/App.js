import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [label, setLabel] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/sentiment', { text })
      .then(res => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setLabel(res.data.label);
          setScore(res.data.score);
          setError('');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <h1>Enter a tweet:</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleTextChange} placeholder="Enter your tweet text" />
        <button type="submit">Submit</button>
      </form>
      {label && score && (
        <div className="result">
          <h2>Sentiment analysis result:</h2>
          <p><strong>Label:</strong> {label}</p>
          <p><strong>Score:</strong> {score}</p>
        </div>
      )}
      {error && (
        <div className="error">
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
