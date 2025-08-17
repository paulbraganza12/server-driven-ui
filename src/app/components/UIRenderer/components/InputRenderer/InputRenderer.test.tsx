import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { InputRenderer } from "./InputRenderer";
import { InputComponent } from "@/app/domain/ui/config-types";

describe("InputRenderer", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render input with basic properties and handle user interaction", () => {
    const mockOnChange = vi.fn();
    const component: InputComponent = {
      id: "test-input",
      type: "input",
      placeholder: "Enter text here",
      defaultValue: "Initial value",
      required: true,
      ariaLabel: "Test input field",
      className: "custom-input",
    };

    render(<InputRenderer component={component} onChange={mockOnChange} />);

    const input = screen.getByLabelText("Test input field");
    expect(input).toBeDefined();
    expect(input.getAttribute("id")).toBe("input-test-input");
    expect(input.getAttribute("placeholder")).toBe("Enter text here");
    expect(input.getAttribute("type")).toBe("text");
    expect((input as HTMLInputElement).defaultValue).toBe("Initial value");
    expect(input.getAttribute("required")).toBe("");

    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });

  it("should handle validation and styling correctly", () => {
    const component: InputComponent = {
      id: "validation-input",
      type: "input",
      validation: {
        minLength: 2,
        maxLength: 50,
      },
      className: "validation-class",
    };

    render(<InputRenderer component={component} />);

    const container = document.querySelector(".space-y-1");
    expect(container).toBeDefined();
    expect(container?.className).toContain("validation-class");

    const input = document.querySelector("#input-validation-input") as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.className).toContain("block");
    expect(input.className).toContain("w-full");
    expect(input.className).toContain("rounded-md");
    expect(input.className).toContain("border");
  });
});
