const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const routePath = '/save-battery-on-iphone-24-september-2024';
const externalURL = 'https://techradan.com/save-battery-on-iphone-24-september-2024';
const encodedIframeURL = encodeURIComponent('https://spoofer-vr57.onrender.com/save-battery-on-iphone-24-september-2024');
const googleRedirectToIframe = `https://www.google.com/url?sa=t&url=${encodedIframeURL}`;


// Landing page with button to enable iframe mode
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Landing Page</title></head>
    <body>
      <h1>Welcome</h1>
      <p>Click the button below to view internal content:</p>
      <a href="/set-iframe-cookie"><button>Show Internal Content</button></a>
    </body>
    </html>
  `);
});

// Main route
app.get(routePath, (req, res) => {
  const visited = req.cookies.visitedIframe === 'true';

  if (visited) {
    // Internal: Show iframe
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Unhide Apps on iPhone</title>
        <style>
          html, body { margin: 0; height: 100%; }
          iframe { border: none; width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <iframe src="https://www.youtube.com/embed/eWlMJQHQv3Q" style="border:none; width:100%; height:100%;" allowfullscreen></iframe>
      </body>
      </html>
    `);
  } else {
    // External: Redirect to the real external page
    res.redirect(externalURL);
  }
});

// Route to set the cookie (from button click)
app.get('/set-iframe-cookie', (req, res) => {
  res.cookie('visitedIframe', 'true', { maxAge: 1000 * 60 * 30 }); // 30 minutes
  res.redirect(routePath);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
