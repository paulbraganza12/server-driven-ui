import { UIComponent } from "@/app/domain/ui";
import { DropdownRenderer } from "./components/DropdownRenderer";
import { InputRenderer } from "./components/InputRenderer";
import { TextRenderer } from "./components/TextRenderer";
import { ButtonRenderer } from "./components/ButtonRenderer";

export class ComponentFactory {
  static createComponent(component: UIComponent) {
    switch (component.type) {
      case "text":
        return <TextRenderer component={component} />;
      case "input":
        return <InputRenderer component={component} />;
      case "dropdown":
        return <DropdownRenderer component={component} />;
      case "button":
        return <ButtonRenderer component={component} />;
      default:
        console.log(`Unknown component type: ${component.type}`);
        return null;
    }
  }
}
