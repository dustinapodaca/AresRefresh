#!/usr/bin/env bash
# Upload the built site to DreamHost (owner, 2026-10-19). Builds, checks, backs up what is on the
# server, then copies dist/ up over SSH with rsync. Apache on DreamHost reads public/.htaccess (clean
# URLs, the 301s, the 404, security headers, caching), the counterpart of Netlify's _headers and
# _redirects.
#
#   DH_SSH=username@server.dreamhost.com DH_DIR=aressecurity.co ./deploy/dreamhost.sh --dry-run
#   DH_SSH=username@server.dreamhost.com DH_DIR=aressecurity.co ./deploy/dreamhost.sh
#
#   DH_SSH   the DreamHost user with SSH turned on (Panel > Websites > Manage, SFTP/SSH user), @ its server
#   DH_DIR   the site's folder, relative to that user's home (DreamHost names it after the domain)
#   --dry-run    build and check, then list what would change on the server; changes nothing
#   --no-build   upload the dist/ that is already there (only if nothing changed since the last build)
#   Google Analytics: .env.production gives every build the GA4 ID (docs/analytics.md).
#
# Each real upload first copies the server folder to <DH_DIR>-backup-<date-time> beside it. To roll
# back: ssh in, then  mv aressecurity.co aressecurity.co-bad && mv aressecurity.co-backup-<stamp> aressecurity.co
set -euo pipefail
cd "$(dirname "$0")/.."

DRY=0; BUILD=1
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    --no-build) BUILD=0 ;;
    *) echo "Unknown option: $a" >&2; exit 2 ;;
  esac
done
: "${DH_SSH:?Set DH_SSH, e.g. DH_SSH=username@server.dreamhost.com}"
: "${DH_DIR:?Set DH_DIR, e.g. DH_DIR=aressecurity.co}"
case "$DH_DIR" in /*|*..*|"") echo "DH_DIR must be a folder name under your DreamHost home, like aressecurity.co" >&2; exit 2 ;; esac

if [ "$BUILD" = 1 ]; then npm run build; fi
npm run check:seo

# The Apache file must ship, and its Content-Security-Policy must match Netlify's _headers.
[ -f dist/.htaccess ] || { echo "dist/.htaccess is missing (public/.htaccess)" >&2; exit 1; }
csp_netlify=$(sed -n 's/^[[:space:]]*Content-Security-Policy:[[:space:]]*//p' dist/_headers)
csp_apache=$(sed -n 's/^.*Header always set Content-Security-Policy "\(.*\)"$/\1/p' dist/.htaccess)
if [ -z "$csp_netlify" ] || [ "$csp_netlify" != "$csp_apache" ]; then
  echo "The Content-Security-Policy in public/.htaccess differs from public/_headers. Make them match." >&2
  exit 1
fi

# _headers and _redirects are Netlify's; .well-known (DreamHost's certificate checks) and DreamHost's
# own dot files stay as they are on the server, and --delete never removes them.
RSYNC=(rsync -rlptvz --delete --human-readable
  --exclude '_headers' --exclude '_redirects'
  --exclude '.well-known/' --exclude '.dh-*' --exclude '.dreamhost*')

if [ "$DRY" = 1 ]; then
  echo "== Dry run: what would change in $DH_SSH:$DH_DIR (nothing is changed)"
  "${RSYNC[@]}" --dry-run dist/ "$DH_SSH:$DH_DIR/"
  exit 0
fi

stamp=$(date +%Y%m%d-%H%M%S)
echo "== Backing up $DH_DIR to $DH_DIR-backup-$stamp on the server"
ssh "$DH_SSH" "if [ -d '$DH_DIR' ]; then cp -a '$DH_DIR' '$DH_DIR-backup-$stamp'; fi"

echo "== Uploading"
"${RSYNC[@]}" dist/ "$DH_SSH:$DH_DIR/"

echo "== Checking the live site"
for u in / /services /about /capability-statement /contact /industries /nope; do
  printf '%-22s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "https://aressecurity.co$u" || echo failed)"
done
echo "Expected: 200 for pages, 301 for /industries, 404 for /nope. Backup: $DH_DIR-backup-$stamp"
