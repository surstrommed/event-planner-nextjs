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
        MONGODB_DATABASE: "event-planner:dev",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  }

  return {
    ...generalConfig,
    env: {
      ENVIRONMENT: "production",
      MONGODB_DATABASE: "event-planner",
      NEXTAUTH_URL: "https://event-planner-api.vercel.app",
    },
  };
};
