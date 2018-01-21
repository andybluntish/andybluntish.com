#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

dir=${1:-site}

grep -o --color=never -E "<\w+(>|\s)" $dir/*.html | sort | uniq | sed -e "s/[<>]//g"
