import { expect, beforeAll, afterEach, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { setupServer } from "msw/node";

expect.extend(matchers);

// Create MSW server instance
export const server = setupServer();

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
