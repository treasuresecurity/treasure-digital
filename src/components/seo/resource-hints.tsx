/** dns-prefetch / preconnect hints for third-party origins loaded after consent or below the fold. */
export function ResourceHints() {
  return (
    <>
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://cdn.sanity.io" />
    </>
  );
}
