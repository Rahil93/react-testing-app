import { cleanup, render, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import RegistrationForm from "../RegistrationForm";

afterEach(() => {
  cleanup();
});

test("test to submit registration form with valid input", async () => {
  const { debug, container } = render(<RegistrationForm />);

  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const confirmPassword = container.querySelector(
    'input[name="confirmPassword"]'
  );
  const emailmoc = container.querySelector('input[id="emailmoc"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.type(email, "mock@someemail.com");
  userEvent.type(password, "12345678");
  userEvent.type(confirmPassword, "12345678");
  userEvent.click(emailmoc);
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
    expect(email).toHaveValue("mock@someemail.com");
    expect(password).toHaveValue("12345678");
    expect(confirmPassword).toHaveValue("12345678");
    expect(emailmoc).toBeChecked();
    expect(phoneNumber).toHaveValue("");
  });

  debug();
});

test("test to submit registration form with password match validation", async () => {
  const { debug, container, getByTestId } = render(<RegistrationForm />);

  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const confirmPassword = container.querySelector(
    'input[name="confirmPassword"]'
  );
  const emailmoc = container.querySelector('input[id="emailmoc"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.type(email, "mock@someemail.com");
  userEvent.type(password, "12345678");
  userEvent.type(confirmPassword, "1234567");
  userEvent.click(emailmoc);
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
    expect(email).toHaveValue("mock@someemail.com");
    expect(password).toHaveValue("12345678");
    expect(confirmPassword).toHaveValue("1234567");
    expect(getByTestId("confirmPasswordError")).toHaveTextContent(
      "Password must match"
    );
    expect(emailmoc).toBeChecked();
    expect(phoneNumber).toHaveValue("");
  });

  debug();
});

test("test to submit registration form with valid input for telephone mode of contact to be checked", async () => {
  const { debug, container } = render(<RegistrationForm />);

  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const confirmPassword = container.querySelector(
    'input[name="confirmPassword"]'
  );
  const telephonemoc = container.querySelector('input[id="telephonemoc"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.type(email, "mock@someemail.com");
  userEvent.type(password, "12345678");
  userEvent.type(confirmPassword, "12345678");
  userEvent.click(telephonemoc);
  userEvent.type(phoneNumber, "002987451");

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
    expect(email).toHaveValue("mock@someemail.com");
    expect(password).toHaveValue("12345678");
    expect(confirmPassword).toHaveValue("12345678");
    expect(telephonemoc).toBeChecked();
    expect(phoneNumber).toHaveValue("002987451");
  });

  //   debug();
});

test("test to submit registration form with required validation for telephone mode of contact to be checked", async () => {
  const { debug, container, getByTestId } = render(<RegistrationForm />);

  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const confirmPassword = container.querySelector(
    'input[name="confirmPassword"]'
  );
  const telephonemoc = container.querySelector('input[id="telephonemoc"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.type(email, "mock@someemail.com");
  userEvent.type(password, "12345678");
  userEvent.type(confirmPassword, "12345678");
  userEvent.click(telephonemoc);

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
    expect(email).toHaveValue("mock@someemail.com");
    expect(password).toHaveValue("12345678");
    expect(confirmPassword).toHaveValue("12345678");
    expect(telephonemoc).toBeChecked();
    expect(phoneNumber).toHaveValue("");
    expect(getByTestId("phoneNumberError")).toHaveTextContent("Required");
  });

  //   debug();
});

test("test to check required validation on registration form", async () => {
  const { debug, container, getByTestId } = render(<RegistrationForm />);

  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
    expect(getByTestId("emailError")).toHaveTextContent("Required");
    expect(getByTestId("passwordError")).toHaveTextContent("Required");
    expect(getByTestId("confirmPasswordError")).toHaveTextContent("Required");
    expect(getByTestId("modeOfContactError")).toHaveTextContent("Required");
  });

  // debug();
});
