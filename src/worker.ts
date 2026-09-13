export interface Env {
  ASSETS: Fetcher;
}

// Legacy privacy URLs. /privacy is canonical: it carries the MetaTags canonical,
// breadcrumb, and GA4 disclosure, and is the target of every in-app privacy link.
// All three entry forms redirect in one hop so /legal/privacy.html never chains
// through the assets layer's trailing-slash 307.
const LEGACY_PATHS = new Map<string, string>([
  ['/legal/privacy', '/privacy/'],
  ['/legal/privacy/', '/privacy/'],
  ['/legal/privacy.html', '/privacy/'],
]);

// Prerender writes dist/<route>/index.html, so every HTML route canonicalizes to
// the trailing-slash form. The assets layer would only answer these with a 307;
// issuing the 301 here keeps the hop permanent. A dot in the final segment means
// the request is for a file, which must never be redirected.
function needsTrailingSlash(pathname: string): boolean {
  if (pathname === '/' || pathname.endsWith('/')) return false;
  return !pathname.slice(pathname.lastIndexOf('/') + 1).includes('.');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === 'www.williamspurlock.com') {
      url.hostname = 'williamspurlock.com';
      return Response.redirect(url.toString(), 301);
    }

    const legacy = LEGACY_PATHS.get(url.pathname);
    if (legacy) {
      url.pathname = legacy;
      return Response.redirect(url.toString(), 301);
    }

    if (needsTrailingSlash(url.pathname)) {
      url.pathname = `${url.pathname}/`;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
