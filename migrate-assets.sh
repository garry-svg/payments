#!/bin/bash

# Configuration Paths
CONTENT_DIR="content/blog/output/posts"
PUBLIC_IMAGES_DIR="public/images"

echo "Starting asset migration..."

# Step 1: Create the base public/images directory if it doesn't exist
mkdir -p "$PUBLIC_IMAGES_DIR"

# Step 2: Find and move all image files, and clean up empty directories
echo "Moving images to $PUBLIC_IMAGES_DIR..."
find "$CONTENT_DIR" -type d -name "images" | while read -r img_dir; do
    # Get the parent post directory name (e.g., 2022-11-12-life-cycle...)
    post_dir=$(basename "$(dirname "$img_dir")")
    
    # Create a specific directory for this post's images in the public folder
    target_dir="$PUBLIC_IMAGES_DIR/$post_dir"
    mkdir -p "$target_dir"
    
    # Move all images (png, jpg, jpeg, gif, svg)
    find "$img_dir" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" \) -exec mv {} "$target_dir/" \;
    
    # Check if the original images directory is now empty and remove it
    if [ -z "$(ls -A "$img_dir")" ]; then
        rm -rf "$img_dir"
        echo "Moved images for $post_dir and removed empty directory."
    else
        echo "Warning: $img_dir is not empty after moving images."
    fi
done

# Step 3: Update Markdown Paths
echo "Updating Markdown image references..."
find "$CONTENT_DIR" -type f -name "*.md" | while read -r md_file; do
    post_dir=$(basename "$(dirname "$md_file")")
    
    # Replace Markdown image syntax: ![alt](images/filename.ext) -> ![alt](/images/post-dir/filename.ext)
    # Using sed with cross-platform compatibility (works on Linux and macOS)
    sed -i.bak -E "s|\]\(images/|\](/images/$post_dir/|g" "$md_file"
    
    # Replace HTML image syntax: <img src="images/filename.ext"> -> <img src="/images/post-dir/filename.ext">
    sed -i.bak -E "s|src=\"images/|src=\"/images/$post_dir/|g" "$md_file"
    
    # Clean up backup files created by sed
    rm -f "${md_file}.bak"
done

echo "Asset migration complete!"
