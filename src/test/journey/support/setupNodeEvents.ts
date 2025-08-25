/// <reference types="cypress" />
import { MockApiServer } from "./mockApiServer";

export const setupNodeEvents = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  const mockApiServer = new MockApiServer();

  on("before:run", async () => {
    await mockApiServer.start();
  });

  on("after:run", async () => {
    await mockApiServer.stop();
  });

  on("task", {
    mockApiResponse({
      path,
      data,
      statusCode,
    }: {
      path: string;
      data: unknown;
      statusCode?: number;
    }) {
      mockApiServer.mockResponse({ path, data, statusCode });
      return null; // Important to return null from Cypress node event tasks
    },

    mockApiPostResponse({
      path,
      data,
      statusCode,
    }: {
      path: string;
      data: unknown;
      statusCode?: number;
    }) {
      mockApiServer.mockPostResponse({ path, data, statusCode });
      return null;
    },

    mockApiErrorResponse({
      path,
      message,
      statusCode,
    }: {
      path: string;
      message: string;
      statusCode?: number;
    }) {
      mockApiServer.mockErrorResponse({ path, message, statusCode });
      return null;
    },

    resetApiMocks() {
      mockApiServer.reset();
      return null;
    },
  });

  return config;
};
