#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

# The root project directory
root="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. > /dev/null && pwd )"

# Print helpers
. $root/script/lib/print.sh

err_report() {
  log_err "Woah! Something funky and weird happened and we had to give up.\n"
  log_err "Maybe take another whack at it...\n" >&2
}

trap err_report ERR

# The directory whose contents will be deployed
dir=${1:-site}

# The location to deploy to.
# This is the name of the script in the ./script/deploy directory
# that will be used to do the deploy.
target=${2:-surge}

while true; do
  log "You are about to deploy the $(inline_warn $dir) directory using $(inline_warn $target).\n"
  read -p "Are you sure you want to do that? [y/N]" answer
  case $answer in

    [yY][eE][sS]|[yY])
      log_ok "\nSure, let's go!\n\n"
      break
      ;;
    [Nn]* )
      log_warn "\nOK, goodbye then.\n"
      exit
      ;;
    * )
      log_err "Please answer yes or no.\n\n"
      ;;
  esac
done

$root/script/deploy/$target.sh $*

log_ok "\nAll done, time to grab a beer and relax! 🍺\n"
