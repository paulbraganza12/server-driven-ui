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
});
