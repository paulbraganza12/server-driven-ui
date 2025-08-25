import { defineConfig } from "cypress";
import { setupNodeEvents } from "./support/setupNodeEvents";

export default defineConfig({
  projectId: "sd-ui-journey",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "src/test/journey/support/journey.ts",
    specPattern: "src/test/journey/journeys/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // Import and setup the mock API server
      return setupNodeEvents(on, config);
    },
  },
});
