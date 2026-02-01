#!/bin/bash

# ===== For Windows Users =====
# 1. Download ffmpeg from https://ffmpeg.org/download.html
# 2. Unarchive to C:\Program Files\ffmpeg\
# 3. Add to PATH:
#    Windows → Settings → System → Advanced → Environment Variables
#    Path → add: C:\Program Files\ffmpeg\bin

# 4. Check in Git Bash
# ffmpeg -version
# GitBash should see ffmpeg now and run script from git bash terminal

# ============================================
# Video Compression Script
# ============================================
# Compresses video from 4K to 1080p
# Creates poster images for each video
# ============================================

VIDEOS_DIR="public/videos"
TEMP_DIR="public/videos/temp"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# Checks
# ============================================

echo -e "${YELLOW}=== Video Compression Script ===${NC}"
echo ""

# Check if ffmpeg installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}ERROR: ffmpeg not found. Install it:${NC}"
    echo "sudo apt install ffmpeg"
    exit 1
fi

# Check if directory exists
if [ ! -d "$VIDEOS_DIR" ]; then
    echo -e "${RED}ERROR: Directory '$VIDEOS_DIR' not found${NC}"
    echo "Запусти скрипт из корня проекта"
    exit 1
fi

# Create temp directory
mkdir -p "$TEMP_DIR"

# ============================================
# Function to compress video
# ============================================

compress_video() {
    local input="$1"
    local filename=$(basename "$input")
    local temp_output="${TEMP_DIR}/${filename}"
    local poster="${VIDEOS_DIR}/poster_${filename%.mp4}.jpg"

    echo -e "${YELLOW}Processing: ${filename}${NC}"

    # Size before compression
    local size_before=$(du -h "$input" | cut -f1)
    echo "  Size before: ${size_before}"

    # Compress video to temp file
    ffmpeg -i "$input" \
        -vcodec libx264 \
        -crf 28 \
        -preset medium \
        -vf "scale=1920:1080" \
        -r 30 \
        -movflags +faststart \
        "$temp_output" \
        -y 2>&1 | tail -n 1

    # Creating poster
    ffmpeg -i "$input" \
        -ss 00:00:01 \
        -vframes 1 \
        "$poster" \
        -y 2>/dev/null

    # Replace original video
    mv "$temp_output" "$input"

    # Size after compression
    local size_after=$(du -h "$input" | cut -f1)
    echo -e "  Size after:  ${size_after}"
    echo -e "  ${GREEN}✓ Done${NC}"
    echo ""
}

# ============================================
# Compressing videos
# ============================================

echo -e "Videos directory: ${VIDEOS_DIR}"
echo ""

for file in "${VIDEOS_DIR}"/*.mp4; do
    if [ -f "$file" ]; then
        compress_video "$file"
    fi
done

# ============================================
# Result
# ============================================

echo -e "${YELLOW}=== Results ===${NC}"
echo ""
echo "Compressed files:"
ls -lah "${VIDEOS_DIR}"/*.mp4 | awk '{print "  " $5 "\t" $NF}'
echo ""
echo "Poster images:"
ls -lah "${VIDEOS_DIR}"/*.jpg | awk '{print "  " $5 "\t" $NF}'
echo ""

# Delete temp directory
rm -rf "$TEMP_DIR"

echo -e "${GREEN}=== Compression complete! ===${NC}"