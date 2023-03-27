#!/usr/bin/env bash

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

yarn clean
yarn build

# Mona Sans
glyphhanger dist/**/*.html --subset=fonts/Mona-Sans.woff2 --family="Mona Sans" --formats=woff2 --css --output=fonts
mv fonts/Mona-Sans-subset.woff2 src/fonts/

# Silkscreen Regular
glyphhanger dist/**/*.html --subset=fonts/Silkscreen-Regular.ttf --family="silkscreen" --formats=woff2 --css --output=fonts
mv fonts/Silkscreen-Regular-subset.woff2 src/fonts/

# Silkscreen Bold
glyphhanger dist/**/*.html --subset=fonts/Silkscreen-Bold.ttf --family="silkscreen" --formats=woff2 --css --output=fonts
mv fonts/Silkscreen-Bold-subset.woff2 src/fonts/
