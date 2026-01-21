// Import required built-in modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Helper function to serve HTML files
function servePage(res, filePath, statusCode = 200) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;

  // Serve CSS file
  if (url === "/style.css") {
    fs.readFile(path.join(__dirname, "public", "style.css"), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading CSS");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }

  // Home route
  else if (url === "/" || url === "/home") {
    servePage(res, path.join(__dirname, "pages", "home.html"), 200);
  }

  // About route
  else if (url === "/about") {
    servePage(res, path.join(__dirname, "pages", "about.html"), 200);
  }

  // Contact route
  else if (url === "/contact") {
    servePage(res, path.join(__dirname, "pages", "contact.html"), 200);
  }

  // 404 route
  else {
    servePage(res, path.join(__dirname, "pages", "404.html"), 404);
  }
});

// Server listens on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
