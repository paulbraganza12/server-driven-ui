/// <reference types="cypress" />

export type Interception = {
  id: string;
  method: "GET" | "PUT" | "POST";
  path: string;
  response: {
    body: unknown;
    statusCode: number;
  };
  times?: number;
};

export const registerInterceptor = ({ method, path, response, id, times }: Interception) => {
  cy.intercept(path, { method, ...(times !== undefined && { times }) }, response).as(id);
};

export const getByTestId = (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
};

export const getByRole = (role: string) => {
  return cy.get(`[role="${role}"]`);
};

export const getByLabelText = (labelText: string) => {
  return cy.get(`[aria-label="${labelText}"]`);
};

export const getByPlaceholderText = (placeholderText: string) => {
  return cy.get(`[placeholder="${placeholderText}"]`);
};

export const getByText = (text: string) => {
  return cy.get(`:contains("${text}")`);
};

export const getByTitle = (title: string) => {
  return cy.get(`[title="${title}"]`);
};

export const getById = (id: string) => {
  return cy.get(`#${id}`);
};
