import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { FormRenderer } from "./FormRenderer";
import {
  FormComponent,
  TextComponent,
  ButtonComponent,
  InputComponent,
} from "@/app/domain/ui/config-types";
import { uiConfigService } from "@/app/services";

// Mock the service
vi.mock("@/app/services", () => ({
  uiConfigService: {
    submitForm: vi.fn(),
  },
}));

const mockUIConfigService = vi.mocked(uiConfigService);

describe("FormRenderer", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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

    render(<FormRenderer component={component} />);

    const form = document.querySelector("#contact-form");
    expect(form).toBeDefined();
    expect(form?.getAttribute("id")).toBe("contact-form");
    expect(form?.getAttribute("ariaLabel")).toBe("Contact form");

    // Check that children are rendered via ComponentFactory
    expect(screen.getByText("Contact Form")).toBeDefined();
    expect(screen.getByText("Submit")).toBeDefined();
  });

  it("should handle form submission", () => {
    // Mock the service to return a successful response
    mockUIConfigService.submitForm.mockResolvedValue({ success: true });

    const component: FormComponent = {
      id: "contact-form",
      type: "form",
      children: [
        {
          id: "name-input",
          type: "input",
          placeholder: "Enter your name",
          required: true,
          name: "name",
        } as InputComponent,
        {
          id: "email-input",
          type: "input",
          placeholder: "Enter your email",
          required: true,
          name: "email",
        } as InputComponent,
        {
          id: "submit-btn",
          type: "button",
          text: "Submit",
          action: "submit",
        },
      ],
      submitUrl: "https://example.com/api/form",
      method: "POST",
      ariaLabel: "Contact form",
    };

    render(<FormRenderer component={component} />);

    const form = document.querySelector("#contact-form");
    expect(form).toBeDefined();
    expect(form?.getAttribute("id")).toBe("contact-form");
    expect(form?.getAttribute("ariaLabel")).toBe("Contact form");

    const nameInput = screen.getByPlaceholderText("Enter your name");
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitBtn = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

    fireEvent.click(submitBtn);

    expect(mockUIConfigService.submitForm).toHaveBeenCalledWith(
      {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      "https://example.com/api/form",
      "POST",
    );
  });
});
