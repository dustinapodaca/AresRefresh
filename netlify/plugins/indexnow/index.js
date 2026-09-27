/**
 * Pings IndexNow (Bing, Yandex, Seznam, Naver) with every sitemap URL after
 * a successful PRODUCTION deploy.
 *
 * Gated so it is a no-op until the domain is actually live on Netlify:
 * pinging while aressecurity.co still resolves to the old server would
 * submit URLs that return someone else's content.
 *
 * Requires the INDEXNOW_KEY environment variable (set it in the Netlify UI).
 * The build writes dist/<key>.txt, which IndexNow fetches to verify
 * ownership. That file is public by design.
 *
 * Never fails the build: an IndexNow outage is not a deploy problem.
 *
 * ESM because the host package.json declares "type": "module".
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const EXPECTED_HOST = 'https://aressecurity.co';

export const onSuccess = async ({ constants, utils }) => {
  const { CONTEXT, URL: siteUrl, INDEXNOW_KEY: key } = process.env;

  if (CONTEXT !== 'production' || !siteUrl || !siteUrl.startsWith(EXPECTED_HOST)) {
    console.log(
      `IndexNow skipped (pre-cutover or non-production): CONTEXT=${CONTEXT || 'unset'}, URL=${siteUrl || 'unset'}`,
    );
    return;
  }

  if (!key) {
    console.log('IndexNow skipped: INDEXNOW_KEY is not set.');
    return;
  }

  if (!/^[0-9a-f]{32}$/i.test(key)) {
    console.log('IndexNow skipped: INDEXNOW_KEY must be 32 hex characters.');
    return;
  }

  const publish = constants?.PUBLISH_DIR || 'dist';

  try {
    // Ownership key file, fetched by the IndexNow API to verify the host.
    writeFileSync(join(publish, `${key}.txt`), key);

    const xml = readFileSync(join(publish, 'sitemap.xml'), 'utf8');
    const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    if (!urlList.length) {
      console.log('IndexNow skipped: no URLs found in sitemap.xml.');
      return;
    }

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'aressecurity.co',
        key,
        keyLocation: `${EXPECTED_HOST}/${key}.txt`,
        urlList,
      }),
    });

    console.log(`IndexNow: submitted ${urlList.length} URLs — HTTP ${res.status}`);
  } catch (err) {
    // Deliberately a warning, not utils.build.failBuild.
    console.log(`IndexNow ping failed (non-fatal): ${err.message}`);
    utils?.status?.show?.({ title: 'IndexNow', summary: `Ping failed (non-fatal): ${err.message}` });
  }
};

export default { onSuccess };
