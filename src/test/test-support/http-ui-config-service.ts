import { ConfigResponse, UIComponent, UIConfiguration } from "@/app/domain/ui/config-types";
import { FormSubmissionResponse } from "@/app/domain/ui/form-types";
import { http, HttpResponse } from "msw";

export const url = "http://localhost:3000/api/ui-config";
export const submitUrl = "http://localhost:3000/api/submit";

export const getConfigSuccess = (config: Record<string, unknown>) => {
  return http.get(url, () => {
    return HttpResponse.json(config);
  });
};

export const getConfigError = (options: {
  status?: number;
  response?: ConfigResponse | Record<string, unknown>;
}) => {
  return http.get(url, () => {
    if (options.status && options.status >= 400) {
      if (options.response) {
        return HttpResponse.json(options.response, { status: options.status });
      }
      return new HttpResponse(null, { status: options.status });
    }

    return HttpResponse.json(
      options.response || { success: false, error: { code: "API_ERROR", message: "API Error" } },
    );
  });
};

export const submitFormSuccess = (formData: Record<string, unknown>) => {
  return http.post(submitUrl, () => {
    return HttpResponse.json(formData);
  });
};

export const submitFormError = (options: {
  status?: number;
  response?: Record<string, unknown>;
}) => {
  return http.post(submitUrl, () => {
    if (options.status && options.status >= 400) {
      if (options.response) {
        return HttpResponse.json(options.response, { status: options.status });
      }
      return new HttpResponse(null, { status: options.status });
    }
    return HttpResponse.json(
      options.response || { success: false, error: { code: "API_ERROR", message: "API Error" } },
    );
  });
};

// TODO use faker to generate random form data
export const randomFormSubmissionResponse = (override?: Partial<FormSubmissionResponse>) => {
  return {
    success: true,
    data: randomFormData(),
    ...override,
  };
};

// TODO use faker to generate random form data
export const randomFormData = (override?: Record<string, unknown>) => {
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    ...override,
  };
};

// TODO use faker to generate random config
export const randomConfigResponse = (override?: Partial<ConfigResponse>) => {
  return {
    success: true,
    data: randomUIConfiguration(),
    ...override,
  };
};

// TODO use faker to generate random UI configuration
export const randomUIConfiguration = (override?: Partial<UIConfiguration>) => {
  return {
    version: "1.0.0",
    components: [randomUIComponent()],
    ...override,
  };
};

// TODO use faker to generate random UI component
export const randomUIComponent = (override?: Partial<UIComponent>) => {
  return {
    id: "text-1",
    type: "text",
    content: "Test Content",
    ...override,
  };
};
