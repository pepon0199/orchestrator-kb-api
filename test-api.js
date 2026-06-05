async function testOrchestratorKb() {
  try {
    const response = await fetch("https://orchestrator-kb-api.onrender.com/orchestrator_kb");

    if (!response.ok) {
      throw new Error(`API failed with status ${response.status}`);
    }

    const data = await response.json();

    const extractedText = data?.extractedText || "";

    console.log("Extracted Text:");
    console.log(extractedText);
  } catch (error) {
    console.error("Failed to call orchestrator_kb:", error.message);
  }
}

testOrchestratorKb();