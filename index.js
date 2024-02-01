const fs = require('fs');
const express = require('express');
const multer = require('multer'); // multer is used for parsing multipart/form-data
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


app.post('/api/transcription', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: 'whisper-1',
    });
    
    fs.unlinkSync(req.file.path);
    res.json({ transcription: transcription.text });

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send('Error processing the file.');
    
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
