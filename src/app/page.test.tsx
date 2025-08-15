import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("should render", () => {
    render(<Home />);
    expect(screen.getByText("Hello World")).toBeDefined();
  });
});
