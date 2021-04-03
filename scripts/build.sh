#!/usr/bin/env bash

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
source "$HERE/config.sh"

clean_output

echo "--- Building HTML"
yarn run eleventy "$INPUT"
