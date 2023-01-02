import React, { useState, useRef, useEffect } from "react"
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import { from, useMutation, useQuery } from "@apollo/client"
import { USER_PROFILE_UPDATE } from "gqlOprations/Mutations"
import { GET_USER_BY_ID } from "gqlOprations/Queries";
// import getUserApi from "./getUserApi"

const UpdateDetails = () => {
    
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
    const mvid = getCookies("MvUserID");
    

    const [ProfileData, setProfileData] = useState({
        uImage: "",
        uFName: "",
        ulName: "",
        uEmail: ""
    });
    const [img, setImg] = useState();
    const [formData, setFormData] = useState({
        token: mvToken
    });

    const { data: dataB, loading: loadingB, error: errorB } = useQuery(GET_USER_BY_ID, {
        variables: {
            input: {
                id: mvid,
                token: mvToken
            }
        }
    });

    if (dataB) {
        console.log(dataB);
    }
    

    const [userProfileUpdate, { data: dataA, loading: loadingA, error: errorA }] = useMutation(USER_PROFILE_UPDATE);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // console.log(formData);

        userProfileUpdate({
            variables: {
                input: formData
            }
        })

        if (loadingA) {
            // console.log("loading...")
        }

        if (dataA) {
            console.log(dataA)
            // console.log(formData)
        }

        if (errorA) {
            // console.log(error.message)
        }
    };

    const handleImageUp = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImg(reader.result.toString());
            const eImage = reader.result.toString();
            setFormData(prevState => ({
                ...prevState,
                userImage: eImage
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
                                                        src={img||"./updateimage.png"}
                                                        // src={"http://167.99.36.48:3003/"+dataB.getUserByID.User_Image.split("app/")[1]}
                                                        width="270px"
                                                        height="270px"
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
                                            </Row>

                                            <Row>
                                                <Col style={{ marginTop: "63px" }}>
                                                    <button
                                                        id="update-submit"
                                                        type="submit"
                                                        className="btn btn-primary  btn-label">
                                                        {loadingA && loadingA ? (<i className="bx bx-sync label-icon bx-spin"></i>) :
                                                            (<i className="bx bx-sync label-icon"></i>)} Update Now
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