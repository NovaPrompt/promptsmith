// /api/generatePrompt.js
import fetch from 'node-fetch'; // Only needed in Node.js environments like Vercel functions

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ prompt: 'Method not allowed' });
  }

  const { userGoal } = req.body;

  if (!userGoal) {
    return res.status(400).json({ prompt: 'Missing user goal' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a prompt generator assistant.' },
          { role: 'user', content: `Turn this idea into a well-structured AI prompt: ${userGoal}` },
        ],
      }),
    });

    const data = await response.json();

    const finalPrompt = data.choices?.[0]?.message?.content?.trim() || 'No prompt generated.';
    res.status(200).json({ prompt: finalPrompt });

  } catch (error) {
    console.error('OpenAI API Error:', error); // ✅ Now properly placed
    res.status(500).json({ prompt: 'Error generating prompt.' });
  }
}
