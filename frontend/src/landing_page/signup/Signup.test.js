import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

test("renders the account creation heading", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  expect(screen.getByText(/create your account/i)).toBeTruthy();
});
