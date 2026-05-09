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
<meta property="og:image" content="https://www.talkmediasponsors.info/social-preview.jpg">
<meta property="og:image:secure_url" content="https://www.talkmediasponsors.info/social-preview.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Advertise with Talk Media | #1 Award-Winning Sites in NW Broward County">
<meta name="twitter:description" content="Reach 50,000+ engaged local readers across NW Broward County. Sponsored articles, display ads, and more.">
<meta name="twitter:image" content="https://www.talkmediasponsors.info/social-preview.jpg">
</head>
<body></body>
</html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

export const config = {
  matcher: ['/', '/((?!.*\\..*).*)'],
};
