import { NextRequest, NextResponse } from "next/server";
import { FormSubmissionResponse } from "@/app/domain/ui/form-types";

export const POST = async (request: NextRequest): Promise<NextResponse<FormSubmissionResponse>> => {
  try {
    const body = await request.json();
    console.log(body);
    const response: FormSubmissionResponse = {
      success: true,
      data: body,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorResponse: FormSubmissionResponse = {
      success: false,
      error: { code: "SUBMISSION_ERROR", message: errorMessage },
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
