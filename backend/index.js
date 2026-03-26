// for local build testing, not used in production deployment

const express = require("express");
const path = require("path");

// Use next from frontend
const next = require(path.join(__dirname, "../frontend/node_modules/next"));

const app = express();
const PORT = 5000;

// Point to frontend project root
const nextApp = next({
  dev: false,
  dir: path.join(__dirname, "../frontend"),
});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Works in Express 5
  app.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
