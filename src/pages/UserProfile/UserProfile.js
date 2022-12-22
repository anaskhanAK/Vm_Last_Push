import React, { useState, useRef } from "react"
import { Card, CardBody, Col, Button, Container, CardImg, CardText, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, CardTitle, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER_BY_ID } from "gqlOprations/Queries"


const UserProfile = () => {

    document.title = "Profile";

    // const [ProfileData,setProfileData] = useState({
    //     uImage:"",
    //     uFName:"",
    //     ulName:"",
    //     uEmail:""
    // });

    const getCookies = (cname) => {
        const e = document.cookie.split("; ")
        let result = null
        e.forEach(element => {
            if (element.indexOf(cname) == 0) {
                result = element.substring(cname.length + 1)
            }
        })
        return result;
    }
    const mvid = getCookies("MvUserId");
    const mvtoken = getCookies("MvUserToken");

    const { loading, data, error } = useQuery(GET_USER_BY_ID, {
        variables: {
            input: {
                id: mvid,
                token: mvtoken
            }
        }
    });

    if (loading) {
        console.log("loading...")
    };

    if(data){
        console.log(data)
        
    }

    if (error) {
        console.log(error)
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="VM List" breadcrumbItem="VM Details" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <Row>
                                    <Col lg="4">
                                        <Card >
                                            <CardBody>
                                                <h4 className="card-title mb-4">User Image</h4>
                                                <CardImg className="img-fluid rounded-circle"
                                                    src={data && data ? ("http://167.99.36.48:3003/"+data.getUserByID.User_Image.split("app/")[1]):null}
                                                    style={{ height: "330px", width: "330px", marginLeft: "20px" }} />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="8">
                                        <Card>
                                            <CardBody>
                                                <h4 className="card-title mb-4">User Details</h4>
                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardBody>
                                                                <CardTitle>First Name:</CardTitle>
                                                                <CardText>
                                                                    {data && data ? (
                                                                        data.getUserByID.First_Name
                                                                    ) : null}
                                                                </CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col>
                                                        <Card>
                                                            <CardBody>
                                                                <CardTitle>Last Name:</CardTitle>
                                                                <CardText>
                                                                    {data && data ? (
                                                                        data.getUserByID.Last_Name
                                                                    ) : null}
                                                                </CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardBody>
                                                                <CardTitle>Email:</CardTitle>
                                                                <CardText>
                                                                    {data && data ? (
                                                                        data.getUserByID.Email
                                                                    ) : null}
                                                                </CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col style={{ marginTop: "67px" }}>
                                                        <Link to="/updateprofile" >
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary  btn-label">
                                                                <i className="bx bx-sync label-icon"></i> Update Profile
                                                            </button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment >
    )
}

export default UserProfile