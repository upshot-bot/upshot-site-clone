#!/bin/bash
# Weekly backup script for upshot-site-clone
# Keeps only the last 2 backups

set -e

PROJECT_DIR="/home/ubuntu/workspace/upshot-site-clone"
BACKUP_DIR="$PROJECT_DIR/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$TIMESTAMP"

echo "Starting backup..."

# Create backup directory
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Copy everything needed for restore:
# - src/ (all source code)
# - public/ (assets, images, etc.)
# - package.json & package-lock.json (dependencies)
# - tsconfig.json, next.config.*, tailwind.config.* (config files)
# - .env* (environment files if they exist)
# - .git/ (for version control restoration)

rsync -a --progress \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='backups' \
    --exclude='.git' \
    "$PROJECT_DIR/src" "$BACKUP_DIR/$BACKUP_NAME/"
    
rsync -a --progress \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='backups' \
    --exclude='.git' \
    "$PROJECT_DIR/public" "$BACKUP_DIR/$BACKUP_NAME/"

# Copy config files
cp -r "$PROJECT_DIR/src" "$BACKUP_DIR/$BACKUP_NAME/src_backup"
cp "$PROJECT_DIR/package.json" "$BACKUP_DIR/$BACKUP_NAME/"
cp "$PROJECT_DIR/package-lock.json" "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null || true
cp "$PROJECT_DIR/tsconfig.json" "$BACKUP_DIR/$BACKUP_NAME/"
cp "$PROJECT_DIR/next.config.*" "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null || true

# Copy any .env files (for production restore)
cp "$PROJECT_DIR/.env"* "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null || true

# Copy git directory for full restore capability
cp -r "$PROJECT_DIR/.git" "$BACKUP_DIR/$BACKUP_NAME/.git" 2>/dev/null || true

# Create a restore script inside the backup
cat > "$BACKUP_DIR/$BACKUP_NAME/restore.sh" << 'EOF'
#!/bin/bash
# Restore script - run from project root
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$(dirname "$SCRIPT_DIR")"

echo "Restoring backup..."
# Remove existing src and public (will be replaced)
rm -rf src public

# Restore from backup
cp -r "$SCRIPT_DIR/src_backup/src" ./
cp -r "$SCRIPT_DIR/src_backup/public" ./

# Restore config files
cp "$SCRIPT_DIR/package.json" ./
cp "$SCRIPT_DIR/package-lock.json" ./ 2>/dev/null || true
cp "$SCRIPT_DIR/tsconfig.json" ./

# Install dependencies
npm install

echo "Restore complete! Run 'npm run dev' to start."
chmod +x "$SCRIPT_DIR/restore.sh"

# Create metadata file
cat > "$BACKUP_DIR/$BACKUP_NAME/backup_info.json" << EOF
{
  "timestamp": "$TIMESTAMP",
  "date": "$(date -Iseconds)",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'N/A')",
  "git_branch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'N/A')"
}
EOF

echo "Backup created: $BACKUP_NAME"

# Cleanup old backups (keep only last 2)
echo "Cleaning up old backups..."
cd "$BACKUP_DIR"
BACKUPS=($(ls -td backup_* 2>/dev/null || echo ""))
if [ ${#BACKUPS[@]} -gt 2 ]; then
    echo "Removing ${BACKUPS[0]}..."
    rm -rf "${BACKUPS[0]}"
fi

echo "Backup complete! Latest backup: $BACKUP_NAME"
echo "Backup size: $(du -sh "$BACKUP_NAME" | cut -f1)"

# List remaining backups
echo "Current backups:"
ls -la "$BACKUP_DIR"
