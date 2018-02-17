#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

# The root project directory
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/../../ > /dev/null && pwd )"

# Print helpers
. $root/script/lib/print.sh

# The directory whose contents will be deployed
dir=${1:-site}

# The name of the branch we're going to push to
branch=gh-pages

log "Deploying the $(inline_warn $dir) directory to the $(inline_warn $branch) branch...\n\n"

git subtree push --prefix $dir origin $branch
