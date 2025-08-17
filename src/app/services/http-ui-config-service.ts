import { ConfigResponse } from "../domain/ui/config-types";
import { FormSubmissionMethod } from "../domain/ui/form-types";

export interface UIConfigurationService {
  getConfig: () => Promise<ConfigResponse>;
  submitForm: (
    formData: Record<string, unknown>,
    submitUrl: string,
    method: "POST" | "PUT" | "PATCH",
  ) => Promise<ConfigResponse>;
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
            message: errorData.error?.message || "Failed to fetch UI configuration",
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

  async submitForm(
    formData: Record<string, unknown>,
    submitUrl: string,
    method: FormSubmissionMethod,
  ): Promise<ConfigResponse> {
    try {
      const response = await fetch(submitUrl, {
        method,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData: ConfigResponse = await response.json();
        return {
          success: false,
          error: {
            code: errorData.error?.code || "SERVER_ERROR",
            message: errorData.error?.message || "Failed to submit form",
          },
        };
      }

      const data: ConfigResponse = await response.json();

      return {
        success: true,
        data: data.data,
      };
    } catch (error) {
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
