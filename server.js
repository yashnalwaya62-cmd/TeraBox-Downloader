
const express = require("express");

const app = express();

app.use(express.json());

// Allow your website to connect to this API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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
      status: "error",
      message: "Please enter a video URL"
    });
  }

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") {
      return res.status(400).json({
        status: "error",
        message: "Only HTTPS links are accepted"
      });
    }

    res.json({
      status: "success",
      message: "Link received successfully",
      videoUrl: parsed.href
    });

  } catch {
    res.status(400).json({
      status: "error",
      message: "Invalid URL"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
