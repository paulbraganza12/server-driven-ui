import { getLocal } from "mockttp";

export class MockApiServer {
  private server = getLocal();

  async start() {
    await this.server.start(3001); // Start mock server on port 3001
    console.log("Mock API server started on port 3001");
  }

  async stop() {
    await this.server.stop();
    console.log("Mock API server stopped");
  }

  reset() {
    this.server.reset();
  }

  mockResponse({
    path,
    data,
    statusCode = 200,
  }: {
    path: string;
    data: unknown;
    statusCode?: number;
  }) {
    this.server.forGet(path).thenJson(statusCode, data as object);
  }

  mockPostResponse({
    path,
    data,
    statusCode = 200,
  }: {
    path: string;
    data: unknown;
    statusCode?: number;
  }) {
    this.server.forPost(path).thenJson(statusCode, data as object);
  }

  mockErrorResponse({
    path,
    message,
    statusCode = 500,
  }: {
    path: string;
    message: string;
    statusCode?: number;
  }) {
    this.server
      .forAnyRequest()
      .matching((req) => req.url.includes(path))
      .thenJson(statusCode, {
        success: false,
        error: {
          code: "API_ERROR",
          message,
        },
      });
  }
}
