const Groq =require('groq-sdk')
require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
  console.log("I was here");
  const { prompt } = req.body;

  async function main() {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
        model: "llama3-8b-8192",
      });

      const simplifiedText = completion.choices[0].message.content;
      console.log(simplifiedText);
      return [simplifiedText];
  }

  try {
      const simplifiedText = await main();
      res.json(simplifiedText);  // Send the response to background.js
  } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
