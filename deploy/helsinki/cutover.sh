#!/bin/bash
# IBLens: move production from REG.RU (91.229.8.73) to Helsinki (204.168.182.63).
# Run from the Mac only after iblens.com and www.iblens.com resolve to 204.168.182.63.
set -euo pipefail
RU=root@91.229.8.73
FI=root@204.168.182.63
HERE="$(cd "$(dirname "$0")" && pwd)"
Q='select (select count(*) from users),(select count(*) from anonymous_analyses),(select count(*) from analyses),(select count(*) from orders),(select count(*) from webhook_events),(select count(*) from credit_lots),(select count(*) from credit_ledger),(select count(*) from __drizzle_migrations)'

echo "0. DNS check"
for r in 1.1.1.1 8.8.8.8; do echo "   $r: $(dig +short iblens.com @$r | tr '\n' ' ')/ www: $(dig +short www.iblens.com @$r | tr '\n' ' ')"; done
dig +short iblens.com @1.1.1.1 | grep -qx 204.168.182.63 || { echo "iblens.com does not point to Helsinki yet; stopping"; exit 1; }

echo "1. REG.RU edge passes iblens.com to Helsinki"
scp -q "$HERE/caddy_swap.py" $RU:/tmp/caddy_swap.py
ssh $RU 'set -e; cp /opt/edge/Caddyfile /opt/edge/Caddyfile.bak-before-helsinki-$(date +%Y%m%d%H%M); python3 /tmp/caddy_swap.py; docker exec edge_caddy caddy validate --config /etc/caddy/edge.Caddyfile --adapter caddyfile >/dev/null; docker exec -w /etc/caddy edge_caddy caddy reload --config /etc/caddy/edge.Caddyfile --adapter caddyfile'

echo "2. Stop the REG.RU app (waits for analyses in flight)"
ssh $RU 'systemctl stop iblens-b iblens; systemctl is-active iblens iblens-b || true'

echo "3. Copy the final database to Helsinki"
ssh $FI 'systemctl stop iblens iblens-b; mysql -e "DROP DATABASE iblens_live; CREATE DATABASE iblens_live CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;"'
ssh $RU 'mysqldump --single-transaction --no-tablespaces --set-gtid-purged=OFF iblens' | ssh $FI 'mysql iblens_live'
A=$(ssh $RU "mysql -N iblens -e '$Q'"); B=$(ssh $FI "mysql -N iblens_live -e '$Q'")
echo "   REG.RU:   $A"; echo "   Helsinki: $B"
[ "$A" = "$B" ] || { echo "row counts differ; the Helsinki app stays stopped"; exit 1; }

echo "4. Start the Helsinki app"
ssh $FI 'systemctl start iblens-b iblens; for i in $(seq 1 30); do curl -sf -o /dev/null http://127.0.0.1:3000/ && curl -sf -o /dev/null http://127.0.0.1:3001/ && break; sleep 1; done; systemctl enable -q iblens iblens-b; systemctl is-active iblens iblens-b'
curl -s -o /dev/null -w "   https://iblens.com via Helsinki: %{http_code}\n" --resolve iblens.com:443:204.168.182.63 https://iblens.com/
curl -s -o /dev/null -w "   https://iblens.com via REG.RU pass-through: %{http_code}\n" --resolve iblens.com:443:91.229.8.73 https://iblens.com/

echo "5. Keep the REG.RU app off after a reboot"
ssh $RU 'systemctl disable -q iblens iblens-b; systemctl is-enabled iblens iblens-b || true'

echo "6. Let's Encrypt certificate for iblens.com in Helsinki"
if ssh $FI 'certbot certonly --webroot -w /var/www/html -d iblens.com -d www.iblens.com --non-interactive --deploy-hook "systemctl reload nginx" >/tmp/certbot-iblens.log 2>&1'; then
  ssh $FI 'set -e; sed -i "s#/etc/ssl/iblens/iblens.com.crt#/etc/letsencrypt/live/iblens.com/fullchain.pem#; s#/etc/ssl/iblens/iblens.com.key#/etc/letsencrypt/live/iblens.com/privkey.pem#; s#/etc/ssl/iblens/www.iblens.com.crt#/etc/letsencrypt/live/iblens.com/fullchain.pem#; s#/etc/ssl/iblens/www.iblens.com.key#/etc/letsencrypt/live/iblens.com/privkey.pem#" /etc/nginx/sites-available/iblens; nginx -t 2>&1 | tail -1; systemctl reload nginx'
  echo "   certificate issued, nginx uses it"
else
  echo "   certbot failed (see /tmp/certbot-iblens.log on Helsinki); the copied certificate is valid until 11 December 2026"
fi
echo "done"
