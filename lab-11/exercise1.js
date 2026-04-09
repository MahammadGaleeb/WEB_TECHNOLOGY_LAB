// Import the built-in http module using require()
const http = require('http');

// Define server options and port
const PORT = 3000;
const HOST = 'localhost';

// Create a server using the createServer() method
// The callback function handles incoming client requests
const server = http.createServer((request, response) => {
    console.log(`[${new Date().toISOString()}] Received ${request.method} request for ${request.url}`);
    
    // Set response headers using setHeader()
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('X-Powered-By', 'Node.js');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    // Handle different routes/paths
    switch (request.url) {
        case '/':
        case '/home':
            // Send HTML response for home page
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('<!DOCTYPE html>');
            response.write('<html>');
            response.write('<head><title>Home - Node.js Server</title></head>');
            response.write('<body style="font-family: Arial, sans-serif; margin: 40px;">');
            response.write('<h1 style="color: #333;">🏠 Welcome to Node.js HTTP Server!</h1>');
            response.write('<p>This server is running on <strong>Node.js</strong> using only built-in modules.</p>');
            response.write('<ul>');
            response.write('<li><a href="/">Home</a></li>');
            response.write('<li><a href="/about">About</a></li>');
            response.write('<li><a href="/api">API</a></li>');
            response.write('</ul>');
            response.write(`<p>Server time: ${new Date().toLocaleString()}</p>`);
            response.write('</body>');
            response.write('</html>');
            response.end();
            break;
            
        case '/about':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('<!DOCTYPE html>');
            response.write('<html>');
            response.write('<head><title>About - Node.js Server</title></head>');
            response.write('<body style="font-family: Arial, sans-serif; margin: 40px;">');
            response.write('<h1 style="color: #0066cc;">ℹ️ About This Server</h1>');
            response.write('<h2>Technical Details:</h2>');
            response.write('<ul>');
            response.write('<li><strong>Runtime:</strong> Node.js</li>');
            response.write('<li><strong>Module:</strong> http (built-in)</li>');
            response.write('<li><strong>Port:</strong> ' + PORT + '</li>');
            response.write('<li><strong>Host:</strong> ' + HOST + '</li>');
            response.write('<li><strong>No external frameworks used</strong></li>');
            response.write('</ul>');
            response.write('<a href="/">← Back to Home</a>');
            response.write('</body>');
            response.write('</html>');
            response.end();
            break;
            
        case '/api':
            // JSON API endpoint
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(200);
            const apiData = {
                timestamp: new Date().toISOString(),
                server: 'Node.js HTTP Server',
                port: PORT,
                uptime: process.uptime(),
                request: {
                    method: request.method,
                    url: request.url,
                    headers: request.headers
                }
            };
            response.write(JSON.stringify(apiData, null, 2));
            response.end();
            break;
            
        case '/status':
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('Server Status: OK\n');
            response.write(`Uptime: ${Math.floor(process.uptime())} seconds\n`);
            response.write(`Memory: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB\n`);
            response.end();
            break;
            
        default:
            // 404 Not Found
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write('<!DOCTYPE html>');
            response.write('<html>');
            response.write('<head><title>404 - Not Found</title></head>');
            response.write('<body style="font-family: Arial, sans-serif; margin: 40px; text-align: center;">');
            response.write('<h1 style="color: #cc0000;">404 - Page Not Found</h1>');
            response.write('<p>The requested URL was not found on this server.</p>');
            response.write('<p><a href="/">← Return to Home</a></p>');
            response.write('</body>');
            response.write('</html>');
            response.end();
            break;
    }
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
    } else {
        console.error('Server error:', error.message);
    }
});

// Handle client connection events
server.on('connection', (socket) => {
    console.log('New client connected');
});

server.on('close', () => {
    console.log('Server closed');
});

// Run the server on specific port using listen() method
server.listen(PORT, HOST, () => {
    console.log('='.repeat(60));
    console.log(`🚀 Node.js HTTP Server Started Successfully!`);
    console.log(`📍 Listening on http://${HOST}:${PORT}`);
    console.log(`🌐 Open your browser and visit:`);
    console.log(`   → http://${HOST}:${PORT}/`);
    console.log(`   → http://${HOST}:${PORT}/about`);
    console.log(`   → http://${HOST}:${PORT}/api`);
    console.log(`   → http://${HOST}:${PORT}/status`);
    console.log('='.repeat(60));
});

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed successfully.');
        process.exit(0);
    });
});