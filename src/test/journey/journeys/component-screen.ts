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
});
