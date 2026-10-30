
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Video API is running"
  });
});

app.post("/api/video", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Video URL is required"
    });
  }

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") {
      return res.status(400).json({
        error: "Only HTTPS URLs are allowed"
      });
    }

    res.json({
      status: "success",
      message: "URL received",
      videoUrl: parsed.href
    });
  } catch {
    res.status(400).json({
      error: "Invalid URL"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
