"""Replace the iblens.com site block in the REG.RU edge Caddyfile with a pass-through to Helsinki."""
import sys
PATH = "/opt/edge/Caddyfile"
NEW = """iblens.com {
    # iblens.com moved to the Helsinki server (204.168.182.63). Visitors whose DNS still
    # points here are passed on until the old record has expired everywhere; then delete
    # these two blocks.
    reverse_proxy https://204.168.182.63 {
        header_up Host {host}
        transport http {
            tls_server_name iblens.com
        }
    }
}

www.iblens.com {
    reverse_proxy https://204.168.182.63 {
        header_up Host {host}
        transport http {
            tls_server_name www.iblens.com
        }
    }
}
"""
s = open(PATH, encoding="utf-8").read()
head = "iblens.com, www.iblens.com {"
if s.count(head) != 1:
    sys.exit("iblens block not found exactly once; nothing changed")
start = s.index(head)
end = s.index("\n}\n", start) + 3
open(PATH, "w", encoding="utf-8").write(s[:start] + NEW + s[end:])
print("caddy block swapped")
