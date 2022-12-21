import React, { useState, useRef } from "react"
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import { from, useMutation } from "@apollo/client"
import { USER_PROFILE_UPDATE } from "gqlOprations/Mutations"
// import getUserApi from "./getUserApi"

const UpdateDetails = (props) => {

    console.log(props.UData)
    
    const [img, setImg] = useState("");

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
    const [formData, setFormData] = useState({
        token: mvToken
    });

    let showImg = "http://167.99.36.48:3003/User_Image/1669615730102.jpeg"

    const [userProfileUpdate, { data, loading, error }] = useMutation(USER_PROFILE_UPDATE);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(formData);

        userProfileUpdate({
            variables: {
                input: formData
            }
        })

        if (loading) {
            console.log("loading...")
        }
    
        if (data) {
            console.log(data)
            console.log(formData)
        }
    
        if (error) {
            console.log(error.message)
        }
    };

    const handleImageUp = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImg(reader.result.toString());
            const eImage = reader.result.toString();
            setFormData(prevState => ({
                ...prevState,
                userImage:eImage
            })
                )            

            
        };
        reader.readAsDataURL(file)
    }


    return (
        <React.Fragment>
            <Form onSubmit={handleUpdate}>
                <Row>
                    <Col lg="12">
                        <Card>
                            <Row>
                                <Col lg="3">
                                    <Card >
                                        <CardBody>
                                            <h4 className="card-title mb-4">Update Image</h4>
                                            <div className="text-center">
                                                <div style={{ height: "250px" }}>
                                                    <img className="rounded-circle"
                                                        id="UserImage"
                                                        src={img}
                                                        width="270px"
                                                        height="270px"
                                                        // style={{ borderRadius: "5px" }}
                                                    ></img>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <Input className="form-control"
                                                        type="file"
                                                        id="userImageUpdate"
                                                        accept="image/*"
                                                        name="userImage"
                                                        onChange={handleImageUp}
                                                        // ref={imageUploader}
                                                        // value={formData.UserImage ||""}
                                                    />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="9">
                                    <Card>
                                        <CardBody>
                                            <h4 className="card-title mb-4">Update Details</h4>
                                            <Row style={{ marginTop: "45px" }}>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-email-Input">First Name</Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="Update-first-name-input"
                                                            name="firstName"
                                                            placeholder="Enter Your First Name"
                                                            onChange={handleChange}
                                                            value={formData.firstName || ""}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-email-Input">Last Name</Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="Update-last-name-input"
                                                            name="lastName"
                                                            placeholder="Enter Your Last Name"
                                                            onChange={handleChange}
                                                            value={formData.lastName || ""}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "45px" }}>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-email-Input">Email</Label>
                                                        <Input
                                                            type="email"
                                                            className="form-control"
                                                            id="update-email-input"
                                                            name="Email"
                                                            placeholder="Enter Your Email"
                                                            onChange={handleChange}
                                                            value={formData.Email || ""}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6} >
                                                    {/* <div className="mb-3">
                                                                <Label htmlFor="formrow-email-Input">Password</Label>
                                                                <Input
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="update-password-input"
                                                                    name="Password"
                                                                    placeholder="Enter Password"
                                                                    onChange={handleChange}
                                                                    value={formData.Password}
                                                                />
                                                            </div> */}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col style={{ marginTop: "63px" }}>
                                                    <button
                                                        id="update-submit"
                                                        type="submit"
                                                        className="btn btn-primary  btn-label">
                                                        <i className="bx bx-sync label-icon"></i> Update Now
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

export default UpdateDetails;