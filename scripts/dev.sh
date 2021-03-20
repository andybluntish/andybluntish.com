#!/usr/bin/env bash

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
source "$HERE/config.sh"

clean_output

echo "--- Building and watching HTML"
# sending it to the background so we can also watch styels below
yarn run eleventy "$INPUT" --serve &

echo "--- Building and watching CSS"
yarn run postcss "$INPUT/src/assets/css/main.css" -d "$OUTPUT/assets/css" --watch
