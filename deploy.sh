#!/bin/bash

echo "🚀 Deploying Poshagam Client..."

git pull origin main

echo "📦 Building Docker image..."
docker-compose -f docker-compose.yml build

echo "🛑 Stopping old containers..."
docker-compose -f docker-compose.yml down

echo "🚀 Starting new containers..."
docker-compose -f docker-compose.yml up -d

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete!"
docker-compose -f docker-compose.yml ps
