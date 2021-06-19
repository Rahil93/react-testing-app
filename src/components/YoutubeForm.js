import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phnNumbers: [""],
};

const savedValues = {
  name: "Rahil",
  email: "r@eg.com",
  channel: "formik",
  comments: "zs",
  address: "Mumbai",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phnNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  console.log("Form Data", values);
  console.log("submit props", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm()
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email Format").required("Required"),
  channel: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const validateComment = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  // console.log("", formik);
  // console.log("Form Values", formik.values);
  // console.log("Form Errors", formik.errors);
  // console.log("Visited Fields", formik.touched);

  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      // validateOnMount
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        console.log("Formik propos", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="Youtube Channel Name"
              />
              <ErrorMessage name="channel">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comment</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComment}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, meta } = props;
                  console.log("Field Render", props);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone Number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Second Phone Number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of Phone Numbers</label>
              <FieldArray name="phnNumbers">
                {(fieldArrayProps) => {
                  // console.log("Field Array Props", fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phnNumbers } = values;
                  console.log("Error :", form.errors);
                  return (
                    <div>
                      {phnNumbers.map((phnNumber, index) => (
                        <div key={index}>
                          <Field name={`phnNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm("")}>
              Validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                  address: true,
                })
              }
            >
              Visit all
            </button> */}
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Saved Data
            </button>
            <button type='reset'>Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
