import React, { useState } from "react";

function Ai() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.reply) {
        setResponse(data.reply);
      } else {
        setResponse("No response received.");
      }
    } catch (err) {
      console.error(err);
      setResponse("Server error.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ask Gemini</h1>
      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Ai;
