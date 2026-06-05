const express = require("express");
const mammoth = require("mammoth");
const path = require("path");
const fs = require("fs");

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
app.get("/orchestrator_kb", async (req, res) => {
  try {
    const docPath = path.join(__dirname, "docs", "orchestrator_kb.docx");

    if (!fs.existsSync(docPath)) {
      return res.status(404).json({
        extractedText: "",
        error: "KB document not found"
      });
    }

    const result = await mammoth.extractRawText({ path: docPath });

    const extractedText = result.value || "";

    return res.json({
      extractedText: extractedText.trim()
    });
  } catch (error) {
    console.error("Failed to extract KB document text:", error);

    return res.status(500).json({
      extractedText: "",
      error: "Failed to extract KB document text"
    });
  }
});

app.listen(PORT, () => {
  console.log(`orchestrator_kb API running on port ${PORT}`);
});