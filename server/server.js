import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Use path.resolve to simulate __dirname for ES modules
const __dirname = path.resolve();

const app = express();

// Serve the static files from the React app
// Adjust the path to point to your built React app
app.use(express.static(path.join(__dirname, '/client/dist')));

// Serve the React app for all other requests
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '/client/dist', 'index.html');

    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        console.error("index.html not found in build directory");
        res.status(404).send("404: File Not Found");
    }
});

// Load SSL certificates (for HTTPS)
const options = {
    key: fs.readFileSync('/app/privkey.pem'),  // Path to your private key
    cert: fs.readFileSync('/app/fullchain.pem') // Path to your full certificate chain
};

// Start the HTTPS server
https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

// Redirect HTTP to HTTPS
const httpApp = express();
httpApp.get('*', (req, res) => {
    const url = `https://${req.hostname}${req.url}`;
    console.log(`Redirecting to: ${url}`);
    res.redirect(url);
});

// Start HTTP server to redirect to HTTPS
http.createServer(httpApp).listen(80, () => {
    console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});
