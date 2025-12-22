#!/bin/bash

# Script to update all controllers with proper RBAC decorators
# This script replaces @Roles with @AllowedTo and adds proper imports

echo "Starting RBAC update for all controllers..."

# Find all controller files
find src/modules -name "*.controller.ts" -type f | while read file; do
    echo "Processing: $file"
    
    # Check if file uses @Roles
    if grep -q "@Roles" "$file"; then
        # Backup original file
        cp "$file" "$file.bak"
        
        # Replace import statement
        sed -i '' "s/import { Roles }/import { AllowedTo }/g" "$file"
        
        # Add UserRole import if not present
        if ! grep -q "import { UserRole }" "$file"; then
            # Add after RolesGuard import
            sed -i '' "/import.*RolesGuard/a\\
import { UserRole } from 'src/database/schemas/user.schema';
" "$file"
        fi
        
        # Replace @Roles patterns with @AllowedTo
        sed -i '' "s/@Roles('admin', 'content_manager')/@AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)/g" "$file"
        sed -i '' "s/@Roles('admin')/@AllowedTo(UserRole.ADMIN)/g" "$file"
        sed -i '' "s/@Roles('content_manager')/@AllowedTo(UserRole.CONTENT_MANAGER)/g" "$file"
        sed -i '' "s/@Roles('editor')/@AllowedTo(UserRole.EDITOR)/g" "$file"
        
        echo "✓ Updated: $file"
    fi
done

echo "RBAC update completed!"
