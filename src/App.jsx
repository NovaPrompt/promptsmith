import { useState } from 'react';
import './App.css';

function App() {
  const [goal, setGoal] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    setLoading(true);

    // Simulated prompt logic — we’ll connect to GPT soon
    const suggestion = `Write a clear, specific ChatGPT prompt that helps the AI ${goal.toLowerCase()}. Include audience, tone, and desired output format.`;

    setPrompt(suggestion);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🧠 PromptNova</h1>
      <p>Launch smarter prompts with PromptNova — your personal AI copilot.</p>

      <textarea
        placeholder="What do you want ChatGPT to do?"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <button onClick={generatePrompt} disabled={loading || !goal}>
        {loading ? 'Thinking...' : 'Build Prompt'}
      </button>

      {prompt && (
        <div className="output">
          <h3>Optimized Prompt:</h3>
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
