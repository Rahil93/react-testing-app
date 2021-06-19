import { cleanup, render, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import EnrollmentForm from "../EnrollmentForm";

afterEach(() => {
  cleanup();
});

test("test to submit enrollment form with valid input", async () => {
  const { debug, container, getByText } = render(<EnrollmentForm />);

  const email = container.querySelector('input[name="email"]');
  const bio = container.querySelector('textarea[name="bio"]');
  const course = container.querySelector('select[name="course"]');
  const skillSetHtml = container.querySelector('input[id="html"]');
  const skillSetCss = container.querySelector('input[id="css"]');
  const skillSetJavascript = container.querySelector('input[id="javascript"]');
  const courseDate = container.querySelector('input[name="courseDate"]');
  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.type(email, "mock@someemail.com");
  userEvent.type(bio, "some inputs");
  userEvent.selectOptions(course, ["react"]);
  userEvent.click(skillSetHtml);
  userEvent.click(skillSetCss);
  userEvent.click(skillSetJavascript);
  userEvent.type(courseDate, "06/08/2021");
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
    expect(email).toHaveValue("mock@someemail.com");
    expect(bio).toHaveValue("some inputs");
    expect(getByText(/react/i).selected).toBe(true);
    expect(skillSetHtml).toBeChecked();
    expect(skillSetCss).toBeChecked();
    expect(skillSetJavascript).toBeChecked();
    expect(courseDate).toHaveValue("06/08/2021");
  });

  // debug();
});

test("test to submit enrollment form with required validation", async () => {
  const { debug, container, getByTestId } = render(<EnrollmentForm />);

  const submitButton = container.querySelector('button[type="submit"]');

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
    expect(getByTestId("emailError")).toHaveTextContent("Required");
    expect(getByTestId("bioError")).toHaveTextContent("Required");
    expect(getByTestId("courseError")).toHaveTextContent("Required");
    expect(getByTestId("courseDateError")).toHaveTextContent("Required");
  });

  // debug();
});
