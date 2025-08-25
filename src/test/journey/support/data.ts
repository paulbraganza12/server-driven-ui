import { UIConfiguration } from "@/app/domain/ui/config-types";

export const configWithNameAndEmail: UIConfiguration = {
  version: "1.0.0",
  components: [
    {
      id: "form-1",
      type: "form",
      title: "Contact Us",
      children: [
        {
          id: "form-title",
          type: "text",
          content: "Get in Touch",
          className: "text-2xl font-bold mb-4",
          ariaLabel: "Hello, world!",
        },
        {
          id: "name",
          type: "input",
          placeholder: "Enter your full name",
          required: true,
          ariaLabel: "Full name input field",
        },
        {
          id: "email",
          type: "input",
          placeholder: "Enter your email address",
          required: true,
          ariaLabel: "Email address input field",
        },
        {
          id: "submit-button",
          type: "button",
          text: "Submit",
          className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md",
          ariaLabel: "Submit button",
        },
      ],
      submitUrl: "/api/submit",
      method: "POST",
    },
  ],
};

export const formDataWithNameAndEmail = {
  name: "John Doe",
  email: "john.doe@example.com",
};
