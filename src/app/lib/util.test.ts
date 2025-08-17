import { describe, it, expect } from "vitest";
import { cn } from "./util";

describe("cn utility function", () => {
  it("should combine multiple class names", () => {
    const result = cn("bg-red-500", "text-white", "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should handle falsy conditional classes", () => {
    const isActive = false;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class");
  });

  it("should merge conflicting Tailwind classes", () => {
    const result = cn("bg-red-500", "bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["bg-red-500", "text-white"], "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");
  });

  it("should handle objects with conditional classes", () => {
    const result = cn({
      "bg-red-500": true,
      "text-white": true,
      "hidden": false,
    });
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle mixed input types", () => {
    const result = cn(
      "base-class",
      ["array-class-1", "array-class-2"],
      {
        "object-class": true,
        "hidden": false,
      },
      true && "conditional-class",
      null,
      undefined,
      "final-class",
    );
    expect(result).toBe(
      "base-class array-class-1 array-class-2 object-class conditional-class final-class",
    );
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle null and undefined inputs", () => {
    const result = cn(null, undefined, "valid-class");
    expect(result).toBe("valid-class");
  });

  it("should merge responsive Tailwind classes correctly", () => {
    const result = cn("p-2", "md:p-4", "lg:p-6");
    expect(result).toBe("p-2 md:p-4 lg:p-6");
  });

  it("should merge conflicting responsive classes correctly", () => {
    const result = cn("p-2", "p-4", "md:p-6");
    expect(result).toBe("p-4 md:p-6");
  });

  it("should handle complex Tailwind class conflicts", () => {
    const result = cn("bg-red-500 text-white p-4", "bg-blue-600 m-2", "text-black");
    expect(result).toBe("p-4 bg-blue-600 m-2 text-black");
  });
});
