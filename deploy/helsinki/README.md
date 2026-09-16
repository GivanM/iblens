# Helsinki server (204.168.182.63): production since 16 September 2026

iblens.com runs here. The app calls the Anthropic API directly; the relay in
`deploy/relay/` and the part-by-part upload in `server/_core/llm.ts` are only used
when `ANTHROPIC_RELAY_URL` is set, which it is not here.

Other projects share this server (anthropic-relay, money-pulse on status.gderiski.ru,
lenta, assistant-bot). Touch only what is listed below.

## How requests arrive

The domain's A records still pointed at REG.RU (91.229.8.73) when the app moved, and
only the registrar can change them. Until they do and every resolver has the change:

    visitor -> REG.RU Caddy (edge_caddy) -> SSH tunnel -> nginx on Helsinki -> app

Plain HTTPS from REG.RU to Helsinki stalls after about 20 KB on each connection, which
would break every essay upload; the same bytes through SSH do not stall (tested with
3 MB). The tunnel is `iblens-tunnel.service` on REG.RU (files in `regru/`), listening on
172.17.0.1:18443 for the Caddy container, with a firewall rule for the Docker bridge.
`iblens-tunnel-check.timer` pushes 64 KB through it every two minutes and restarts it if
that fails. On Helsinki the tunnel logs in as `iblens-tunnel`, whose key may only open
127.0.0.1:443, only from 91.229.8.73.

nginx takes the visitor's address from X-Forwarded-For only on connections from
127.0.0.1 (the tunnel), because the app limits analyses per address.

Once the A records point here, visitors come straight to nginx and the REG.RU path
goes quiet. After a week of nothing in its Caddy log for iblens.com, remove the two
iblens blocks from `/opt/edge/Caddyfile`, stop and disable `iblens-tunnel` and its
timer, and delete the firewall rule for port 18443.

## What is set up here

| Piece | Where |
|---|---|
| App checkout | `/opt/iblens`, owned by `deploy`, cloned over https (read only) |
| Old May 2026 copy | `/opt/iblens-old-may2026`; its database `iblens` is left untouched |
| Database | MySQL `iblens_live`, user `iblens_live`; password in `/root/.iblens_live_dbpw` and `.env` |
| `.env` | production `.env` with the local `DATABASE_URL`, `ANTHROPIC_BASE_URL=https://api.anthropic.com`, no `ANTHROPIC_RELAY_URL` |
| Services | `iblens` (3000) and `iblens-b` (3001), with the drain drop-ins |
| sudo | `sudoers-iblens-deploy`: chown of `/opt/iblens`, start/restart of the two services |
| CI | `.github/workflows/deploy.yml` deploys to this host as `deploy` with a pinned host key; the `iblens-ci-deploy` key is in `~deploy/.ssh/authorized_keys` |
| nginx | `nginx-iblens.conf` in `/etc/nginx/sites-available/iblens`, snippets in `/etc/nginx/snippets/` |
| TLS | Let's Encrypt certificate for iblens.com and www in `/etc/letsencrypt/live/iblens.com`, renewed by certbot's timer (webroot `/var/www/html`, which also works through the REG.RU path) |
| Test address | https://iblens.204-168-182-63.sslip.io (noindex) |

Commits cannot be pushed from this server, which has no GitHub key. The REG.RU checkout
at `/opt/iblens` still has one: commit and push there (its app stays stopped), and the
workflow deploys here.

`cutover.sh` is the script that made the move (Caddy pass-through, final database copy
with a row-count check, start, certificate). It is kept for the record and for a move
back in the other direction as a template.

## Going back to REG.RU

On REG.RU: stop the tunnel timer, restore the newest
`/opt/edge/Caddyfile.bak-before-helsinki-*` and reload Caddy
(`docker exec -w /etc/caddy edge_caddy caddy reload --config /etc/caddy/edge.Caddyfile --adapter caddyfile`).
Stop the Helsinki app, copy `iblens_live` into `iblens` on REG.RU, then
`systemctl enable --now iblens-b iblens` there. Put `DEPLOY_HOST: 91.229.8.73` in the
workflow and pin that server's host key. If the A records already point to Helsinki,
reverse the tunnel direction instead of changing DNS back.
