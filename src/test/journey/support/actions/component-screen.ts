import {
  ButtonComponent,
  DropdownComponent,
  InputComponent,
  FormComponent,
  TextComponent,
} from "@/app/domain/ui/config-types";
import { getById, getByLabelText, getByTestId } from "../cypress";

export class ComponentScreenRobot {
  // Enter form data into the form
  entersForm(form: FormComponent, formData: Record<string, string>) {
    this.seesForm(form);
    form.children.forEach((child) => {
      switch (child.type) {
        case "input":
          this.fillsInput(child, formData);
          break;
        case "button":
          this.clicksButton(child);
          break;
        case "dropdown":
          this.selectsOption(child, formData);
          break;
        case "text":
          this.seesText(child);
          break;
      }
    });
  }

  seesUIRetryError() {
    getByTestId("ui-retry").should("exist");
  }

  clicksRetryButton() {
    getByLabelText("Retry").click();
  }

  // See if the form exists
  seesForm(form: FormComponent) {
    getById(form.id).should("exist");
  }

  // Fill in an input
  fillsInput(input: InputComponent, formData: Record<string, string>) {
    getById(`input-${input.id}`).type(formData[input.id] || "");
  }

  // Click a button
  clicksButton(button: ButtonComponent) {
    getById(`button-${button.id}`).click();
  }

  // Select an option from a dropdown
  selectsOption(dropdown: DropdownComponent, formData: Record<string, string>) {
    getById(`select-${dropdown.id}`).select(formData[dropdown.id] || "");
  }

  // See if the text exists
  seesText(text: TextComponent) {
    getById(`text-${text.id}`).should("have.text", text.content);
  }
}
