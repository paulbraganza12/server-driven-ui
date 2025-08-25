import { UIConfiguration } from "@/app/domain/ui/config-types";
import { Interception } from "../cypress";

export const getConfigSuccess = (config: UIConfiguration): Interception => {
  return createConfigResponse(200, {
    success: true,
    data: config,
  });
};

export const getConfigError = (): Interception => {
  return createConfigResponse(500, {
    success: false,
    error: { code: "API_ERROR", message: "API Error" },
  });
};

export const createConfigResponse = (statusCode: number, body: unknown): Interception => {
  return {
    id: "get-config",
    method: "GET",
    path: "/api/ui-config",
    response: {
      body: body,
      statusCode: statusCode,
    },
  };
};
