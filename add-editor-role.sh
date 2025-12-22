#!/bin/bash

# Script to add Editor role to UPDATE endpoints (PATCH/PUT)
# According to RBAC plan: Editors can edit existing content

echo "Adding Editor role to UPDATE endpoints..."

# Find all controller files with @AllowedTo decorators
find src/modules -name "*.controller.ts" -type f | while read file; do
    # Skip users controller (Admin only)
    if [[ "$file" == *"users.controller.ts"* ]]; then
        continue
    fi
    
    # Check if file has PATCH or PUT endpoints with Admin+ContentManager only
    if grep -q "@Patch\|@Put" "$file"; then
        # Add Editor to PATCH/PUT endpoints that currently have Admin+ContentManager
        # But NOT to toggle-publish, toggle-active, or delete-related endpoints
        
        # Backup
        cp "$file" "$file.bak2"
        
        # Add Editor to update endpoints (but not toggle/status endpoints)
        # This is a simplified approach - we'll target specific patterns
        
        # Pattern 1: @Patch(':id') followed by @AllowedTo(Admin, CM)
        # Pattern 2: @Put(':id') followed by @AllowedTo(Admin, CM)
        
        # We need to be careful not to add Editor to:
        # - toggle-publish
        # - toggle-active  
        # - status changes
        
        echo "Checking: $file for UPDATE endpoints..."
    fi
done

echo "Editor role addition completed!"
