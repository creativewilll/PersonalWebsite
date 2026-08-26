export const SITE_ORIGIN = 'https://williamspurlock.com';

/** Absolute URL in the served trailing-slash form (`dist/<route>/index.html`). */
export function siteUrl(path: string = '/'): string {
  if (!path || path === '/') return `${SITE_ORIGIN}/`;
  const pathname = path.startsWith('http')
    ? new URL(path).pathname
    : path.startsWith('/')
      ? path
      : `/${path}`;
  const trimmed = pathname.replace(/\/+$/, '');
  if (!trimmed || trimmed === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${trimmed}/`;
}
