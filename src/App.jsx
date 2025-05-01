import { useState } from 'react';
import './App.css';

function App() {
  const [userGoal, setUserGoal] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePrompt = async () => {
    setLoading(true);
    setPrompt('');

    try {
      const res = await fetch('/api/generatePrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userGoal }),
      });

      const data = await res.json();
      setPrompt(data.prompt);
    } catch (err) {
      setPrompt('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🧠 PromptNova</h1>
      <p>Launch smarter prompts with PromptNova — your personal AI copilot.</p>

      <textarea
        placeholder="What do you want ChatGPT to do?"
        value={userGoal}
        onChange={(e) => setUserGoal(e.target.value)}
        rows={4}
      />

      <button
        onClick={handleGeneratePrompt}
        disabled={!userGoal || loading}
      >
        {loading ? 'Building...' : 'Build Prompt'}
      </button>

      {prompt && (
        <div className="result">
          <h3>📝 Optimized Prompt:</h3>
          <p>{prompt}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(prompt);
              alert('✅ Prompt copied to clipboard!');
            }}
            style={{ marginTop: '1rem' }}
          >
            Copy Prompt
          </button>
        </div>
      )}
    </div>
  ); // ✅ CLOSE return()
}

export default App;
