#!/usr/bin/env bash

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
ROOT="$(dirname "${HERE}")"
INPUT="${ROOT}/"
OUTPUT="${ROOT}/dist"

function clean_output() {
  echo "--- Cleaning output directory"
  if [ -d "$OUTPUT" ]; then
    rm -r "${OUTPUT}"
  fi
}
