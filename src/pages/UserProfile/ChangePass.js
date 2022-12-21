import { useMutation } from "@apollo/client";
import { CHANGE_USER_PASSWORD } from "gqlOprations/Mutations";
import { set } from "lodash";
import React, { useState, useRef } from "react"
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import toastr from "toastr";
import "toastr/build/toastr.min.css";


const ChangePass = () => {

    const getCookies = (cname) => {
        const cArray = document.cookie.split("; ")
        let result = null
        cArray.forEach(element => {
            if (element.indexOf(cname) == 0) {
                result = element.substring(cname.length + 1)
            }
        })
        return result;
    }

    const mvToken = getCookies("MvUserToken");
    console.log(mvToken);

    const [queryData,setQueryData] = useState({})
    const [formData, setFormData] = useState({});
    const [changePassword, { data, loading, error }] = useMutation(CHANGE_USER_PASSWORD);

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


    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(formData);

        if(formData.Password == formData.ConfirmPassword){
            setQueryData({
                ...queryData,
                ["Password"]:formData.Password,
                ["token"]:mvToken
            });
            console.log(queryData)

            changePassword({
                variables: {
                    input: queryData
                }
            })

            if (loading) {
                console.log("loading...")
            }
        
            if (data) {
                console.log(data)
                toastr.success("Password Reset");
            }
        
            if (error) {
                console.log(error.message)
                toastr.error(error.message);
            }
        }

        else{
            console.log("miss match")
            toastr.error("Wrong Password");
        }

    };


    return (
        <React.Fragment>
            <Form onSubmit={handleUpdate}>
                <Row>
                    <Col lg="12">
                        <Card>
                            <Row>
                                <Col lg="12">
                                    <Card >
                                        <CardBody>
                                            <h4 className="card-title mb-4">Change Password</h4>
                                            <Row>
                                                <Col>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-email-Input">New Password</Label>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            id="pass1-Input"
                                                            placeholder="Enter New Password"
                                                            name="Password"
                                                            onChange={handleChange}
                                                            value={formData.Password ||""}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="mb-3">
                                                        <Label htmlFor="pass2-Input">Confirm Password</Label>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            id="formrow-email-Input"
                                                            placeholder="Confirm Password"
                                                            name="ConfirmPassword"
                                                            onChange={handleChange}
                                                            value={formData.ConfirmPassword ||""}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col style={{ marginTop: "25px" }}>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary  btn-label">
                                                        <i className="bx bx-sync label-icon"></i> Change Now
                                                    </button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    )
};

export default ChangePass;

