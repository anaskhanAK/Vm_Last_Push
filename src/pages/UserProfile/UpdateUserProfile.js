import React, { useState, useRef } from "react"
import { Card, CardBody, Col, Button, Container, CardImg, CardText, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, CardTitle, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Link } from "react-router-dom"
import { element } from "prop-types"
import { result } from "lodash"
import { useMutation } from "@apollo/client"
import { USER_PROFILE_UPDATE } from "gqlOprations/Mutations"
// import StBtn from './StBtn'
import UpdateDetails from "./UpdateDetails"
import ChangePass from "./ChangePass"

const UpdateUserProfile = () => {

    document.title = "Update User Profile";

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