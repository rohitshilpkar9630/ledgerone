// api/ai.js — Gemini version (Vercel serverless)
export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY)
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });

  try {
    const { system = '', user = '', model = 'gemini-1.5-flash', max_tokens = 400 } = req.body || {};

    // build prompt (system + user)
    const finalPrompt = `${system}\n\nUser: ${user}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: finalPrompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: max_tokens,
            temperature: 0.3,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(response.status).send(errText);
    }

    const data = await response.json();
    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'No response from Gemini.';

    return res.status(200).json({ output });
  } catch (e) {
    console.error('AI handler error:', e);
    res.status(500).json({ error: e.message || 'Internal server error' });
  }
}
