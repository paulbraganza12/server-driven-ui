import { describe, it, expect, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../test/setup";
import { HttpUIConfigurationService } from "./http-ui-config-service";
import { ConfigResponse, UIConfiguration } from "../domain/ui/config-types";
import * as testConfigService from "../../test/test-support/http-ui-config-service";

describe("HttpUIConfigurationService", () => {
  const baseUrl = "http://localhost:3000";
  let service: HttpUIConfigurationService;

  beforeEach(() => {
    service = new HttpUIConfigurationService(baseUrl);
  });

  describe("getConfig", () => {
    it("should return successful response when API returns valid data", async () => {
      const configResponse = testConfigService.randomConfigResponse();
      server.use(testConfigService.getConfigSuccess(configResponse));

      const result = await service.getConfig();

      expect(result).toEqual({
        success: true,
        data: configResponse.data,
      });
    });

    it("should handle HTTP error responses (404, 500, etc.) without error body", async () => {
      server.use(testConfigService.getConfigError({ status: 404 }));

      const result = await service.getConfig();

      expect(result).toEqual({
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Network error",
        },
      });
    });

    it("should handle server errors with JSON response (500 + body)", async () => {
      const errorResponse: ConfigResponse = {
        success: false,
        error: {
          code: "CONFIG_FETCH_ERROR",
          message: "Server configuration error",
        },
      };

      server.use(testConfigService.getConfigError({ status: 500, response: errorResponse }));

      const result = await service.getConfig();

      expect(result).toEqual({
        success: false,
        error: {
          code: "CONFIG_FETCH_ERROR",
          message: "Failed to fetch UI configuration",
        },
      });
    });

    it("should handle complex UI configuration with all component types", async () => {
      const complexUIConfig: UIConfiguration = {
        version: "2.0.0",
        components: [
          {
            id: "form-1",
            type: "form",
            title: "Contact Form",
            children: [
              {
                id: "text-1",
                type: "text",
                content: "Please fill out the form below",
                className: "text-lg font-bold",
              },
              {
                id: "input-1",
                type: "input",
                placeholder: "Full Name",
                required: true,
                validation: {
                  maxLength: 100,
                  minLength: 1,
                },
              },
              {
                id: "dropdown-1",
                type: "dropdown",
                placeholder: "Select Country",
                options: [
                  { label: "United States", value: "us" },
                  { label: "Canada", value: "ca" },
                  { label: "United Kingdom", value: "uk" },
                ],
                defaultValue: "us",
              },
              {
                id: "button-1",
                type: "button",
                text: "Submit",
                action: "submit",
                disabled: false,
              },
            ],
          },
        ],
      };

      const mockResponse: ConfigResponse = {
        success: true,
        data: complexUIConfig,
      };

      server.use(
        http.get(`${baseUrl}/api/ui-config`, () => {
          return HttpResponse.json(mockResponse);
        }),
      );

      const result = await service.getConfig();

      expect(result).toEqual({
        success: true,
        data: complexUIConfig,
      });
      expect(result.data?.components).toHaveLength(1);
      expect(result.data?.components[0].type).toBe("form");
      if (result.data?.components[0].type === "form") {
        expect(result.data.components[0].children).toHaveLength(4);
      }
    });
  });
});
