#!/usr/bin/env bash

INPUT="$HERE/../"
OUTPUT="$HERE/../dist"

function clean_output() {
  echo "--- Cleaning output directory"
  if [ -d "$OUTPUT" ]; then
    rm -r "$OUTPUT"
  fi
}
