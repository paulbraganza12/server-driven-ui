import {
  ButtonComponent,
  DropdownComponent,
  FormComponent,
  InputComponent,
  TextComponent,
} from "@/app/domain/ui/config-types";
import { getById } from "../cypress";

export class ComponentScreenAssertions {
  seesForm(form: FormComponent) {
    getById(form.id).should("exist");
  }

  seesInput(input: InputComponent) {
    getById(`input-${input.id}`).should("exist");
  }

  seesButton(button: ButtonComponent) {
    getById(`button-${button.id}`).should("exist");
  }

  seesDropdown(dropdown: DropdownComponent) {
    getById(`select-${dropdown.id}`).should("exist");
  }

  seesText(text: TextComponent) {
    getById(`text-${text.id}`).should("exist");
  }
}
