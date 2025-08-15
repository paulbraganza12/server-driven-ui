import { UIConfiguration } from "@/app/domain/ui/config-types";

const DEFAULT_CONFIG: UIConfiguration = {
  version: "1.0.0",
  components: [
    {
      id: "contact-form",
      type: "form",
      title: "Contact Us",
      children: [
        {
          id: "form-title",
          type: "text",
          content: "Get in Touch",
          className: "text-2xl font-bold mb-4",
        },
        {
          id: "name-input",
          type: "input",
          placeholder: "Enter your full name",
          required: true,
          ariaLabel: "Full name input field",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
        {
          id: "email-input",
          type: "input",
          placeholder: "Enter your email address",
          required: true,
          ariaLabel: "Email address input field",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
        {
          id: "subject-dropdown",
          type: "dropdown",
          placeholder: "Select a subject",
          required: true,
          ariaLabel: "Subject selection dropdown",
          options: [
            { value: "general", label: "General Inquiry" },
            { value: "support", label: "Technical Support" },
            { value: "sales", label: "Sales Question" },
            { value: "feedback", label: "Feedback" },
          ],
        },
        {
          id: "message-input",
          type: "input",
          placeholder: "Enter your message",
          required: true,
          ariaLabel: "Message input field",
          validation: {
            minLength: 10,
            maxLength: 1000,
          },
        },
        {
          id: "submit-button",
          type: "button",
          text: "Send Message",
          action: "submit",
          ariaLabel: "Submit contact form",
        },
      ],
    },
  ],
};

export const getConfig = async (): Promise<UIConfiguration> => {
  // Simulate some processing time
  await new Promise((resolve) => setTimeout(resolve, 100));

  return DEFAULT_CONFIG;
};
