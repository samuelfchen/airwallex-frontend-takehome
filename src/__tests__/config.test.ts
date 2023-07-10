import { describe, it, expect } from "vitest";
import { getSanitizedConfig } from "../config";

describe("config parser", () => {
  it("should correctly parse env", () => {
    expect(getSanitizedConfig({ API_URL: "https://example.com" })).toEqual({
      API_URL: new URL("https://example.com"),
    });
  });
  it("should throw on missing API URL", () => {
    expect(() => getSanitizedConfig({ API_URL: undefined })).toThrowError(
      Error
    );
  });
  it("should throw on invalid URL", () => {
    expect(() => getSanitizedConfig({ API_URL: "123abc" })).toThrowError(
      TypeError
    );
  });
});
