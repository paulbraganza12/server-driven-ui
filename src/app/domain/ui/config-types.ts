// Core component types
export type ComponentType = "text" | "input" | "form" | "dropdown" | "button";

// Base component interface that all components extend
export interface BaseComponent {
  id: string;
  type: ComponentType;
  className?: string;
  ariaLabel?: string;
  required?: boolean;
}

// Text component implementation
export interface TextComponent extends BaseComponent {
  type: "text";
  content: string;
}

// Input component for text field
export interface InputComponent extends BaseComponent {
  type: "input";
  placeholder?: string;
  defaultValue?: string;
  validation?: {
    maxLength?: number;
    minLength?: number;
  };
}

// Dropdown component for select options
export interface DropdownComponent extends BaseComponent {
  type: "dropdown";
  options: Array<{
    label: string;
    value: string;
  }>;
  defaultValue?: string;
  placeholder?: string;
}

// Button component for form submission and actions
export interface ButtonComponent extends BaseComponent {
  type: "button";
  text: string;
  action?: "submit" | "reset" | "custom";
  disabled?: boolean;
}

// Union type for all possible components
export type UIComponent =
  | TextComponent
  | InputComponent
  | FormComponent
  | DropdownComponent
  | ButtonComponent;

// Form component that wraps and handles form submission
export interface FormComponent extends BaseComponent {
  type: "form";
  title?: string;
  children: UIComponent[];
}

export type ConfigResponse = {
  success: boolean;
};
