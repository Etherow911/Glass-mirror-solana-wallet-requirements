#!/bin/bash

# Mirror Wallet CLI Installation Script

echo "🚀 Installing Mirror Wallet CLI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "📥 Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install the CLI globally
echo "📦 Installing Mirror Wallet CLI globally..."
npm install -g mirror-wallet

# Check if installation was successful
if command -v mirror-wallet &> /dev/null; then
    echo "✅ Mirror Wallet CLI installed successfully!"
    echo ""
    echo "🎉 You can now use the following commands:"
    echo "   mirror-wallet ui      # Launch web interface"
    echo "   mirror-wallet mobile  # Launch mobile interface"
    echo "   mirror-wallet create  # Create new wallet"
    echo "   mirror-wallet help    # Show all commands"
    echo ""
    echo "🚀 Get started by running: mirror-wallet"
else
    echo "❌ Installation failed. Please try again or install manually."
    exit 1
fi
