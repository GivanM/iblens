#!/bin/bash
# Every-30-min end-to-end canary: site up + full LLM path (relay -> Anthropic).
# Failures are timestamped in the log so time-of-day patterns are visible.
TS=$(date -Iseconds)
LOG=/var/log/iblens-canary.log
KEY=$(grep '^ANTHROPIC_API_KEY=' /opt/iblens/.env | cut -d= -f2)
RELAY=$(grep '^ANTHROPIC_RELAY_URL=' /opt/iblens/.env | cut -d= -f2)
MODEL=$(grep '^ANTHROPIC_MODEL=' /opt/iblens/.env | cut -d= -f2)
FAIL=""

code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 https://iblens.com/)
[ "$code" != "200" ] && FAIL="site=$code "

sub=$(curl -s --max-time 15 -X POST "$RELAY/submit" -H 'content-type: application/json' \
  -d "{\"apiKey\":\"$KEY\",\"payload\":{\"model\":\"$MODEL\",\"max_tokens\":16,\"messages\":[{\"role\":\"user\",\"content\":\"Reply with the single word: pong\"}]}}")
id=$(echo "$sub" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
if [ -n "$id" ]; then
  ok=""
  for i in $(seq 1 20); do
    sleep 3
    r=$(curl -s --max-time 10 "$RELAY/result/$id")
    st=$(echo "$r" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('status',''), d.get('code',''))" 2>/dev/null)
    case "$st" in
      "done 200") ok=1; break;;
      done*) FAIL="${FAIL}llm=$st "; break;;
    esac
  done
  [ -z "$ok" ] && [ -z "$FAIL" ] && FAIL="${FAIL}llm=poll_timeout "
else
  FAIL="${FAIL}relay_submit_failed "
fi

if [ -n "$FAIL" ]; then echo "$TS FAIL $FAIL" >> "$LOG"; else echo "$TS OK" >> "$LOG"; fi
