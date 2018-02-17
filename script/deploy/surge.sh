#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

# The root project directory
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/../../ > /dev/null && pwd )"

# Print helpers
. $root/script/lib/print.sh

# The directory whose contents will be deployed
dir=${1:-site}

# Exit if the surge CLI is not installed.
[[ $(type -P surge) ]] || {
  log_err "Oops! The surge CLI is required to deploy, but we can’t find it.\n\n";
  log "Try $(inline_warn "yarn global add surge") or visit http://surge.sh/ for install instructions before trying again.\n\n";
  exit 1
}

log "Deploying the $(inline_warn $dir) directory to $(inline_warn "surge.sh")...\n\n"

surge $root/$dir
