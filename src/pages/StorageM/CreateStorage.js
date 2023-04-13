import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import Select from "react-select";
import AddDiskModel from "./AddDiskModal";



const CreateStorage = () => {

    const [data_attr, setdata_attr] = useState(2);


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Storage" breadcrumbItem="Create Storage" />
                    <Card>
                        <CardBody>
                            <Row>
                                <Col lg={6}>
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-3">
                                                <h5 className="card-header bg-transparent border-bottom">Create Storage</h5>
                                            </Row>
                                            <Row>
                                                <div className="mb-3" >
                                                    <Label for="basicpill-phoneno-input3">
                                                        Storage Name :
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="storage-name"
                                                        placeholder="Enter Storage Name"
                                                        name="storageName"
                                                    />
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="mb-3">
                                                    <Label for="basicpill-phoneno-input3">
                                                        Storage Type :
                                                    </Label>
                                                    <select
                                                        className="form-select"
                                                        name="StorageType"
                                                    >
                                                        <option> Fast Storage </option>
                                                        <option> Safe Storage </option>
                                                        <option> Mixed Storage </option>
                                                        <option> Redundant Mixed Storage </option>
                                                    </select>
                                                </div>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={6}>
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-3">
                                                <h5 className="card-header bg-transparent border-bottom">Add Disk</h5>
                                            </Row>
                                            <Row>
                                                <div className="mb-3" >
                                                    <Label for="basicpill-phoneno-input3">
                                                        Disk Name :
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="storage-name"
                                                        placeholder="Enter Storage Name"
                                                        name="storageName"
                                                    />
                                                </div>
                                            </Row>
                                            <Row>
                                                <AddDiskModel/>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>

        </React.Fragment >
    )
}

export default CreateStorage