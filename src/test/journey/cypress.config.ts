import { defineConfig } from "cypress";
import { setupNodeEvents } from "./support/setupNodeEvents";

export default defineConfig({
  projectId: "sd-ui-journey",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "src/test/journey/support/journey.ts",
    specPattern: "src/test/journey/journeys/**/*.{js,jsx,ts,tsx}",
    experimentalInteractiveRunEvents: true, // Required for mock server integration
    env: {
      API_BASE_URL: "http://localhost:3001", // Point to mock server
    },
    setupNodeEvents(on, config) {
      // Set environment variable for Next.js to use mock server
      process.env.API_BASE_URL = "http://localhost:3001";

      // Import and setup the mock API server
      return setupNodeEvents(on, config);
    },
  },
});
