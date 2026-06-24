/** dns-prefetch / preconnect hints for third-party origins loaded after consent or below the fold. */
export function ResourceHints() {
  return (
    <>
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link
        rel="alternate"
        type="text/plain"
        href="/llms.txt"
        title="LLM site summary"
      />
    </>
  );
}
