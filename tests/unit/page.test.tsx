import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders the Nudge heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Nudge" }),
  ).toBeDefined();
});
