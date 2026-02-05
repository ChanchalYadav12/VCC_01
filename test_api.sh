#!/bin/bash

# Test script for Microservice
# Run this script from the Client VM

BACKEND_IP="10.0.2.15"
PORT="3000"
BASE_URL="http://$BACKEND_IP:$PORT"

echo "=================================="
echo "Testing Microservice"
echo "=================================="
echo ""
echo "Backend URL: $BASE_URL"
echo ""

# Test 1: Root endpoint
echo "1. Testing Root Endpoint (GET /)..."
curl -s $BASE_URL/
echo ""
echo ""

# Test 2: Health check
echo "2. Testing Health Check (GET /health)..."
curl -s $BASE_URL/health
echo ""
echo ""

# Test 3: API message
echo "3. Testing API Message (GET /api/message)..."
curl -s $BASE_URL/api/message
echo ""
echo ""

echo "=================================="
echo "All tests completed!"
echo "=================================="
