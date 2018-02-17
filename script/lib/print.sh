#!/usr/bin/env bash

function log () {
  printf "$1"
}

function log_ok () {
  printf "\033[0;32m$1\033[0m"
}

function log_err () {
  printf "\033[0;31m$1\033[0m"
}

function log_warn () {
  printf "\033[0;33m$1\033[0m"
}

function inline_warn () {
  echo "\033[0;33m$1\033[0m"
}
