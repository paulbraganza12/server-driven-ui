import { NextRequest, NextResponse } from "next/server";
import { ConfigResponse } from "@/app/domain/ui/config-types";

export const GET = async (_request: NextRequest): Promise<NextResponse<ConfigResponse>> => {
  return NextResponse.json({
    success: true,
  });
};
