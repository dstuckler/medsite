#!/usr/bin/env bash
#
# Download the original image assets from the old Wix site.
#
# Run this from a machine with normal internet access (the rebuild environment
# has static.wixstatic.com blocked by its egress policy):
#
#     bash tools/fetch-assets.sh
#
# Then uncomment the matching <img> tags in the HTML — each placeholder frame
# already carries the commented-out tag pointing at the right path.

set -euo pipefail

cd "$(dirname "$0")/.."

CDN="https://static.wixstatic.com/media"
MANIFEST="tools/wix-assets.tsv"

mkdir -p assets/img

fail=0

while IFS=$'\t' read -r media target _rest; do
  case "$media" in
    ''|'#'*) continue ;;
  esac

  mkdir -p "$(dirname "$target")"

  if curl -fsSL --retry 3 --retry-delay 2 "$CDN/$media" -o "$target"; then
    printf 'ok    %s\n' "$target"
  else
    printf 'FAIL  %s (%s)\n' "$target" "$media" >&2
    fail=1
  fi
done < "$MANIFEST"

if [ "$fail" -ne 0 ]; then
  echo
  echo "Some assets failed. If the Wix site is already switched off, pull them" >&2
  echo "from the original source files instead." >&2
  exit 1
fi

echo
echo "Done. All assets written to assets/img/."
