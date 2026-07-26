#!/bin/bash
# Verify the image's built-in Docker healthcheck.
# Usage: ./src/container-health-test.sh [container-name] [timeout-seconds]

set -u

CONTAINER_NAME="${1:-littlelink-pr}"
TIMEOUT_SECONDS="${2:-90}"
START_TIME=$(date +%s)

echo "=== Container healthcheck test ==="
echo "Container: $CONTAINER_NAME"

while true; do
  STATUS=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$CONTAINER_NAME" 2>/dev/null || true)

  case "$STATUS" in
    healthy)
      echo "PASS  Docker healthcheck is healthy"
      exit 0
      ;;
    unhealthy|no-healthcheck)
      echo "FAIL  Docker healthcheck status: $STATUS"
      docker inspect --format '{{json .State.Health}}' "$CONTAINER_NAME" 2>/dev/null || true
      exit 1
      ;;
  esac

  if [ $(( $(date +%s) - START_TIME )) -ge "$TIMEOUT_SECONDS" ]; then
    echo "FAIL  Docker healthcheck did not become healthy within ${TIMEOUT_SECONDS}s"
    docker inspect --format '{{json .State.Health}}' "$CONTAINER_NAME" 2>/dev/null || true
    exit 1
  fi

  sleep 2
done
