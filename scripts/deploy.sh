#!/usr/bin/env zsh

set -euo pipefail
[[ ${DEBUG:-} ]] && set -x

# Load environment variables
SCRIPT_DIR=$(dirname "$(realpath "${0:A}")")
source "${SCRIPT_DIR}/../.env"

# Deploy the site from GitHub (main branch) to Cloudflare Pages
curl -X POST "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/${CLOUDFLARE_DEPLOY_HOOK_TOKEN}"
