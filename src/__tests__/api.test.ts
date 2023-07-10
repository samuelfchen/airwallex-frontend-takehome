import { describe, it, expect } from "vitest";
import { axiosClient } from "../api";

describe("test axios client", () => {
  it("client should be defined", () => {
    expect(axiosClient).toBeDefined();
  });
});
