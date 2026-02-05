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
    service: "Student Management Microservice",
    status: "Running",
    message: "Welcome to the VM-hosted microservice!",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET /health - Health check",
      "GET /system - System information",
      "GET /students - List all students",
      "GET /students/:id - Get student by ID"
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

// Sample data - Student records
const students = [
  { id: 1, name: "Alice Johnson", course: "Computer Science", year: 2 },
  { id: 2, name: "Bob Smith", course: "Information Technology", year: 3 },
  { id: 3, name: "Charlie Brown", course: "Data Science", year: 1 },
  { id: 4, name: "Diana Prince", course: "Computer Science", year: 4 }
];

// Get all students
app.get('/students', (req, res) => {
  res.json({
    total: students.length,
    students: students,
    timestamp: new Date().toISOString()
  });
});

// Get student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  
  if (student) {
    res.json({
      student: student,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({
      error: "Student not found",
      timestamp: new Date().toISOString()
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log("=".repeat(50));
  console.log("  Student Management Microservice Started");
  console.log("=".repeat(50));
  console.log(`  Port: ${PORT}`);
  console.log(`  Started at: ${new Date().toISOString()}`);
  console.log("\n  Available Endpoints:");
  console.log("    GET /           - Welcome & API documentation");
  console.log("    GET /health     - Service health check");
  console.log("    GET /system     - VM system information");
  console.log("    GET /students   - List all students");
  console.log("    GET /students/:id - Get specific student");
  console.log("=".repeat(50));
});
