import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { FormRenderer } from "./FormRenderer";
import { FormComponent, TextComponent, ButtonComponent } from "@/app/domain/ui/config-types";

describe("FormRenderer", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render form with children and handle submission", () => {
    const textChild: TextComponent = {
      id: "form-title",
      type: "text",
      content: "Contact Form",
    };

    const buttonChild: ButtonComponent = {
      id: "submit-btn",
      type: "button",
      text: "Submit",
      action: "submit",
    };

    const component: FormComponent = {
      id: "contact-form",
      type: "form",
      title: "Contact Us",
      children: [textChild, buttonChild],
      className: "contact-form-class",
      ariaLabel: "Contact form",
    };

    render(<FormRenderer components={component} />);

    const form = document.querySelector("#contact-form");
    expect(form).toBeDefined();
    expect(form?.getAttribute("id")).toBe("contact-form");
    expect(form?.getAttribute("ariaLabel")).toBe("Contact form");

    // Check that children are rendered via ComponentFactory
    expect(screen.getByText("Contact Form")).toBeDefined();
    expect(screen.getByText("Submit")).toBeDefined();
  });
});
