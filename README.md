# Server-Driven UI System

Server-driven UI system built with Next.js, TypeScript, and React. This system dynamically renders forms and UI components based entirely on configuration data provided by backend endpoints.

## What This System Does

This application renders dynamic user interfaces based on JSON configuration received from an API. Instead of hardcoding UI components, the system:

- Fetches UI configuration from `/api/ui-config`
- Dynamically renders forms with text, inputs, dropdowns, and buttons
- Handles form submissions to `/api/submit`
- Provides comprehensive error handling and retry mechanisms
- Supports accessibility features and responsive design

### Core Components:

- **UIRenderer**: Main orchestrator that fetches config and renders components
- **ComponentFactory**: Creates appropriate component instances based on config
- **Component Renderers**: Individual renderers for Text, Input, Dropdown, Button, Form
- **HttpUIConfigurationService**: Handles API communication with error handling

## 🛠️ Deps

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and consistent design system easy to add styling in the configuration
- **clsx & tailwind-merge**: Smart class composition utilities that handle conditional classes and resolve Tailwind conflicts

### Testing Strategy

- **Mock Service Worker (MSW)**: Intercepts network requests at the service worker level for reliable, non-flaky API mocking
- **React Testing Library**: Component testing with focus on user behavior rather than implementation details
- **Vitest**: Fast, modern test runner with excellent TypeScript support

### Why These Choices?

**Tailwind CSS + clsx**: Enables rapid prototyping while maintaining design consistency. The utility classes make it easy to implement designs from configuration without writing custom CSS.

**Mock Service Worker**: Unlike traditional mocking approaches that can be brittle, MSW intercepts requests at the network level, making tests more realistic and less prone to breaking when implementation details change.

## 📦 Installation & Setup

### Prerequisites

- Node.js 20.12.2 (recommended - see `.nvmrc` file)
- npm, yarn, or pnpm

### Installation Steps

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd server-driven-ui
nvm use
# or if you don't have this version installed:
nvm install
npm install
```

2. **Start development server:**

```bash
npm run dev
```

3. **Open application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run format       # Check code formatting
```

## 📁 Folder Structure

```
src/
├── app/
│   ├── api/                   # API routes
│   │   ├── ui-config/         # UI configuration endpoint
│   │   └── submit/            # Form submission endpoint
│   ├── components/            # React components
│   │   ├── UIRenderer/        # Main UI rendering system
│   │   │   ├── components/    # Individual component renderers
│   ├── domain/                # Domain types and interfaces
│   │   └── ui/                # UI-specific types
│   ├── lib/                   # Utility functions
│   └── services/              # API services
├── schema/                    # JSON schema examples
└── test/                      # Test configuration and utilities
    └── test-support/          # Test helper functions
```

## 🎨 UIRenderer Component

The UIRenderer is the heart of the system, responsible for:

- Fetching UI configuration from the API
- Handling loading and error states
- Dynamically rendering components based on configuration

**[📖 Detailed UIRenderer Documentation](src/app/components/UIRenderer/README.md)**

### Supported Components:

- **Text**: Static labels and paragraphs
- **Input**: Text fields with validation
- **Dropdown**: Select menus with options
- **Button**: Form submission and action buttons
- **Form**: Container that handles form submission

## 🔧 Configuration Format

The system expects configuration in this format:

```json
{
  "version": "1.0.0",
  "components": [
    {
      "id": "contact-form",
      "type": "form",
      "title": "Contact Us",
      "submitUrl": "/api/submit",
      "method": "POST",
      "children": [
        {
          "id": "name-input",
          "type": "input",
          "placeholder": "Enter your name",
          "required": true,
          "ariaLabel": "Name input field"
        }
      ]
    }
  ]
}
```

**Styling with Tailwind**: Components support `className` properties for Tailwind utility classes. The `cn()` utility (clsx + tailwind-merge) handles conditional classes and resolves conflicts:

```json
{
  "id": "submit-button",
  "type": "button",
  "text": "Submit",
  "className": "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
}
```

## 🧪 Testing

The project includes comprehensive testing with a focus on reliability:

- **Unit Tests**: All components and services tested with React Testing Library
- **Integration Tests**: API routes and form submission flows tested end-to-end
- **MSW (Mock Service Worker)**: Network-level request mocking that doesn't break when implementation changes
- **Test Coverage**: Components, services, and API endpoints all covered

Run tests:

```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
```

### Performance Considerations

- Components are rendered on-demand based on configuration
- Error boundaries prevent crashes from malformed configurations
- Retry mechanisms handle temporary network issues
- TypeScript ensures type safety in production

## 📈 Extending the System

To add new component types:

1. Define the component interface in `src/app/domain/ui/config-types.ts`
2. Create the renderer in `src/app/components/UIRenderer/components/`
3. Add the case to `ComponentFactory`
4. Write comprehensive tests
5. Update documentation
