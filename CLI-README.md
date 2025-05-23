# Mirror Wallet CLI

A command-line interface for the Mirror Wallet that allows you to manage your Solana wallet and launch the web/mobile UI.

## Installation

### Quick Install
\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/mirror-wallet/cli/main/install.sh | bash
\`\`\`

### Manual Install
\`\`\`bash
npm install -g mirror-wallet
\`\`\`

## Usage

### Launch UI Interfaces
\`\`\`bash
# Launch web interface
mirror-wallet ui

# Launch mobile-optimized interface  
mirror-wallet mobile

# Start interactive CLI mode
mirror-wallet cli
\`\`\`

### Wallet Management
\`\`\`bash
# Create a new wallet
mirror-wallet create

# Check wallet balance
mirror-wallet balance

# Send SOL to an address
mirror-wallet send 8dHEFZ1WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK 1.5

# Show receive address
mirror-wallet receive

# Backup seed phrase
mirror-wallet backup
\`\`\`

### Cloud Backup
\`\`\`bash
# Backup to Google Drive
mirror-wallet backup-cloud google

# Backup to OneDrive
mirror-wallet backup-cloud onedrive

# Backup to Dropbox
mirror-wallet backup-cloud dropbox

# Backup to iCloud
mirror-wallet backup-cloud icloud

# List backup status
mirror-wallet list-backups
\`\`\`

### Security
\`\`\`bash
# Enable two-factor authentication
mirror-wallet enable2fa

# Show security status
mirror-wallet security

# Show overall status
mirror-wallet status
\`\`\`

### System Commands
\`\`\`bash
# Show help
mirror-wallet help

# Stop UI server
mirror-wallet stop

# Exit CLI
mirror-wallet exit
\`\`\`

## Interactive Mode

Run `mirror-wallet` without arguments to enter interactive mode:

\`\`\`bash
mirror-wallet
\`\`\`

This provides a persistent CLI session where you can run commands without the `mirror-wallet` prefix.

## Examples

### Quick Start
\`\`\`bash
# Install CLI
npm install -g mirror-wallet

# Create wallet and launch UI
mirror-wallet create
mirror-wallet ui
\`\`\`

### Backup Workflow
\`\`\`bash
# Create wallet
mirror-wallet create

# Backup to multiple cloud services
mirror-wallet backup-cloud google
mirror-wallet backup-cloud dropbox

# Check backup status
mirror-wallet status
\`\`\`

### Daily Usage
\`\`\`bash
# Check balance
mirror-wallet balance

# Send transaction
mirror-wallet send 8dHEFZ1WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK 2.5

# Launch mobile UI for detailed management
mirror-wallet mobile
\`\`\`

## Features

- 🖥️ **Cross-Platform**: Works on Windows, macOS, and Linux
- 🌐 **UI Integration**: Seamlessly launch web and mobile interfaces
- ☁️ **Cloud Backup**: Integrated backup to major cloud services
- 🔒 **Security**: 2FA, biometric auth, and encrypted backups
- 📱 **Mobile-First**: Optimized mobile interface
- 🎨 **Interactive**: Rich CLI with colors and emojis
- ⚡ **Fast**: Quick commands for common operations

## Configuration

The CLI stores configuration in:
- **Windows**: `%APPDATA%\mirror-wallet\`
- **macOS**: `~/Library/Application Support/mirror-wallet/`
- **Linux**: `~/.config/mirror-wallet/`

## Troubleshooting

### Command not found
If `mirror-wallet` command is not found after installation:
\`\`\`bash
npm config get prefix
# Add the bin directory to your PATH
\`\`\`

### Permission errors
On macOS/Linux, you might need to use sudo:
\`\`\`bash
sudo npm install -g mirror-wallet
\`\`\`

### Server won't start
Check if port 3000 is available:
\`\`\`bash
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
\`\`\`

## Development

To contribute or modify the CLI:

\`\`\`bash
git clone https://github.com/mirror-wallet/cli
cd cli
npm install
npm link  # Install locally for testing
\`\`\`

## Support

- 📧 Email: support@mirrorwallet.com
- 💬 Discord: https://discord.gg/mirrorwallet
- 🐛 Issues: https://github.com/mirror-wallet/cli/issues
