#!/bin/bash
# e2e:minimal — Run e2e tests against a Docker container with no env vars
set -euo pipefail

echo "Starting minimal-env Docker container..."
CONTAINER_ID=$(docker run -d -p 3002:3000 littlelink-server:nextjs-test)
trap "docker kill $CONTAINER_ID 2>/dev/null" EXIT

sleep 3

cd "$(dirname "$0")/.."
yarn playwright test --config=playwright.config.ts --project=minimal-env \
  --reporter=list "$@"

echo "Done"
