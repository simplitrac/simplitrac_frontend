import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Use path.resolve to simulate __dirname for ES modules
const __dirname = path.resolve();

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React app for all requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Load SSL certificates (for HTTPS)
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Start the HTTPS server
https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
