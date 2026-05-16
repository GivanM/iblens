#!/bin/bash
# One-time VPS setup for iblens.com
# Run as deploy user on 91.229.8.73
set -e

REPO="git@github.com:GivanM/iblens.git"
APP_DIR="/opt/iblens"

# ── Node.js 20 + pnpm ──────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pnpm &>/dev/null; then
  sudo npm install -g pnpm@10
fi

# ── MySQL ───────────────────────────────────────────────────────────────────
if ! command -v mysql &>/dev/null; then
  sudo apt-get install -y mysql-server
  sudo systemctl enable mysql
  sudo systemctl start mysql
  echo "Create DB manually:"
  echo "  sudo mysql -e \"CREATE DATABASE iblens DEFAULT CHARACTER SET utf8mb4;\""
  echo "  sudo mysql -e \"CREATE USER 'iblens'@'localhost' IDENTIFIED BY 'CHANGE_ME';\""
  echo "  sudo mysql -e \"GRANT ALL ON iblens.* TO 'iblens'@'localhost';\""
fi

# ── Clone repo ──────────────────────────────────────────────────────────────
if [ ! -d "$APP_DIR" ]; then
  sudo mkdir -p "$APP_DIR"
  sudo chown deploy:deploy "$APP_DIR"
  git clone "$REPO" "$APP_DIR"
fi

# ── Uploads dir ─────────────────────────────────────────────────────────────
mkdir -p "$APP_DIR/uploads"

# ── systemd service ─────────────────────────────────────────────────────────
sudo cp "$APP_DIR/deploy/iblens.service" /etc/systemd/system/iblens.service
sudo systemctl daemon-reload
sudo systemctl enable iblens

# ── sudo for systemctl restart ──────────────────────────────────────────────
SUDOERS_LINE="deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart iblens, /bin/systemctl status iblens"
if ! sudo grep -qF "NOPASSWD: /bin/systemctl restart iblens" /etc/sudoers; then
  echo "$SUDOERS_LINE" | sudo tee /etc/sudoers.d/iblens > /dev/null
  sudo chmod 440 /etc/sudoers.d/iblens
fi

echo ""
echo "=== Next steps ==="
echo "1. Create /opt/iblens/.env (see .env.example)"
echo "2. Add iblens.com block to /etc/caddy/Caddyfile (see deploy/Caddyfile.snippet)"
echo "3. sudo systemctl reload caddy"
echo "4. Add SSH_PRIVATE_KEY, SSH_HOST, SSH_USER to GitHub repo secrets"
echo "5. Point DNS iblens.com → 91.229.8.73"
echo "6. cd /opt/iblens && pnpm install && pnpm build && pnpm db:push"
echo "7. sudo systemctl start iblens"
