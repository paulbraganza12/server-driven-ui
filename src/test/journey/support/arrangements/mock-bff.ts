import { UIConfiguration } from "@/app/domain/ui/config-types";

export class MockBff {
  public respondsWithConfigSuccess(config: UIConfiguration) {
    cy.task("mockApiResponse", {
      path: "/api/ui-config",
      data: {
        success: true,
        data: config,
      },
      statusCode: 200,
    });
  }

  public respondsWithConfigError(message: string = "API Error") {
    cy.task("mockApiErrorResponse", {
      path: "/api/ui-config",
      data: {
        success: false,
        error: {
          code: "CONFIG_FETCH_ERROR",
          message,
        },
      },
      statusCode: 500,
    });
  }

  public respondsWithFormSubmissionSuccess(config: UIConfiguration) {
    cy.task("mockApiPostResponse", {
      path: "/api/submit",
      data: {
        success: true,
        data: config,
      },
      statusCode: 200,
    });
  }

  public reset() {
    cy.task("resetApiMocks");
  }
}
