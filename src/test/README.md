# Testing Strategies

This document outlines the different testing approaches used in the Server-Driven UI project, focusing on maintainable, efficient, and reliable test automation.

## 📋 Table of Contents

- [Journey Testing](#journey-testing)
- [Robot Pattern](#robot-pattern)
- [API Mocking Strategy](#api-mocking-strategy)
- [Running Tests](#running-tests)

### Unit & Integration Tests

- **Tools**: Vitest, React Testing Library
- **Purpose**: Test individual components and services in isolation
- **Run with**: `npm run test`

### Journey Tests

- **Location**: `src/test/journey/`
- **Tools**: Cypress with custom Robot Pattern
- **Purpose**: Test critical user workflows with mocked APIs
- **Run with**: `npm run test:journey`

## 🚶 Journey Testing

Journey testing operates at a similar level to End-to-End (E2E) testing but with a crucial difference: **it uses mocked API responses instead of real backend services**.

### Journey Testing vs. End-to-End Testing

**End-to-End Testing Challenges:**

- Heavy and time-consuming execution
- Flaky tests due to external dependencies
- Network connectivity issues
- Environment instability
- Difficult debugging when failures occur

**Journey Testing Advantages:**

- **Focused approach**: Tests core user workflows without external dependencies
- **Faster execution**: No waiting for real API responses
- **Reliable**: Eliminates network and service flakiness
- **Predictable**: Controlled test data and responses
- **Isolated**: Tests UI logic independently from backend changes

## 🤖 Robot Pattern

The Robot Pattern is a powerful technique for structuring UI tests that promotes separation of concerns and code reusability.

### Pattern Structure

```
Test File
├── Arrangements (given)
├── Actions (when)
└── Assertions (then)
```

### Implementation Example

```typescript
// Test Structure
describe("Component Screen", () => {
  it("should load form and submit successfully", () => {
    given().withMockBff((mockBff) => {
      mockBff.respondsWithConfigSuccess(configData);
    });

    when().launchApp((robot) => {
      robot.entersForm(formComponent, formData);
    });

    then().onComponentScreen((screen) => {
      screen.seesForm(expectedForm);
      screen.seesSuccessMessage();
    });
  });
});
```

### Robot Classes

#### 📁 `support/arrangements/` - Test Setup

- **Purpose**: Configure test preconditions and mock responses
- **Example**: `MockBff` class for API response setup
- **Key files**:
  - `given.ts` - Entry point for test arrangements
  - `mock-bff.ts` - API mocking utilities

#### 📁 `support/actions/` - User Actions

- **Purpose**: Simulate user interactions
- **Example**: `ComponentScreenRobot` for form interactions
- **Key files**:
  - `when.ts` - Entry point for user actions
  - `component-screen.ts` - Page-specific interaction methods

#### 📁 `support/assertions/` - Validations

- **Purpose**: Verify expected outcomes
- **Example**: `ComponentScreenAssertions` for UI state validation
- **Key files**:
  - `then.ts` - Entry point for assertions
  - `component-screen-assertions.ts` - Page-specific validations

### Robot Pattern Benefits

🎯 **Separation of Concerns**

```typescript
// ✅ Good: Clear separation
robot.fillsInput(nameInput, "John Doe");
robot.clicksSubmitButton();

// ❌ Bad: Mixed concerns
cy.get("#name-input").type("John Doe");
cy.get('[data-testid="submit"]').click();
```

🔧 **Maintainability**

- UI changes only require updates in robot classes
- Test logic remains unchanged when selectors change
- Reusable actions across multiple test scenarios

📖 **Readability**

- Tests read like natural language
- Business logic is clearly expressed
- Non-technical stakeholders can understand test intent

### Environment Configuration

```typescript
// Cypress redirects API calls to mock server
process.env.API_BASE_URL = "http://localhost:3001";
```

### Mock Response Patterns

#### ✅ Success Responses

```typescript
mockBff.respondsWithConfigSuccess({
  version: "1.0.0",
  components: [
    /* component config */
  ],
});
```

#### ❌ Error Responses

```typescript
mockBff.respondsWithConfigError("Network timeout");
```

#### 🔄 Sequential Responses (for retry scenarios)

```typescript
// First call fails
mockBff.respondsWithConfigError("Server error");

// After retry, succeeds
mockBff.reset();
mockBff.respondsWithConfigSuccess(successData);
```

## 🏃 Running Tests

### Journey Tests

```bash
# Run all journey tests (headless)
npm run test:journey

# Open Cypress UI for debugging
npm run test:journey:open

# Run with API mocking
API_BASE_URL=http://localhost:3001 npm run dev
npm run test:journey
```

### Unit Tests

```bash
# Run all unit tests
npm test

# Watch mode for development
npm run test:watch
```

## 📋 Best Practices

### Test Organization

```
src/test/journey/
├── journeys/           # Test specifications
├── support/
│   ├── actions/        # Robot classes for user actions
│   ├── assertions/     # Robot classes for validations
│   ├── arrangements/   # Test setup and mocking
│   └── data.ts        # Test data constants
```
