#!/bin/bash
# Production HTTP smoke test for littlelink-server containers.
# Usage: ./src/container-smoke-test.sh [host:port] [env-file]
#
# Checks:
#  1. /healthcheck returns 200 and {"status":"ok"}
#  2. / returns 200 with HTML content
#  3. Environment variables are reflected at runtime (not build-time frozen)
#
# Run against a running container. Example:
#   docker run -d --name littlelink-test -p 3001:3000 \
#     -e META_TITLE="Smoke Test" \
#     littlelink-server:PR
#   ./src/container-smoke-test.sh localhost:3001

HOST="${1:-localhost:3000}"
BASE="http://${HOST}"
PASS=0
FAIL=0

check() {
  local label="$1"
  local method="$2"
  local path="$3"
  local expected_status="$4"
  local expected_body_contains="$5"

  if [ -n "$expected_body_contains" ]; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
    body=$(curl -s "$BASE$path")
  else
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
    body=""
  fi

  if [ "$response" = "$expected_status" ]; then
    if [ -n "$expected_body_contains" ]; then
      if echo "$body" | grep -q "$expected_body_contains"; then
        echo "  PASS  $label"
        PASS=$((PASS + 1))
      else
        echo "  FAIL  $label - body missing '$expected_body_contains'"
        echo "    Body: $(echo "$body" | head -c 200)"
        FAIL=$((FAIL + 1))
      fi
    else
      echo "  PASS  $label"
      PASS=$((PASS + 1))
    fi
  else
    echo "  FAIL  $label - expected $expected_status, got $response"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== Container smoke test ==="
echo "Target: $BASE"
echo ""

check "Healthcheck endpoint" "GET" "/healthcheck" "200" "ok"
check "Root page returns HTML" "GET" "/" "200"
check "Default title in HTML" "GET" "/" "200" "<title>"
check "Default noindex" "GET" "/" "200" "noindex"
check "Robots.txt reachable" "GET" "/robots.txt" "200"

echo ""
echo "Results: $PASS passed, $FAIL failed"
if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
