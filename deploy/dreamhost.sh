#!/usr/bin/env bash
# Upload the built site to DreamHost (owner, 2026-10-19). Builds, checks, backs up what is on the
# server, then copies dist/ up over SSH with rsync. Apache on DreamHost reads public/.htaccess (clean
# URLs, the 301s, the 404, security headers, caching), the counterpart of Netlify's _headers and
# _redirects.
#
#   DH_SSH=username@server.dreamhost.com DH_DIR=aressecurity.co/public ./deploy/dreamhost.sh --dry-run
#   DH_SSH=username@server.dreamhost.com DH_DIR=aressecurity.co/public ./deploy/dreamhost.sh
#
#   DH_SSH   the DreamHost user with SSH turned on (Panel > Websites > Manage > Content > Login Info), @ its server
#   DH_DIR   the site's WEB directory, relative to that user's home, exactly as the panel shows it
#            (Websites > Manage > Settings > Web directory): aressecurity.co/public, not aressecurity.co.
#            The upload mirrors dist/ with --delete, so the domain folder above it would lose its
#            public/ folder; the script refuses a DH_DIR that has a public/ folder inside it.
#   --dry-run       build and check, then list what would change on the server; changes nothing
#   --no-build      upload the dist/ that is already there (only if nothing changed since the last build)
#   --first-upload  allow a web directory that is missing or has no index.html yet
#   Google Analytics: .env.production gives every build the GA4 ID (docs/analytics.md).
#
# GitHub runs this on every push to main (.github/workflows/deploy-dreamhost.yml).
#
# Each real upload first copies the web directory to <DH_DIR>-backup-<date-time> beside it (the five
# newest are kept; beside public/, so not on the web). To roll back: ssh in, then
#   cd aressecurity.co && mv public public-bad && mv public-backup-<stamp> public
#
# Only the web directory changes. DNS, email (Microsoft 365 MX records), and the domain are never touched.
set -euo pipefail
cd "$(dirname "$0")/.."

DRY=0; BUILD=1; FIRST=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    --no-build) BUILD=0 ;;
    --first-upload) FIRST=1 ;;
    *) echo "Unknown option: $a" >&2; exit 2 ;;
  esac
done
: "${DH_SSH:?Set DH_SSH, e.g. DH_SSH=username@server.dreamhost.com}"
: "${DH_DIR:?Set DH_DIR, e.g. DH_DIR=aressecurity.co/public}"
DH_DIR=${DH_DIR%/}
case "$DH_DIR" in /*|*..*|*"'"*|"") echo "DH_DIR must be the web directory under your DreamHost home, like aressecurity.co/public" >&2; exit 2 ;; esac

# Make sure DH_DIR is the live web directory before anything is mirrored into it with --delete.
where=$(ssh "$DH_SSH" "if [ -d '$DH_DIR/public' ]; then echo parent; elif [ ! -d '$DH_DIR' ]; then echo missing; elif [ ! -f '$DH_DIR/index.html' ]; then echo noindex; else echo ok; fi")
case "$where" in
  ok) ;;
  parent) echo "$DH_DIR has a public/ folder inside it, so it is the domain folder, not the web directory. Use DH_DIR=$DH_DIR/public." >&2; exit 1 ;;
  missing|noindex)
    if [ "$FIRST" != 1 ]; then
      echo "$DH_DIR on the server is $( [ "$where" = missing ] && echo 'missing' || echo 'not a site (no index.html)' ). Check DH_DIR against the panel's Web directory, or pass --first-upload." >&2
      exit 1
    fi ;;
  *) echo "Could not check $DH_DIR on the server: $where" >&2; exit 1 ;;
esac

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

# _headers and _redirects are Netlify's and never upload. The site's own .well-known files
# (ai-catalog.json, ard.json) upload, but --delete never removes anything under .well-known
# (DreamHost's certificate checks live there), nor DreamHost's own dot files.
RSYNC=(rsync -rlptvz --delete --human-readable
  --exclude '/_headers' --exclude '/_redirects'
  --filter 'P /.well-known/***'
  --exclude '.dh-*' --exclude '.dreamhost*')

if [ "$DRY" = 1 ]; then
  echo "== Dry run: what would change in $DH_SSH:$DH_DIR (nothing is changed)"
  "${RSYNC[@]}" --dry-run dist/ "$DH_SSH:$DH_DIR/"
  exit 0
fi

stamp=$(date +%Y%m%d-%H%M%S)
echo "== Backing up $DH_DIR to $DH_DIR-backup-$stamp on the server"
ssh "$DH_SSH" "if [ -d '$DH_DIR' ]; then cp -a '$DH_DIR' '$DH_DIR-backup-$stamp'; fi"
# Keep the five newest backups (about 19 MB each), so automatic deploys don't fill the account.
ssh "$DH_SSH" "ls -1d '$DH_DIR'-backup-* 2>/dev/null | sort -r | tail -n +6 | xargs -r rm -rf"

echo "== Uploading"
"${RSYNC[@]}" dist/ "$DH_SSH:$DH_DIR/"

echo "== Checking the live site"
for u in / /services /about /capability-statement /contact /industries /nope; do
  printf '%-22s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "https://aressecurity.co$u" || echo failed)"
done
echo "Expected: 200 for pages, 301 for /industries, 404 for /nope. Backup: $DH_DIR-backup-$stamp"
