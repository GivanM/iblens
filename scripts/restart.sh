#!/usr/bin/env bash
# Restart both copies of the app without a gap. Caddy sends traffic to 3000 and falls back
# to 3001 (iblens-b) while 3000 is down. The main copy drains its analyses in flight first,
# so while it stops, the standby answers; then the standby restarts onto the new build.
set -euo pipefail
wait_up() {
  for _ in $(seq 1 60); do
    curl -sf -o /dev/null "http://127.0.0.1:$1/" && return 0
    sleep 1
  done
  echo "port $1 did not come up" >&2
  return 1
}
if systemctl is-active --quiet iblens-b; then wait_up 3001; fi
sudo systemctl restart iblens
wait_up 3000
if systemctl list-unit-files iblens-b.service >/dev/null 2>&1; then
  sudo systemctl restart iblens-b
  wait_up 3001
fi
echo "restarted: 3000 and 3001 up"
