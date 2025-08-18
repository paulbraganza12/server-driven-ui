# UIRenderer Component Documentation

The UIRenderer is the core component responsible for dynamically rendering user interfaces based on server-provided configuration. It orchestrates the entire rendering process and handles all component lifecycle management.

## 🎯 Overview

The UIRenderer component:

- Fetches UI configuration from the server
- Manages loading, error, and success states
- Dynamically creates and renders components
- Provides retry mechanisms for failed requests
- Handles component interactions and form submissions

### UIRenderer.tsx

**Props:**

```typescript
type Props = {
  initialConfigResponse: ConfigResponse;
};
```

**Key Features:**

- Server-side initial config loading
- Client-side retry functionality
- Error boundary handling
- Loading state management

### ComponentFactory.tsx

Factory pattern implementation for component creation.

**Supported Component Types:**

- `text` → TextRenderer
- `input` → InputRenderer
- `dropdown` → DropdownRenderer
- `button` → ButtonRenderer
- `form` → FormRenderer

**Usage:**

```typescript
ComponentFactory.createComponent(component);
```

## 📝 Component Renderers

### TextRenderer

Renders static text content with styling support.

**Configuration:**

```json
{
  "id": "welcome-text",
  "type": "text",
  "content": "Welcome to our form",
  "className": "text-2xl font-bold",
  "ariaLabel": "Welcome message"
}
```

### InputRenderer

Renders text input fields with validation.

**Configuration:**

```json
{
  "id": "email-input",
  "type": "input",
  "placeholder": "Enter your email",
  "required": true,
  "ariaLabel": "Email input field",
  "validation": {
    "minLength": 3,
    "maxLength": 100
  }
}
```

### DropdownRenderer

Renders select dropdowns with options.

**Configuration:**

```json
{
  "id": "country-select",
  "type": "dropdown",
  "placeholder": "Select country",
  "required": true,
  "options": [
    { "value": "us", "label": "United States" },
    { "value": "ca", "label": "Canada" }
  ]
}
```

### ButtonRenderer

Renders action buttons with different types.

**Configuration:**

```json
{
  "id": "submit-btn",
  "type": "button",
  "text": "Submit Form",
  "action": "submit",
  "className": "bg-blue-500 text-white px-4 py-2 rounded"
}
```

### FormRenderer

Renders form containers that handle submission.

**Configuration:**

```json
{
  "id": "contact-form",
  "type": "form",
  "title": "Contact Us",
  "submitUrl": "/api/submit",
  "method": "POST",
  "children": [...]
}
```

## 🔄 Data Flow

1. **Initial Load**: Server-side rendering with initial config
2. **Component Creation**: ComponentFactory creates appropriate renderers
3. **User Interaction**: Components handle user input and events
4. **Form Submission**: FormRenderer collects and submits data
5. **Error Handling**: Retry component allows config refetching

## 🎨 Styling System

All components use Tailwind CSS with a consistent design system:

- **Utility Function**: `cn()` for class merging
- **Base Classes**: Consistent spacing, colors, and typography
- **Responsive Design**: Mobile-first approach
- **Custom Classes**: Support for configuration-provided classes

## 🧪 Testing Strategy

### Unit Tests

Each component renderer has comprehensive unit tests:

- Props handling
- User interactions
- Styling application
- Accessibility attributes

### Integration Tests

- Full rendering pipeline
- Error state handling
- Retry functionality
- Form submission flow

### Test Files

- `UIRenderer.test.tsx` - Main component tests
- `component.factory.test.tsx` - Factory pattern tests
- `components/*/[Component].test.tsx` - Individual component tests

## 🔧 Configuration Examples

### Simple Form

```json
{
  "version": "1.0.0",
  "components": [
    {
      "id": "simple-form",
      "type": "form",
      "submitUrl": "/api/submit",
      "children": [
        {
          "id": "name",
          "type": "input",
          "placeholder": "Your name",
          "required": true
        },
        {
          "id": "submit",
          "type": "button",
          "text": "Submit",
          "action": "submit"
        }
      ]
    }
  ]
}
```

### Complex Form with Validation

```json
{
  "version": "1.0.0",
  "components": [
    {
      "id": "registration-form",
      "type": "form",
      "title": "User Registration",
      "submitUrl": "/api/users",
      "method": "POST",
      "children": [
        {
          "id": "title",
          "type": "text",
          "content": "Create Account",
          "className": "text-xl font-semibold mb-4"
        },
        {
          "id": "email",
          "type": "input",
          "placeholder": "Email address",
          "required": true,
          "ariaLabel": "Email input",
          "validation": {
            "minLength": 5,
            "maxLength": 100
          }
        },
        {
          "id": "country",
          "type": "dropdown",
          "placeholder": "Select country",
          "required": true,
          "options": [
            { "value": "us", "label": "United States" },
            { "value": "uk", "label": "United Kingdom" }
          ]
        },
        {
          "id": "register",
          "type": "button",
          "text": "Create Account",
          "action": "submit",
          "className": "bg-green-600 text-white px-6 py-3 rounded-lg"
        }
      ]
    }
  ]
}
```

## 🔧 Extending UIRenderer

### Adding New Component Types

1. **Define Type Interface:**

```typescript
// In config-types.ts
export interface CustomComponent extends BaseComponent {
  type: "custom";
  customProp: string;
}

// Add to UIComponent union
export type UIComponent = ... | CustomComponent;
```

2. **Create Component Renderer:**

```typescript
// In components/CustomRenderer/CustomRenderer.tsx
export const CustomRenderer = ({ component }: Props) => {
  // Implementation
};
```

3. **Update ComponentFactory:**

```typescript
// In component.factory.tsx
case "custom":
  return <CustomRenderer component={component} key={component.id} />;
```

4. **Add Tests:**

```typescript
// In CustomRenderer.test.tsx
describe("CustomRenderer", () => {
  // Test cases
});
```

### Best Practices

- **Type Safety**: Always use TypeScript interfaces
- **Accessibility**: Include ARIA labels and proper semantics
- **Testing**: Write comprehensive unit and integration tests
- **Documentation**: Update this README with new component details
- **Styling**: Follow existing Tailwind patterns
- **Error Handling**: Implement proper error boundaries
- **Cross-Site Scripting** checks

---
