/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevents the site being iframed into another page and passed
          // off as it (clickjacking/reputational risk) — the one header
          // with real value for a static site with no auth/forms/cookies.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stops the browser from MIME-sniffing a response away from the
          // declared Content-Type (closes the class of attack where a
          // non-HTML file gets reinterpreted/executed as HTML/script).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limits how much of this page's URL leaks to link destinations
          // (TikTok/GitHub/YouTube) and to img.youtube.com when loading
          // thumbnails — sends only the origin cross-origin, full URL
          // same-origin. Privacy/information-minimization, not attack
          // prevention.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
export default nextConfig;
