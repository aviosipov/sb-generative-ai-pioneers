# WhisperTranscriber: Transforms MP3 Audio into Text
### Singularity Bridge - Generative AI Pioneers Program

## Description

WhisperTranscriber is a tool designed to convert MP3 audio files into text by leveraging the OpenAI Whisper model. It's built on Node.js and Express, providing a straightforward API endpoint for uploading audio files and receiving transcriptions. This project simplifies the process of audio transcription, making it accessible for developers and non-developers alike.

## Getting Started

### Dependencies

- Node.js
- npm or yarn
- dotenv for environment variables
- Express for the server framework
- multer for handling multipart/form-data for uploads
- OpenAI SDK for Node.js

### Installing

1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Create a `.env` file in the root directory and add your
4. OpenAI API key: OPENAI_API_KEY=your_api_key_here, you can use .env.sample as a reference.


### Running the Application

- To start the application in production mode, use: npm start
- To start the application in development mode with nodemon (which auto-restarts the server on code changes), use: npm run dev


## Usage

To use the API, send a POST request to `/api/transcription` with a multipart/form-data body containing the audio file you wish to transcribe. The file should be included with the key `file`.

Example using `curl`:
```bash
curl -F "file=@path_to_your_audio_file.mp3" http://localhost:3000/api/transcription

The server will respond with a JSON object containing the transcription text.

## Contributing
Contributions to this project are welcome. Please follow the standard fork-and-pull request workflow. If you have any suggestions or encounter any issues, feel free to open an issue or submit a pull request.



