import React, { useState, useRef } from "react"
import { Card, CardBody, Col, Button, Container, CardImg, CardText, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, CardTitle, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import UpdateDetails from "./UpdateDetails"
import ChangePass from "./ChangePass"
import { useQuery } from "@apollo/client"
import { GET_USER_BY_ID } from "gqlOprations/Queries"

const UpdateUserProfile = () => {

    document.title = "Update User Profile";

    // const getCookies = (cname) => {
    //     const e = document.cookie.split("; ")
    //     let result = null
    //     e.forEach(element => {
    //         if (element.indexOf(cname) == 0) {
    //             result = element.substring(cname.length + 1)
    //         }
    //     })
    //     return result;
    // }
    // const mvid = getCookies("MvUserId");
    // const mvtoken = getCookies("MvUserToken");

    // const { loading, data, error } = useQuery(GET_USER_BY_ID, {
    //     variables: {
    //         input: {
    //             id: mvid,
    //             token: mvtoken
    //         }
    //     }
    // });

    // if (loading) {
    //     console.log("Hy Im main loading...")
    // };

    // if(data){
    //     console.log(data)
        
    // }

    // if (error) {
    //     console.log(error)
    // }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="User Profile" breadcrumbItem="Update Profile" />
                    <Row>
                        <UpdateDetails />
                    </Row>
                    <Row>
                        <ChangePass />
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    )
}

export default UpdateUserProfile