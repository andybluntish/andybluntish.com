#!/usr/bin/env bash

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
INPUT="$HERE/../"
OUTPUT="$HERE/../dist"

function clean_output() {
  echo "--- Cleaning output directory"
  if [ -d "$OUTPUT" ]; then
    rm -r "$OUTPUT"
  fi
}
