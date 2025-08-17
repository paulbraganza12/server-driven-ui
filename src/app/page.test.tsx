import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Home from "./page";
import { server } from "../test/setup";
import {
  getConfigSuccess,
  getConfigError,
  randomConfigResponse,
} from "../test/test-support/http-ui-config-service";

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show content when config is available", async () => {
    server.use(getConfigSuccess(randomConfigResponse()));

    await renderHome();

    expect(screen.getByTestId("ui-renderer")).toBeDefined();
  });

  it("should show retry component when config api fails", async () => {
    server.use(
      getConfigError({
        status: 500,
        response: { success: false, error: { code: "SERVER_ERROR", message: "Server error" } },
      }),
    );

    await renderHome();

    expect(screen.getByTestId("ui-retry")).toBeDefined();
  });
});

const renderHome = async () => {
  const HomeComponent = await Home();
  render(HomeComponent);
};
