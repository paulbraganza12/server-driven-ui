import { ConfigResponse } from "../domain/ui/config-types";

export interface UIConfigurationService {
  getConfig: () => Promise<ConfigResponse>;
}

export class HttpUIConfigurationService implements UIConfigurationService {
  constructor(private readonly baseUrl: string = "http://localhost:3000") {
    this.baseUrl = baseUrl;
  }

  async getConfig(): Promise<ConfigResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ui-config`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ConfigResponse = await response.json();
        return {
          success: false,
          error: {
            code: errorData.error?.code || "SERVER_ERROR",
            message: "Failed to fetch UI configuration",
          },
        };
      }

      const data: ConfigResponse = await response.json();

      return {
        success: true,
        data: data.data,
      };
    } catch (_error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Network error",
        },
      };
    }
  }
}

export const uiConfigService = new HttpUIConfigurationService();
