const express = require("express");
const mammoth = require("mammoth");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function extractDocxText(fileName) {
  const docPath = path.join(__dirname, "docs", fileName);

  if (!fs.existsSync(docPath)) {
    const error = new Error(`KB document not found: ${fileName}`);
    error.statusCode = 404;
    throw error;
  }

  const result = await mammoth.extractRawText({ path: docPath });
  return (result.value || "").trim();
}

async function handleKbRequest(req, res, fileName) {
  try {
    const extractedText = await extractDocxText(fileName);

    return res.json({
      extractedText
    });
  } catch (error) {
    console.error("Failed to extract KB document text:", error);

    return res.status(error.statusCode || 500).json({
      extractedText: "",
      error: error.message || "Failed to extract KB document text"
    });
  }
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "KB API is running",
    endpoints: ["/orchestrator_kb", "/unilateral_nda_kb", "/non_compete_nda_kb"]
  });
});

// Existing orchestrator KB endpoint
app.get("/orchestrator_kb", (req, res) => {
  return handleKbRequest(req, res, "orchestrator_kb.docx");
});

// New unilateral NDA KB endpoint
app.get("/unilateral_nda_kb", (req, res) => {
  return handleKbRequest(req, res, "unilateral_nda_kb.docx");
});

// New non compete NDA KB endpoint
app.get("/non_compete_nda_kb", (req, res) => {
  return handleKbRequest(req, res, "non_compete_nda_kb.docx");
});

app.listen(PORT, () => {
  console.log(`KB API running on port ${PORT}`);
});