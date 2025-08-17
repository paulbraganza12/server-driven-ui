import { UIComponent } from "@/app/domain/ui";
import { DropdownRenderer } from "./components/DropdownRenderer";
import { InputRenderer } from "./components/InputRenderer";
import { TextRenderer } from "./components/TextRenderer";
import { ButtonRenderer } from "./components/ButtonRenderer";
import { FormRenderer } from "./components/FormRenderer/FormRenderer";

export class ComponentFactory {
  static createComponent(component: UIComponent) {
    switch (component.type) {
      case "text":
        return <TextRenderer component={component} key={component.id} />;
      case "input":
        return <InputRenderer component={component} key={component.id} />;
      case "dropdown":
        return <DropdownRenderer component={component} key={component.id} />;
      case "button":
        return <ButtonRenderer component={component} key={component.id} />;
      case "form":
        return <FormRenderer component={component} key={component.id} />;
      default:
        console.log(`Unknown component type: ${component}`);
        return null;
    }
  }
}
