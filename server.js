const express = require('express');
const os = require('os');

const app = express();
const PORT = 3000;

// Middleware to log all incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Root endpoint - Welcome message
app.get('/', (req, res) => {
  res.json({
    service: "Node.js Microservice on Virtual Machines",
    status: "Running",
    message: "Welcome to the VM-hosted microservice!",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET /health - Health check",
      "GET /system - System information"
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: "UP",
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// System information endpoint
app.get('/system', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    cpu_cores: os.cpus().length,
    total_memory_MB: Math.round(os.totalmem() / 1024 / 1024),
    free_memory_MB: Math.round(os.freemem() / 1024 / 1024),
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log("=".repeat(50));
  console.log("  Microservice Started");
  console.log("=".repeat(50));
  console.log(`  Port: ${PORT}`);
  console.log(`  Started at: ${new Date().toISOString()}`);
  console.log("\n  Available Endpoints:");
  console.log("    GET /           - Welcome & API documentation");
  console.log("    GET /health     - Service health check");
  console.log("    GET /system     - VM system information");
  console.log("=".repeat(50));
});
