import {
  cleanup,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import React from "react";
import LoginForm from "../LoginForm";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

test("test to submit login form with valid input", async () => {
  const { debug, container } = render(<LoginForm />);
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const submitButton = container.querySelector('button[type="submit"]');

  // FireEvent example to trigger input type
  // fireEvent.change(email, {
  //   target: {
  //     value: "mock@email.com",
  //   },
  // });
  // fireEvent.change(password, {
  //   target: {
  //     value: "wdqddq",
  //   },
  // });

  userEvent.type(email, "mock@someemail.com");
  userEvent.type(password, "12345678");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
    expect(email).toHaveValue("mock@someemail.com");
    expect(password).toHaveValue("12345678");
  });

  // debug();
});

test("test to check required validation on login form", async () => {
  const { debug, container, getByTestId } = render(<LoginForm />);

  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
    expect(getByTestId("emailError")).toHaveTextContent("Required");
    expect(getByTestId("passwordError")).toHaveTextContent("Required");
  });

  // debug();
});

test("test to check Invalid email format validation on login form", async () => {
  const { debug, container, getByTestId } = render(<LoginForm />);

  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.type(email, "mock@someemail");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
    expect(getByTestId("emailError")).toHaveTextContent("Invalid email format");
    expect(getByTestId("passwordError")).toHaveTextContent("Required");
  });

  // debug();
});

// src/components/__tests__/LoginForm.test.js
