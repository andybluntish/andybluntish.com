#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

grep -o --color=never -E "<\w+(>|\s)" site/*.html | sort | uniq | sed -e "s/[<>]//g"
