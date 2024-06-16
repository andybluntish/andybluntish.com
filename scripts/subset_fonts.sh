#!/usr/bin/env zsh

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

CURRENT_DIR=$(dirname "$(realpath "${0:A}")")
ROOT_DIR=$(dirname "${CURRENT_DIR}")

function subset_font() {
  local font_file=$1
  local font_family=$2

  glyphhanger "${ROOT_DIR}/dist/**/*.html" --subset="${ROOT_DIR}/fonts/${font_file}" --family="${font_family}" --formats="woff2" --output="${ROOT_DIR}/src/fonts/"
}

make clean
make build

# subset_font "Mona-Sans.woff2" "Mona Sans"
