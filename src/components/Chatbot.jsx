import React, { useEffect } from "react";

function Chatbot({ context }) {
  useEffect(() => {
    // Initialize pplx object explicitly
    if (!window.pplx) {
      window.pplx = {};
    }
    window.pplx.context = context;

    const script = document.createElement("script");
    script.src = "https://perplexity.ai/embed.js";
    script.async = true;
    script.onload = () => {
      console.log("Perplexity script loaded");
    };
    script.onerror = () => {
      console.error("Failed to load Perplexity script");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [context]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "999",
      }}
    >
      {/* Ensure Perplexity chatbot loads */}
      <pplx-chatbot context={context}></pplx-chatbot>
    </div>
  );
}

export default Chatbot;
