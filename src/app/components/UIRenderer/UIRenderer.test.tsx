import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { UIRenderer } from "./UIRenderer";
import { server } from "@/test/setup";
import * as testHttpConfigService from "@/test/test-support/http-ui-config-service";
import { ConfigResponse, UIConfiguration, TextComponent } from "@/app/domain/ui/config-types";

describe("UIRenderer", () => {
  afterEach(() => {
    cleanup();
  });

  const createSuccessConfig = (): ConfigResponse => {
    const textComponent: TextComponent = {
      id: "text-1",
      type: "text",
      content: "Test Content",
    };

    const config: UIConfiguration = {
      version: "1.0.0",
      components: [textComponent],
    };

    return {
      success: true,
      data: config,
    };
  };

  describe("Initial State Rendering", () => {
    it("should render success state when initial config is successful", () => {
      const successConfig = createSuccessConfig();

      render(<UIRenderer initialConfigResponse={successConfig} />);

      expect(screen.getByTestId("ui-renderer")).toBeDefined();
      expect(screen.queryByTestId("ui-loading")).toBeNull();
      expect(screen.queryByTestId("ui-retry")).toBeNull();
    });

    it("should render retry component when initial config fails", () => {
      const errorConfig: ConfigResponse = {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Failed to fetch configuration",
        },
      };

      render(<UIRenderer initialConfigResponse={errorConfig} />);
      const retryButton = screen.getByRole("button", { name: "Retry" });

      expect(screen.getByTestId("ui-retry")).toBeDefined();
      expect(screen.getByText("SERVER_ERROR")).toBeDefined();
      expect(retryButton).toBeDefined();
      expect(screen.getByText("Failed to fetch configuration")).toBeDefined();
      expect(screen.queryByTestId("ui-renderer")).toBeNull();
      expect(screen.queryByTestId("ui-loading")).toBeNull();
    });
  });

  describe("Retry Functionality", () => {
    it("should show loading state when retry is clicked", async () => {
      const errorConfig: ConfigResponse = {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Server error",
        },
      };
      server.use(
        testHttpConfigService.getConfigSuccess(
          createSuccessConfig() as unknown as Record<string, unknown>,
        ),
      );

      render(<UIRenderer initialConfigResponse={errorConfig} />);

      const retryButton = screen.getByRole("button", { name: "Retry" });
      fireEvent.click(retryButton);

      expect(screen.getByTestId("ui-loading")).toBeDefined();
      expect(screen.queryByTestId("ui-retry")).toBeNull();
      expect(screen.queryByTestId("ui-renderer")).toBeNull();
    });

    it("should render success state after successful retry", async () => {
      const errorConfig: ConfigResponse = {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Network error",
        },
      };
      const successResponse = createSuccessConfig();
      server.use(
        testHttpConfigService.getConfigSuccess(
          successResponse as unknown as Record<string, unknown>,
        ),
      );

      render(<UIRenderer initialConfigResponse={errorConfig} />);

      const retryButton = screen.getByRole("button", { name: "Retry" });
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByTestId("ui-renderer")).toBeDefined();
      });

      expect(screen.queryByTestId("ui-loading")).toBeNull();
      expect(screen.queryByTestId("ui-retry")).toBeNull();
    });

    it("should show error state again if retry fails", async () => {
      const initialErrorConfig: ConfigResponse = {
        success: false,
        error: {
          code: "INITIAL_ERROR",
          message: "Initial error",
        },
      };
      const retryErrorResponse: ConfigResponse = {
        success: false,
        error: {
          code: "RETRY_ERROR",
          message: "Retry failed",
        },
      };
      server.use(
        testHttpConfigService.getConfigError({
          status: 500,
          response: retryErrorResponse,
        }),
      );

      render(<UIRenderer initialConfigResponse={initialErrorConfig} />);

      const retryButton = screen.getByRole("button", { name: "Retry" });
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText("RETRY_ERROR")).toBeDefined();
      });

      expect(screen.getByText("Retry failed")).toBeDefined();
      expect(screen.getByTestId("ui-retry")).toBeDefined();
      expect(screen.queryByTestId("ui-loading")).toBeNull();
      expect(screen.queryByTestId("ui-renderer")).toBeNull();
    });
  });
});
