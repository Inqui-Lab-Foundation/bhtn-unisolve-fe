import "./SignUp.scss";
import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  NavLink,
  Input,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { InputBox } from "../stories/InputBox/InputBox";
import { Button } from "../stories/Button";

import { useFormik } from "formik";
import * as Yup from "yup";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
// import UsersPage from "./UserPages";

import logout from "../media/logout.svg";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ChangePSWModal = (props, { history }) => {
  //const history = useHistory();
  const { t, i18n } = useTranslation();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required(t("login.error_required")),
      newPassword: Yup.string().required(t("login.error_required")),
      confirmPassword: Yup.string().required(t("login.error_required")),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //   history.push("/");
      // alert("jhani");
      MySwal.fire({
        title: "<h4>Password updated!</h4>",
        imageUrl: `${logout}`,
        html:
          "Your password has been changes successfully!<br/>Use your new password to login <br/><br/>" +
          '<a class="w-100 mt-5 storybook-button storybook-button--large storybook-button--primary" href="/login">Login with new password</a> ',
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
    },
  });

  const oldPassword = {
    type: "password",
    placeholder: t("changepswd.Enter_current_password_here"),
    className: "defaultInput",
  };

  const newPassword = {
    type: "password",
    placeholder:  t("changepswd.Create_new_password_here"),
    className: "defaultInput",
  };

  const confirmPassword = {
    type: "password",
    placeholder: t("changepswd.Verify_New_password"),
    className: "defaultInput",
  };

  const logInBtn = {
    label: "Lotgin",
    size: "small",
    btnClass: "default",
  };

  const onPick = (value) => {
    // <Link exact to="/forgotpassword" className="text-link pt-1" />;
    alert("red");
  };

  return (
    <React.Fragment>
      <div className="container-fluid ChangePSWModal">
        <Row className="mt-5">
          <Col md={12}>
            <h5>{t("changepswd.Change your password")}</h5>
            <p>
            {t("changepswd.password_helps_prevent_unauthorized")}
            </p>
          </Col>
          <Col md={12}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="form-row row mb-5 mt-3">
                <Col className="form-group" md={12}>
                  <Label className="mb-2" htmlFor="Password">
                  {t("changepswd.Current_password")}
                  </Label>
                  <InputBox
                    {...oldPassword}
                    id="oldPassword"
                    name="oldPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                  />
                  {/* <Link exact to="/forgotpassword" className="text-link pt-1">
                    Forgot your password?
                  </Link> */}
                  {/* <p onClick={onPick}>Forgot your password?</p> */}

                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <small className="error-cls">
                      {formik.errors.oldPassword}
                    </small>
                  ) : null}
                </Col>
              </div>
              <div className="w-100 clearfix " />

              <div className="form-row row  mb-5">
                <Col className="form-group" md={12}>
                  <Label className="mb-2" htmlFor="newPassword">
                  {t("changepswd.New_password")}
                  </Label>
                  <InputBox
                    {...newPassword}
                    id="newPassword"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                  />
                  <small className="mt-2">
                  {t("changepswd.8-charac_minimum_case_sensitive")}
                  </small>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <small className="error-cls">
                      {formik.errors.newPassword}
                    </small>
                  ) : null}
                </Col>
                <div className="w-100 clearfix" />
                <Col className="form-group mt-5" md={12}>
                  <Label className="mb-2" htmlFor="confirmPassword">
                  {t("changepswd.Verify_New_password")}
                  </Label>
                  <InputBox
                    {...confirmPassword}
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />

                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <small className="error-cls">
                      {formik.errors.confirmPassword}
                    </small>
                  ) : null}
                </Col>
              </div>

              {/* <div className="form-row row mb-5">
                <Col className="form-group" md={6}>
                  <Button {...logInBtn} type="submit" />
                </Col>
              </div> */}

              <div
                className="swal2-actions"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  fontSize: "0.9em",
                }}
              >
                <button
                  onClick={props.onCancel}
                  className="btn btn-outline-secondary rounded-pill sweet-btn-max"
                >
                 {t("changepswd.Cancel")}
                </button>
                <button
                  type="submit"
                  className="storybook-button storybook-button--small storybook-button--primary sweet-btn-max"
                >
                  {t("changepswd.Change_password")}
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ChangePSWModal;
