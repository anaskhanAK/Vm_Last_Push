import React, { useState } from "react";

// Redux
import { Link, useHistory } from "react-router-dom";

import { Row, Col, CardBody, Card, Container, Form, Input, Label, FormFeedback, Alert } from "reactstrap";

// import images
import profile from "../../assets/images/profile-img.png";

import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "gqlOprations/Mutations";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Login = () => {

  //meta title
  document.title = "Login | Skote - React Admin & Dashboard Template";

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN);

  const history = useHistory();

  toastr.options = {
    positionClass: "toast-top-center",
    closeButton: true,
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formData)

    userLogin({
      variables:{
        input:formData
      }
    });

    if (loading) { console.log("loading...") };
    if (data) {
      console.log(data);
      console.log(data.Login.token);
      console.log(data.Login.id);
      toastr.success("Login Successful");
      document.cookie = "MvUserToken" + "=" + data.Login.token;
      document.cookie = "MvUserId" + "=" + data.Login.id;
      document.cookie = "MvUserType" + "=" + data.Login.userType;
      history.push("/dashboard");
  
    };
    if (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
      <div className="account-pages my-4 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Login to continue Virtual Machine</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form className="form-horizontal" onSubmit={handleLogin}>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
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
                          // value={formData.Password}
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      {error && error ? (
                        <Alert color="danger" style={{marginTop:"20px"}}>{error.message}</Alert>
                      ) : null}

                      <div className="mt-4 text-center">
                        <p>
                          Don&apos;t have an account ?{" "}
                          <Link
                            to="/register"
                            className="fw-medium text-primary"
                          >
                            {" "}
                            Signup now{" "}
                          </Link>{" "}
                        </p>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-pwd" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Forgot your
                          password?
                        </Link>
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

export default Login;
