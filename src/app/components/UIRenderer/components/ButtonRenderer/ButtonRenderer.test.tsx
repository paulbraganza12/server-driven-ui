import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonRenderer } from "./ButtonRenderer";
import { ButtonComponent } from "@/app/domain/ui/config-types";

describe("ButtonRenderer", () => {
  it("should render button with text and handle click events", () => {
    const mockOnClick = vi.fn();
    const component: ButtonComponent = {
      id: "test-button",
      type: "button",
      text: "Click Me",
      action: "submit",
      ariaLabel: "Test button",
    };

    render(<ButtonRenderer component={component} onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeDefined();
    expect(button.textContent).toBe("Click Me");
    expect(button.getAttribute("id")).toBe("button-test-button");
    expect(button.getAttribute("type")).toBe("submit");

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should handle different button types and disabled state", () => {
    const mockOnClick = vi.fn();

    // Test reset button
    const resetComponent: ButtonComponent = {
      id: "reset-btn",
      type: "button",
      text: "Reset",
      action: "reset",
    };

    render(<ButtonRenderer component={resetComponent} onClick={mockOnClick} />);

    const resetButton = screen.getByText("Reset");
    expect(resetButton.getAttribute("type")).toBe("reset");

    // Test disabled button
    const disabledComponent: ButtonComponent = {
      id: "disabled-btn",
      type: "button",
      text: "Disabled",
      disabled: true,
    };

    render(<ButtonRenderer component={disabledComponent} onClick={mockOnClick} />);

    const disabledButton = screen.getByText("Disabled");
    expect(disabledButton.getAttribute("disabled")).toBe("");

    // Click should not call onClick when disabled
    fireEvent.click(disabledButton);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  it("should work without onClick handler", () => {
    const component: ButtonComponent = {
      id: "no-handler",
      type: "button",
      text: "No Handler",
    };

    render(<ButtonRenderer component={component} />);

    const button = screen.getByText("No Handler");
    expect(button).toBeDefined();
    expect(button.getAttribute("type")).toBe("button");

    // Should not throw error when clicked without handler
    fireEvent.click(button);
  });
});
