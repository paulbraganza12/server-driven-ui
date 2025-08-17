import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentFactory } from "./component.factory";
import { UIComponent } from "@/app/domain/ui";

describe("ComponentFactory", () => {
  it("should render text component", () => {
    const component: UIComponent = {
      id: "text-1",
      type: "text",
      content: "Test text",
    };

    const result = ComponentFactory.createComponent(component);
    render(result);

    expect(screen.getByText("Test text")).toBeDefined();
  });

  it("should render input component", () => {
    const component: UIComponent = {
      id: "input-1",
      type: "input",
      placeholder: "Test input",
    };

    const result = ComponentFactory.createComponent(component);
    render(result);

    expect(screen.getByPlaceholderText("Test input")).toBeDefined();
  });

  it("should render dropdown component", () => {
    const component: UIComponent = {
      id: "dropdown-1",
      type: "dropdown",
      options: [{ label: "Option 1", value: "1" }],
    };

    const result = ComponentFactory.createComponent(component);
    render(result);

    expect(screen.getByRole("combobox")).toBeDefined();
  });

  it("should render button component", () => {
    const component: UIComponent = {
      id: "button-1",
      type: "button",
      text: "Test button",
    };

    const result = ComponentFactory.createComponent(component);
    render(result);

    expect(screen.getByText("Test button")).toBeDefined();
  });

  it("should render unknown component fallback", () => {
    const component = {
      id: "unknown-1",
      type: "unknown",
    } as unknown as UIComponent;

    const result = ComponentFactory.createComponent(component);
    render(result);

    expect(screen.getByText(/Unknown component type : unknown/)).toBeDefined();
  });
});
