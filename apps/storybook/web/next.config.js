const { createContentlayerPlugin } = require("next-contentlayer");
const nextIntlPlugin = require("next-intl/plugin");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const withNextIntl = nextIntlPlugin("./i18n.ts");
const withContentlayer = createContentlayerPlugin({});

//module.exports = withNextIntl(withContentlayer(nextConfig));

module.exports = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    transpilePackages: ["api"],
    images: {
      domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
  };

  return withNextIntl(withContentlayer(nextConfig));
};
