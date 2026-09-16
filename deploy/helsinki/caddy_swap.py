"""Replace the iblens.com site block in the REG.RU edge Caddyfile with a pass-through to Helsinki.

Usage: python3 caddy_swap.py [path]   (default /opt/edge/Caddyfile)
"""
import sys
PATH = sys.argv[1] if len(sys.argv) > 1 else "/opt/edge/Caddyfile"
BLOCK = """{host} {{
    # iblens.com runs on the Helsinki server (204.168.182.63). Until every resolver has the
    # domain's new A records, visitors who still arrive here are passed on through the SSH
    # tunnel (iblens-tunnel.service): plain HTTPS from this server to Helsinki stalls after
    # about 20 KB. Delete this block once nothing arrives here any more.
    reverse_proxy https://host.docker.internal:18443 {{
        header_up Host {{host}}
        lb_try_duration 5s
        transport http {{
            tls_server_name {host}
        }}
    }}
}}
"""
NEW = BLOCK.format(host="iblens.com") + "\n" + BLOCK.format(host="www.iblens.com")
s = open(PATH, encoding="utf-8").read()
head = "iblens.com, www.iblens.com {"
if s.count(head) != 1:
    sys.exit("iblens block not found exactly once; nothing changed")
start = s.index(head)
end = s.index("\n}\n", start) + 3
open(PATH, "w", encoding="utf-8").write(s[:start] + NEW + s[end:])
print("caddy block swapped")
