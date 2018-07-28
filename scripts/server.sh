#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

live-server ./public/ --no-browser --port=3000
