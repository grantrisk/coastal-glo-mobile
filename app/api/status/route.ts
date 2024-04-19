import type { NextRequest } from "next/server";
import checkStatus from "../../lib/checkStatus";

export async function GET(request: NextRequest) {
  const currentTime = new Date();
  const status = checkStatus(currentTime);

  return new Response(JSON.stringify({ status }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
