#!/bin/bash

# Setup script for TLSNotary notary nodes
echo "🔧 Setting up TLSNotary notary nodes..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create notary directories
echo "📁 Creating notary directories..."
mkdir -p notary-data/node-1
mkdir -p notary-data/node-2
mkdir -p notary-data/node-3

# Generate notary keypairs (in production, these would be generated securely)
echo "🔑 Generating notary keypairs..."
for i in {1..3}; do
    echo "Generating keypair for notary $i..."
    # In production, use proper key generation
    echo "mock_keypair_$i" > notary-data/node-$i/keypair.json
done

# Build and start notary nodes
echo "🐳 Building and starting notary nodes..."
docker-compose -f docker/docker-compose.yml up -d --build

# Wait for nodes to be ready
echo "⏳ Waiting for nodes to be ready..."
sleep 10

# Check node health
echo "🏥 Checking node health..."
for port in 7047 7048 7049; do
    if curl -s http://localhost:$port/health > /dev/null; then
        echo "✅ Notary node on port $port is healthy"
    else
        echo "❌ Notary node on port $port is not responding"
    fi
done

echo "🎉 TLSNotary notary network setup complete!"
echo "📊 Notary endpoints:"
echo "  - Node 1: http://localhost:7047"
echo "  - Node 2: http://localhost:7048"
echo "  - Node 3: http://localhost:7049"
echo ""
echo "🛑 To stop the network: npm run notary:stop"
