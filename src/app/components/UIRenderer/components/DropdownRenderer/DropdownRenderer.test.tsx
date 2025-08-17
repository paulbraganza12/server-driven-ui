import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DropdownRenderer } from "./DropdownRenderer";
import { DropdownComponent } from "@/app/domain/ui/config-types";

describe("DropdownRenderer", () => {
  it("should render dropdown with options and handle selection", () => {
    const mockOnChange = vi.fn();
    const component: DropdownComponent = {
      id: "test-dropdown",
      type: "dropdown",
      placeholder: "Choose an option",
      ariaLabel: "Test dropdown",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
      defaultValue: "option1",
      required: true,
    };

    render(<DropdownRenderer component={component} onChange={mockOnChange} />);

    const select = screen.getByLabelText("Test dropdown");
    expect(select).toBeDefined();
    expect(select.getAttribute("id")).toBe("select-test-dropdown");
    expect(select.getAttribute("name")).toBe("test-dropdown");
    expect((select as HTMLSelectElement).value).toBe("option1");
    expect(select.getAttribute("required")).toBe("");

    // Check that all options are rendered
    expect(screen.getByText("Option 1")).toBeDefined();
    expect(screen.getByText("Option 2")).toBeDefined();
    expect(screen.getByText("Option 3")).toBeDefined();

    // Test onChange functionality
    fireEvent.change(select, { target: { value: "option2" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("should handle placeholder and default empty state", () => {
    const component: DropdownComponent = {
      id: "empty-dropdown",
      type: "dropdown",
      placeholder: "Select something",
      options: [
        { value: "test1", label: "Test 1" },
        { value: "test2", label: "Test 2" },
      ],
    };

    render(<DropdownRenderer component={component} />);

    const select = document.querySelector("#select-empty-dropdown") as HTMLSelectElement;
    expect(select).toBeDefined();
    expect(select.value).toBe("");

    // Check placeholder option exists
    const placeholderOption = screen.getByText("Select something");
    expect(placeholderOption).toBeDefined();
    expect((placeholderOption as HTMLOptionElement).disabled).toBe(true);
    expect((placeholderOption as HTMLOptionElement).hidden).toBe(true);
  });
});
