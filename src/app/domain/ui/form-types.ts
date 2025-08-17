export type FormData = Record<string, unknown>;

export type FormSubmissionMethod = "POST" | "PUT" | "PATCH";

export interface FormSubmissionResponse {
  success: boolean;
  data?: FormData;
  error?: {
    code: string;
    message: string;
  };
}

export interface FormSubmissionRequest {
  formData: FormData;
  submitUrl: string;
  method: FormSubmissionMethod;
}
