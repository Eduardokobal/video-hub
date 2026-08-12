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
        ],
      },
    ];
  },
};
export default nextConfig;
