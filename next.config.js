const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const generalConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      loader: "custom",
      loaderFile: "./src/app/utils/index.ts",
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...generalConfig,
      env: {
        ENVIRONMENT: "development",
        MONGODB_DATABASE: process.env.DEV_MONGODB_DATABASE,
        NEXTAUTH_URL: process.env.DEV_NEXTAUTH_URL,
      },
    };
  }

  return {
    ...generalConfig,
    env: {
      ENVIRONMENT: "production",
      MONGODB_DATABASE: process.env.PROD_MONGODB_DATABASE,
      NEXTAUTH_URL: process.env.PROD_NEXTAUTH_URL,
    },
  };
};
