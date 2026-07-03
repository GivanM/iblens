#!/bin/bash
LOG=/var/log/iblens-health.log
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
ERRORS=0
REPORT=""

check() {
  local name="$1"
  local result="$2"
  local expected="$3"
  if echo "$result" | grep -qE "$expected"; then
    REPORT="$REPORT\n  OK $name"
  else
    REPORT="$REPORT\n  FAIL $name"
    ERRORS=$((ERRORS + 1))
  fi
}

# 1. Server up
check "Server responds" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/)" "200"

# 2. Essay API reachable (GET for query)
check "Essay API reachable" "$(curl -s 'http://localhost:3000/api/trpc/essay.canAnalyzeAnonymous?input=%7B%22json%22%3A%7B%22clientFingerprint%22%3A%22healthcheck%22%7D%7D')" "result"

# 3. Key pages have real content
for path in /essay/biology-ia /essay/tok-essay /essay/extended-essay /essay/tok-exhibition; do
  check "Page $path" "$(curl -s http://localhost:3000$path | grep -c 'Grader')" "[1-9]"
done

# 4. Sitemap ok
check "Sitemap" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/sitemap.xml)" "200"

# 5. Hetzner proxy (Anthropic relay)
check "Anthropic proxy" "$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://204.168.182.63:8080/v1/models 2>/dev/null || echo '000')" "401|200"

echo -e "[$TIMESTAMP] ERRORS=$ERRORS$REPORT" >> $LOG
echo -e "[$TIMESTAMP] Errors: $ERRORS$REPORT"
