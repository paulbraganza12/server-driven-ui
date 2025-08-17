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
        return (
          <div
            key={component.id}
            className="p-2 bg-red-100 text-red-700 border border-red-300 rounded"
          >
            Unknown component type : {component.type}
          </div>
        );
    }
  }
}
