# Helsinki server (204.168.182.63)

Prepared on 16 September 2026 to take over iblens.com from the REG.RU server
(91.229.8.73). The app there calls the Anthropic API directly, so the relay in
`deploy/relay/` and the part-by-part upload in `server/_core/llm.ts` are no longer
on the request path once the domain points here.

Other projects share this server (anthropic-relay, money-pulse on status.gderiski.ru,
lenta, assistant-bot). Touch only what is listed below.

## What is set up

| Piece | Where |
|---|---|
| App checkout | `/opt/iblens`, owned by `deploy`, cloned over https (read only) |
| Old May 2026 copy | moved to `/opt/iblens-old-may2026`; its database `iblens` is left untouched |
| Database | MySQL database `iblens_live`, user `iblens_live`; password in `/root/.iblens_live_dbpw` and `.env` |
| `.env` | production `.env` with the local `DATABASE_URL`, `ANTHROPIC_BASE_URL=https://api.anthropic.com` and no `ANTHROPIC_RELAY_URL` |
| Services | `iblens` (3000) and `iblens-b` (3001), same unit files and drain drop-ins as REG.RU |
| sudo | `sudoers-iblens-deploy` in `/etc/sudoers.d/iblens-deploy`: chown of `/opt/iblens` and start/restart of the two services |
| CI | the `iblens-ci-deploy` public key is in `~deploy/.ssh/authorized_keys`; `deploy` has a bash login shell |
| nginx | `nginx-iblens.conf` in `/etc/nginx/sites-available/iblens`, snippets in `/etc/nginx/snippets/` |
| TLS | until the move: the Caddy certificates for iblens.com and www copied to `/etc/ssl/iblens/` (valid to 11 December 2026); `cutover.sh` replaces them with a Let's Encrypt certificate |
| Test address | https://iblens.204-168-182-63.sslip.io (noindex), certificate by certbot |

Checked on 16 September: pages, www redirect, webhook route (401 on a bad
signature), security headers, gzip, a TOK essay (61 s), an Extended Essay of
3,377 words (101 s) and a UCAS preview through the test address, and the whole
deploy workflow (fetch, reset, install, build, db:push, restart) run as `deploy`.

## Moving the domain

1. The owner points the A records of `iblens.com` and `www.iblens.com` to
   `204.168.182.63` at the registrar.
2. From a machine with root ssh to both servers, once `dig iblens.com @1.1.1.1`
   returns the new address: `bash deploy/helsinki/cutover.sh`. It
   - makes the REG.RU Caddy pass iblens.com through to Helsinki for visitors whose
     DNS is still old (Caddyfile backed up next to it);
   - stops the REG.RU app, copies the database, checks row counts, starts the
     Helsinki app and disables the REG.RU services;
   - requests the Let's Encrypt certificate and switches nginx to it.
   Expect one to two minutes of errors between the Caddy switch and the start.
3. The owner changes the repository secret `SSH_HOST` to `204.168.182.63`
   (Settings, Secrets and variables, Actions). Until then CI deploys to the
   stopped REG.RU copy and Helsinki has to be updated by hand.
4. Commits can no longer be pushed from the app server, which has no GitHub key
   here. Push from the REG.RU checkout or from a machine with access.
5. After a day or two, delete the two pass-through blocks from the REG.RU
   Caddyfile.

## Going back

Point the A records back to 91.229.8.73. On REG.RU restore the newest
`/opt/edge/Caddyfile.bak-before-helsinki-*` and reload Caddy, copy `iblens_live`
from Helsinki into `iblens` with the REG.RU app stopped, then
`systemctl enable --now iblens-b iblens`. Set `SSH_HOST` back.
