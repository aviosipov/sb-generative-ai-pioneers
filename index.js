// src/server.js:
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const OpenAI = require('openai').default;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.mp3');
  }
});
const upload = multer({ storage: storage });

// Utility function to get AI response
async function getAIResponse(input, request) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: request },
      { role: "assistant", content: input },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content; // Assuming we want the content of the message
}

app.post('/api/transcription', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: 'whisper-1',
    });

    // Delete the file after processing
    fs.unlinkSync(req.file.path);

    // Get a summary (or any other response) from the AI based on the transcription
    const summary = await getAIResponse(transcription.text, "Generate a summary for this text:");

    // Send both the transcription and the summary
    res.json({ 
      transcription: transcription.text,
      summary: summary
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing the file.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
