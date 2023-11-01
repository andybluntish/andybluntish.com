#!/usr/bin/env zsh

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

function subset_font() {
  local font_file=$1
  local font_family=$2

  glyphhanger dist/**/*.html --subset="fonts/${font_file}" --family="${font_family}" --formats="woff2" --output="src/fonts/"
}

pnpm run clean
pnpm run build

# subset_font "Mona-Sans.woff2" "Mona Sans"
