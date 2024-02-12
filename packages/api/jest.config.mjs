/** @type {import('jest').Config} */

export default {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
};
