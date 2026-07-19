#!/bin/bash
# e2e:minimal - Run e2e tests against a Docker container with no env vars
set -euo pipefail

echo "Starting minimal-env Docker container..."
IMAGE_NAME=${IMAGE_NAME:-littlelink-server:nextjs-test}
CONTAINER_ID=$(docker run --rm -d -p 3002:3000 "$IMAGE_NAME")
trap "docker stop $CONTAINER_ID >/dev/null 2>&1" EXIT

sleep 3

cd "$(dirname "$0")/.."
PLAYWRIGHT_SKIP_WEB_SERVER=1 yarn playwright test --config=playwright.config.ts --project=minimal-env \
  --reporter=list "$@"

echo "Done"
