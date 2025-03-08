import React, { useState } from "react";
import axios from "axios";

function SummarizerApp() {
  const [inputType, setInputType] = useState("youtube");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //youtube
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [manualUrl, setManualUrl] = useState("");

  //for choices 
  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    setTextInput("");
    setFileInput(null);
    setSummary("");
  };
  const apiKey = "AIzaSyCK0lNefj4v_wUNFdaVev3UgxrfUt-JDfw"; // Replace with your actual API key
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSummary("");

    const endpoint = "https://3275-34-126-156-120.ngrok-free.app/summarize"; // Replace with your actual ngrok URL

    try {
      let response;
      if (inputType === "youtube" || inputType === "text") {
        // Send as JSON
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input_type: inputType,
            input_source: textInput,
          }),
        });
      } else if (inputType === "pdf" || inputType === "docx") {
        // Send as multipart/form-data
        const formData = new FormData();
        formData.append("file", fileInput);
        formData.append("input_type", inputType);
        response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
      }
      const data = await response.json();
      console.log("Received data:", data);
      if (data.final_summary && data.final_summary.trim() !== "") {
        setSummary(data.final_summary);
      } else {
        setErrorMsg("No summary received.");
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
      setErrorMsg("Error fetching summary. Please try again.");
    }
    setLoading(false);
  };

  //for youtube
  const searchYouTube = async () => {
    setVideos([]);
    setSelectedVideo(null);
    setErrorMsg("");

    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: searchQuery,
          type: "video",
          maxResults: 10,
          key: apiKey,
        },
      });

      const videoIds = response.data.items.map(video => video.id.videoId).join(",");

      const detailsResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "contentDetails",
          id: videoIds,
          key: apiKey,
        },
      });

      const filteredVideos = response.data.items.filter(video => {
        const videoDetails = detailsResponse.data.items.find(v => v.id === video.id.videoId);
        if (!videoDetails) return false;
        
        const duration = videoDetails.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return false;
        const hours = match[1] ? parseInt(match[1]) : 0;
        const minutes = match[2] ? parseInt(match[2]) : 0;
        const seconds = match[3] ? parseInt(match[3]) : 0;
        
        console.log("Duration:", hours, "hours", minutes, "minutes", seconds, "seconds");
        return minutes > 2 ; // Avoid Shorts (under 60s)
      }).slice(0, 3);

      setVideos(filteredVideos);
    } catch (error) {
      console.error("YouTube API Error:", error);
      setErrorMsg("Error fetching YouTube videos.");
    }
  };

  const handleubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSummary("");

    try {
      let videoUrl = selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo}` : manualUrl;

      let response = await fetch(backendEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: "youtube",
          input_source: videoUrl,
        }),
      });

      const data = await response.json();
      if (data.final_summary && data.final_summary.trim() !== "") {
        setSummary(data.final_summary);
      } else {
        setErrorMsg("No summary received.");
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
      setErrorMsg("Error fetching summary. Please try again.");
    }
    setLoading(false);
  };


  return (
    <div className="container">
      <video autoPlay muted loop id="bg-video">
        <source src="./src/assets/bg.mp4" type="video/mp4" />
      </video>
    <div className="hero" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <img src="src/assets/logo.png" className="title" />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select Input Type:{" "}
            <select className="dropdown" value={inputType} onChange={handleInputTypeChange}>
              <option value="youtube">YouTube</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="text">Text</option>
            </select>
          </label>
        </div>
        <br />
        {inputType === "youtube"  ? (
          <div>
            <input
              type="text"
              placeholder="Search YouTube videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchYouTube()} // Triggers search on Enter key
              style={{ width: "400px", padding: "10px", fontSize: "16px" }}
            />
            <button type="button" onClick={searchYouTube} style={{ marginLeft: "10px" }}>
              Search
            </button>

            <br /><br />
            {videos.map((video) => (
              <div key={video.id.videoId} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="radio"
                  name="video"
                  value={video.id.videoId}
                  onChange={() => setSelectedVideo(video.id.videoId)}
                  style={{ marginRight: "10px" }}
                />
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  style={{ width: "120px", height: "90px", marginRight: "10px", borderRadius: "5px" }}
                />
                <label>{video.snippet.title}</label>
              </div>
            ))}
            <br />
            <input
              type="text"
              placeholder="Or paste YouTube video URL..."
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              style={{ width: "400px", padding: "10px", fontSize: "16px" }}
            />
          </div>
        ) : inputType === "text" ?(
          <div>
          <label>
           
            <input
            className="input-field"
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={
                
                   "Enter raw text"
              }
              style={{ width: "400px", padding: "10px", fontSize: "16px" }}
              required
            />
          </label>
        </div>
        ):(
          <div>
            <label>
              Upload {inputType.toUpperCase()} File:{" "}
              <input
                type="file"
                onChange={(e) => setFileInput(e.target.files[0])}
                accept={inputType === "pdf" ? ".pdf" : ".docx"}
                required
              />
            </label>
          </div>
        )}
        <br />
        <button
        className="btn"
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Summarize
        </button>
      </form>
      {loading && <p>Loading summary...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {summary && (
        <div className="summary-box" style={{ marginTop: "20px", textAlign: "left", maxWidth: "800px" }}>
          <h2>Final Summary:</h2>
          <pre>
            {summary}
          </pre>
        </div>
      )}
    </div>
    </div>
  );
}

export default SummarizerApp;