import React, { useEffect, useState } from "react";
// Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";
import { Link , useHistory} from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback, UncontrolledAlert, Alert } from "reactstrap";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "gqlOprations/Mutations";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Register = () => {

  //meta title
  document.title = "Register | Skote - React Admin & Dashboard Template";

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    Email: "",
    Password: "",
    Deleted: false
  });

  const [userRegister, { data, loading, error }] = useMutation(USER_REGISTER);

  const history = useHistory();

  toastr.options = {
    positionClass: "toast-top-center",
    closeButton: true,
  }

  if (loading) { console.log("loading...") };
  if (data) {
    console.log(data);
    toastr.success("Register Successfully");
    history.push("/login");

  };
  if (error) {
    console.log(error.message);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(formData)

    userRegister({
      variables: {
        input: formData
      }
    });
  };

  return (
    <React.Fragment>
      <div className="account-pages my-4 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Registration Form</h5>
                        <p>Welcome !</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form className="form-horizontal" onSubmit={handleRegister}>
                      <div className="mb-3">
                        <Label className="form-label">First Name</Label>
                        <Input
                          name="firstName"
                          type="text"
                          placeholder="Enter First Name"
                          onChange={handleChange}
                          value={formData.firstName}
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Last Name</Label>
                        <Input
                          name="lastName"
                          type="text"
                          placeholder="Enter Last Name"
                          onChange={handleChange}
                          value={formData.lastName}
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={handleChange}
                          value={formData.Email}
                        />
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="Password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                          value={formData.Password}
                        />
                      </div>
                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          {loading && loading ? (
                            <i className="bx bx-loader-alt bx-spin bx-sx"></i>
                          ) : "Register"}
                        </button>
                      </div>

                      {error && error ? (
                        <Alert color="danger" style={{marginTop:"20px"}}>User Already Exist</Alert>
                      ) : null}

                      <div className="mt-4 text-center">
                        <p>
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className="fw-medium text-primary"
                          >
                            {" "}
                            Login
                          </Link>{" "}
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
