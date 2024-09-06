import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Use path.resolve to simulate __dirname for ES modules
const __dirname = path.resolve();

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist'), ));

// Serve the React app for all requests
app.get('*', (req, res) => {
    console.log("WOrking messages")
    res.send("Working")
    // res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Load SSL certificates (for HTTPS)
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Start the HTTPS server
https.createServer(options, app).listen(8443, () => {
    console.log('HTTPS Server running on port 8443');
});

// Redirect HTTP to HTTPS
const httpApp = express();
httpApp.get('*', (req, res) => {
    res.redirect(`https://${req.hostname}${req.url}`);
});

// Start HTTP server to redirect to HTTPS
http.createServer(httpApp).listen(80, () => {
    console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});
