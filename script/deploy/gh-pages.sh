#!/usr/bin/env bash
set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

dir=${1:-site}
branch=${2:-gh-pages}

function printf_ok () {
  printf "\033[0;32m$1\033[0m"
}

function printf_warn () {
  printf "\033[0;33m$1\033[0m"
}

function string_wrap_warn () {
  echo "\033[0;33m$1\033[0m"
}

function printf_err () {
  printf "\033[0;31m$1\033[0m"
}

while true; do
  printf "You are about to deploy the $(string_wrap_warn $dir) directory to the $(string_wrap_warn $branch) branch.\n"
  read -p "Are you sure you want to do that? [y/N]" answer
  case $answer in

    [yY][eE][sS]|[yY])
      printf_ok "\nSure, let's go!\n\n"
      break
      ;;
    [Nn]* )
      printf_warn "\nOK, goodbye then.\n"
      exit
      ;;
    * )
      printf_err "Please answer yes or no.\n\n"
      ;;
  esac
done

printf "Deploying $(string_wrap_warn $dir) to $(string_wrap_warn $branch)...\n\n"

git subtree push --prefix $dir origin $branch

printf_ok "\nAll done, time to grab a beer and relax! 🍺\n"
