#!/usr/bin/env bash

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

source "scripts/config.sh"

clean_output

echo "--- Building HTML"
yarn run eleventy "$INPUT"
