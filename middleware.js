export default function middleware(request) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  const isFacebook =
    ua.includes('facebookexternalhit') ||
    ua.includes('facebot') ||
    ua.includes('facebookbot') ||
    ua.includes('meta-externalagent');

  if (!isFacebook) return;

  return new Response(
    `<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
<head>
<meta charset="UTF-8">
<title>Advertise with Talk Media | #1 Award-Winning Sites in NW Broward County</title>
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.talkmediasponsors.info/">
<meta property="og:title" content="Advertise with Talk Media | #1 Award-Winning Sites in NW Broward County">
<meta property="og:description" content="Reach 50,000+ engaged local readers across NW Broward County. Sponsored articles, display ads, and more.">
<meta property="og:image" content="https://raw.githubusercontent.com/ryanryousefi-ctrl/talkmediasponsors/main/og-share-card.png">
<meta property="og:image:width" content="3000">
<meta property="og:image:height" content="2000">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Advertise with Talk Media | #1 Award-Winning Sites in NW Broward County">
<meta name="twitter:description" content="Reach 50,000+ engaged local readers across NW Broward County.">
<meta name="twitter:image" content="https://raw.githubusercontent.com/ryanryousefi-ctrl/talkmediasponsors/main/og-share-card.png">
</head>
<body></body>
</html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

export const config = {
  matcher: ['/', '/((?!.*\\..*).*)'],
};
