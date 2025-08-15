import { NextRequest, NextResponse } from "next/server";
import { ConfigResponse } from "@/app/domain/ui/config-types";
import { getConfig } from "./config";

export const GET = async (_request: NextRequest): Promise<NextResponse<ConfigResponse>> => {
  try {
    const config = await getConfig();

    const response: ConfigResponse = {
      success: true,
      data: config,
    };

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    const errorResponse: ConfigResponse = {
      success: false,
      error: {
        code: "CONFIG_FETCH_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
