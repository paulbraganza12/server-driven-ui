import { when } from "../support/actions";
import { then } from "../support/assertions";
import { configWithNameAndEmail, formDataWithNameAndEmail } from "../support/data";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  TextComponent,
} from "@/app/domain/ui/config-types";
import { randomConfigResponse } from "../../test-support/http-ui-config-service";
import { given } from "../support/arrangements";

describe("Component Screen", () => {
  beforeEach(() => {
    // Reset API mocks before each test
    cy.task("resetApiMocks");
  });

  it("should load the form from the server response and should submit the form with name and email values", () => {
    // Set up the mock API responses
    cy.task("mockApiResponse", {
      path: "/api/ui-config",
      data: randomConfigResponse({
        data: configWithNameAndEmail,
        success: true,
      }),
      statusCode: 200,
    });

    when().launchApp((componentScreenRobot) => {
      componentScreenRobot.entersForm(
        configWithNameAndEmail.components[0] as FormComponent,
        formDataWithNameAndEmail,
      );
    });

    then().onComponentScreen((screen) => {
      screen.seesForm(configWithNameAndEmail.components[0] as FormComponent);
      screen.seesText(
        (configWithNameAndEmail.components[0] as FormComponent).children[0] as TextComponent,
      );
      screen.seesInput(
        (configWithNameAndEmail.components[0] as FormComponent).children[1] as InputComponent,
      );
      screen.seesInput(
        (configWithNameAndEmail.components[0] as FormComponent).children[2] as InputComponent,
      );
      screen.seesButton(
        (configWithNameAndEmail.components[0] as FormComponent).children[3] as ButtonComponent,
      );
    });
  });

  it("should able to retry fetching the config", () => {
    // Set up the mock API responses
    cy.task("mockApiErrorResponse", {
      path: "/api/ui-config",
      message: "Failed to fetch UI configuration",
      statusCode: 500,
    });

    given().withBff((bff) => {
      bff.respondsWithConfigSuccess(configWithNameAndEmail);
    });

    when().launchApp((componentScreenRobot) => {
      componentScreenRobot.seesUIRetryError();
      componentScreenRobot.clicksRetryButton();
    });

    then().onComponentScreen((screen) => {
      screen.seesForm(configWithNameAndEmail.components[0] as FormComponent);
      screen.seesText(
        (configWithNameAndEmail.components[0] as FormComponent).children[0] as TextComponent,
      );
      screen.seesInput(
        (configWithNameAndEmail.components[0] as FormComponent).children[1] as InputComponent,
      );
    });
  });
});
