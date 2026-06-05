const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "orchestrator_kb API is running"
  });
});

// Main KB endpoint
app.get("/orchestrator_kb", (req, res) => {
  res.json({
    extractedText:
      "This is a test KB response for the orchestrator only. Use this extractedText only for orchestrator triage. Do not pass this KB content to invoked agents."
  });
});

app.listen(PORT, () => {
  console.log(`orchestrator_kb API running on port ${PORT}`);
});