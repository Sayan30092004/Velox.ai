# Velox.ai
![velox](https://github.com/user-attachments/assets/8213e182-7ed4-477b-b626-8c4ae0ef4951)

## Overview
Our project is an AI-powered platform designed to simplify and enhance the learning process by generating comprehensive, structured notes from diverse sources like YouTube videos and textbooks. Using advanced machine learning models, our solution efficiently processes large volumes of information to deliver clear, organized summaries, helping learners grasp complex concepts quickly and effectively.

## Key Features
- **Summarized Textbook Content**: Automatically extracts and condenses key information from textbooks and PDFs into well-organized notes.
- **YouTube Video Summaries**: Processes YouTube video URLs to generate detailed summaries with timestamps, capturing essential points and insights.
- **Q&A Generation**: Creates relevant questions and answers to reinforce understanding and test knowledge retention.
- **Enhanced Search Experience**: Unlike traditional YouTube search that requires a link, our platform enables direct search and summarizes the results to help users learn more effectively.

## Installation and Setup
### 1. Start in Google Colab
- Enable GPU for better performance.
- Install necessary dependencies.
- Upload any required files.
- Run your Flask backend code.
- Use **ngrok** to expose your Colab Flask server and get a public URL.

### 2. Integrate with the Frontend
- Copy the **ngrok public URL** and update the React app accordingly.
- The React frontend provides an intuitive interface (e.g., a search bar or file uploader) for users.
- When a user submits a request, the frontend sends the appropriate payload (**JSON** or **FormData**) to the `/summarize` endpoint.

### 3. Backend Processing
- The backend receives the request, downloads/transcribes/extracts text as needed, and runs the summarization pipeline.
- The system returns a JSON response containing:
  - Structured summary.
  - Any additional metadata (e.g., processing time, PDF filename, etc.).

### 4. Display on Frontend
- The React app parses the JSON response and extracts the `final_summary` key.
- The structured summary is displayed in an easy-to-read format.
- Any errors (e.g., missing summary) are logged in the browser console for debugging.

## How It Works
1. **User Input**: The user provides input in different formats:
   - YouTube URL
   - Raw text
   - PDF/DOCX file upload
2. **Backend Processing**:
   - Extracts key information from input sources.
   - Runs AI-powered summarization models.
   - Generates structured summaries and optional Q&A pairs.
3. **Frontend Display**:
   - Presents the summary in an intuitive, easy-to-read format.
   - Enables direct search for YouTube videos without needing a URL.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Machine Learning**: AI-based text summarization models
- **Cloud & Deployment**: Google Colab, ngrok

## Future Enhancements
- Implement a **personalized learning assistant** to suggest summaries based on user preferences.
- Introduce **multi-language summarization** to expand accessibility.
- Optimize processing speed for large documents and videos.

## Contributing
Feel free to contribute by reporting issues, suggesting features, or submitting pull requests!

## License
This project is licensed under the MIT License. See `LICENSE` for details.
