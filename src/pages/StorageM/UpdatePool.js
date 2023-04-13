import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import { LiData1, LiData2 } from "./LiData";



const UpdatePool = () => {

    const [activeLi, setActiveLi] = useState(LiData2)
    const [diskLi, setDiskLi] = useState(LiData1)
    console.log(activeLi)
    console.log(diskLi)

    const handleLibtn = (e) => {
        console.log("liii", e.id)
        const index = diskLi.indexOf(e.id)
        console.log(index)
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Create Storage" breadcrumbItem="Update Storage" />
                    <Card>
                        <CardBody>
                            <Row>
                                <Col lg={12} style={{ marginBottom: "-50px" }}>
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-3">
                                                <h5 className="card-header bg-transparent border-bottom">Update Storage</h5>
                                            </Row>
                                            <Row>
                                                <Col>
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
                                                </Col>
                                                <Col>
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
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-3">
                                                <h5 className="card-header bg-transparent border-bottom">Available Disks</h5>
                                            </Row>
                                            <Row>
                                                {LiData2.map((value, index) => {
                                                    return (
                                                        <Col xs="2" key={index} onClick={() => { handleLibtn(value) }}>
                                                            <Card className="mini-stats-wid shadow-lg rounded-2 border-success border-2 ">
                                                                <CardBody>
                                                                    <Row style={{ marginTop: "-12px", marginBottom: "-12px" }}>
                                                                        <div className="d-flex flex-wrap">
                                                                            <Col lg={11}>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="me-3">
                                                                                        <p className="mb-0">
                                                                                            <small>
                                                                                                Name:
                                                                                            </small>
                                                                                        </p>
                                                                                        <p className="mb-0">
                                                                                            <small>
                                                                                                Type:
                                                                                            </small>
                                                                                        </p>
                                                                                        <p className="mb-0">
                                                                                            <small>
                                                                                                Size:
                                                                                            </small>
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="text-muted mb-0">
                                                                                            <small>
                                                                                                {value.name}
                                                                                            </small>
                                                                                        </p>
                                                                                        <p className="text-muted mb-0">
                                                                                            <small>
                                                                                                {value.type}
                                                                                            </small>
                                                                                        </p>
                                                                                        <p className="text-muted mb-0">
                                                                                            <small>
                                                                                                {value.as}
                                                                                            </small>
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={1}>
                                                                                <i
                                                                                    className="bx bx-trash label-icon"
                                                                                    style={{ fontSize: '17px', cursor: 'pointer' }}
                                                                                />
                                                                            </Col>
                                                                        </div>
                                                                    </Row>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                            <Row className="bg-transparent mb-4">
                                                <Col>
                                                    <Progress color={"warning"} className="progress-xl" value={75}></Progress>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {LiData1.map((value, index) => {
                                                    return (
                                                        <Col lg="2" key={index} onClick={() => { handleLibtn(value) }}>
                                                            <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-2">
                                                                <CardBody>
                                                                    <Row>
                                                                        <Col lg={12}>
                                                                            <div className="d-flex flex-wrap">
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="me-3">
                                                                                        <p className="mb-0">Name: </p>
                                                                                        <p className="mb-0">Type: </p>
                                                                                        <p className="mb-0">Size: </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="text-muted mb-0">{value.name}</p>
                                                                                        <p className="text-muted mb-0">{value.type}</p>
                                                                                        <p className="text-muted mb-0">{value.as}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default UpdatePool