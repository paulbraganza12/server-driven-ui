import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";
import {
  ConfigResponse,
  UIConfiguration,
  TextComponent,
  ButtonComponent,
} from "@/app/domain/ui/config-types";

// Mock the config module
vi.mock("./config", () => ({
  getConfig: vi.fn(),
}));
import { getConfig } from "./config";

const createMockRequest = (url: string = "http://localhost:3000/api/ui-config"): NextRequest => {
  return new NextRequest(url);
};

const getResponseData = async <T = unknown>(response: Response): Promise<T> => {
  const data = await response.json();
  return data as T;
};

// Mock config data
const mockUIConfig: UIConfiguration = {
  version: "1.0.0",
  components: [
    {
      id: "test-component",
      type: "text",
      content: "Test Content",
      className: "test-class",
    } as TextComponent,
    {
      id: "test-button",
      type: "button",
      text: "Test Button",
      action: "submit",
      ariaLabel: "Test button",
    } as ButtonComponent,
  ],
};

describe("/api/ui-config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Success Scenarios", () => {
    it("should return a valid successful response structure", async () => {
      // Mock getConfig to return our test data
      vi.mocked(getConfig).mockResolvedValue(mockUIConfig);
      const request = createMockRequest();

      const response = await GET(request);

      expect(response.status).toBe(200);

      const data = await getResponseData<ConfigResponse>(response);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();

      expect(data.data!.version).toBe("1.0.0");
      expect(data.data!.components).toHaveLength(2);

      const textComponent = data.data!.components[0] as TextComponent;
      expect(textComponent.id).toBe("test-component");
      expect(textComponent.type).toBe("text");
      expect(textComponent.content).toBe("Test Content");

      const buttonComponent = data.data!.components[1] as ButtonComponent;
      expect(buttonComponent.id).toBe("test-button");
      expect(buttonComponent.type).toBe("button");
      expect(buttonComponent.text).toBe("Test Button");
    });
  });

  describe("Error Handling", () => {
    it("should handle internal errors gracefully", async () => {
      // Mock getConfig to throw an error
      const testError = new Error("Simulated config fetch error");
      vi.mocked(getConfig).mockRejectedValue(testError);

      const request = createMockRequest();
      const response = await GET(request);

      expect(response.status).toBe(500);

      const data = await getResponseData<ConfigResponse>(response);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
      expect(data.error!.code).toBe("CONFIG_FETCH_ERROR");
      expect(data.error!.message).toBe("Simulated config fetch error");
    });
  });
});
