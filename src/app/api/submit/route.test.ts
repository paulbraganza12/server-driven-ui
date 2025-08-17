import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";
import { FormSubmissionResponse } from "@/app/domain/ui/form-types";

const createMockRequest = (
  url: string = "http://localhost:3000/api/submit",
  body: Record<string, unknown> = {},
): NextRequest => {
  return new NextRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const getResponseData = async <T = unknown>(response: Response): Promise<T> => {
  const data = await response.json();
  return data as T;
};

// Mock form data
const mockFormData = {
  name: "John Doe",
  email: "john.doe@example.com",
  message: "Test message",
};

describe("POST /api/submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Success Scenarios", () => {
    it("should return a valid successful response structure", async () => {
      const request = createMockRequest("http://localhost:3000/api/submit", mockFormData);

      const response = await POST(request);

      expect(response.status).toBe(200);

      const data = await getResponseData<FormSubmissionResponse>(response);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.data).toEqual(mockFormData);
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed JSON gracefully", async () => {
      const request = new NextRequest("http://localhost:3000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "invalid-json",
      });

      const response = await POST(request);

      expect(response.status).toBe(500);

      const data = await getResponseData<FormSubmissionResponse>(response);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
      expect(data.error!.code).toBe("SUBMISSION_ERROR");
      expect(data.error!.message).toContain("Unexpected token");
    });

    it("should handle missing request body", async () => {
      const request = new NextRequest("http://localhost:3000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);

      expect(response.status).toBe(500);

      const data = await getResponseData<FormSubmissionResponse>(response);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
      expect(data.error!.code).toBe("SUBMISSION_ERROR");
    });
  });
});
