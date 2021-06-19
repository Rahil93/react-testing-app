import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function EnrollmentForm() {
  const dropdownOptions = [
    { key: "Select a course", value: "" },
    { key: "Angular", value: "angular" },
    { key: "React", value: "react" },
    { key: "Vue", value: "vue" },
  ];

  const checkboxOptions = [
    { key: "HTML", value: "html" },
    { key: "CSS", value: "css" },
    { key: "Javascript", value: "javascript" },
  ];

  const initialValues = {
    email: "",
    bio: "",
    course: "",
    skillSet: [],
    courseDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    bio: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
    courseDate: Yup.string().required("Required").nullable(),
  });

  const onSubmit = (values) => {
    console.log("Form Data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl control="textarea" label="Bio" name="bio" />
            <FormikControl
              control="select"
              label="Course"
              options={dropdownOptions}
              name="course"
            />
            <FormikControl
              control="checkbox"
              label="Skillset"
              options={checkboxOptions}
              name="skillSet"
            />
            <FormikControl
              control="date"
              label="Course Date"
              name="courseDate"
            />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EnrollmentForm;
