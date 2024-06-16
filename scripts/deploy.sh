#!/usr/bin/env zsh

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

CURRENT_DIR=$(dirname "$(realpath "${0:A}")")
ROOT_DIR=$(dirname "${CURRENT_DIR}")

# Load environment variables
source "${ROOT_DIR}/.env"

# Deploy the site from GitHub (main branch) to Cloudflare Pages
curl -X POST "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/${CLOUDFLARE_DEPLOY_HOOK_TOKEN}"
