export default {
    clearMocks: true,
    coverageProvider: "v8",
    preset: "ts-jest/presets/js-with-ts",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
}