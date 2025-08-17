import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { TextRenderer } from "./TextRenderer";
import { TextComponent } from "@/app/domain/ui/config-types";

describe("TextRenderer", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render text content as div with default classes", () => {
    const component: TextComponent = {
      id: "text-1",
      type: "text",
      content: "Hello, World!",
    };

    render(<TextRenderer component={component} />);

    const element = screen.getByText("Hello, World!");
    expect(element).toBeDefined();
    expect(element.tagName).toBe("DIV");
    expect(element.className).toContain("text-sm");
    expect(element.className).toContain("text-gray-900");
  });

  it("should spread component attributes correctly and exclude content/className", () => {
    const component: TextComponent = {
      id: "test-attributes",
      type: "text",
      content: "Attributes test",
      className: "test-class",
      ariaLabel: "Test label",
      required: true,
    };

    render(<TextRenderer component={component} />);

    const element = screen.getByText("Attributes test");
    expect(element).toBeDefined();

    // Should spread these attributes
    expect(element.getAttribute("id")).toBe("test-attributes");
    expect(element.getAttribute("ariaLabel")).toBe("Test label");
    expect(element.getAttribute("required")).toBe("");

    // Should NOT spread content and className as attributes
    expect(element.getAttribute("content")).toBeNull();
    // className is handled separately by the className prop, not as an attribute
  });
});
