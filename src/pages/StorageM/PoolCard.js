import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table, Button } from "reactstrap";
import { LiData } from "./LiData";
import { Link } from 'react-router-dom';
import SimpleBar from "simplebar-react";

const PoolCard = () => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Row className="mb-3">
                        <div className="d-flex flex-wrap border-bottom">
                            <h5 className="card-header bg-transparent ">Storage</h5>
                            <Link className="ms-auto" to="/create-storage">
                            <div className="ms-auto">
                                <button
                                    type="button"
                                    className="btn btn-primary "
                                >
                                    <i className="bx bx-hdd font-size-16 align-middle me-2"></i>{" "}
                                    Create Storage
                                </button>
                            </div>
                            </Link>
                        </div>
                    </Row>
                    <Row>
                        {LiData.map((value, index) => {
                            return (
                                <Col lg="6" key={index}>
                                    <Card className="mini-stats-wid shadow-lg" >
                                        <CardBody>
                                            <Row>
                                                <div className="d-flex flex-wrap">
                                                    <div className="me-3">
                                                        <p className="mb-2">Name: </p>
                                                        <p className="mb-2">Type: </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted mb-2">{value.name}</p>
                                                        <p className="text-muted mb-2">{value.type}</p>
                                                    </div>
                                                    <Link className="ms-auto" to="/update-storage">
                                                        <div className="avatar-sm ms-auto">
                                                            <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                                                <i className="bx bx-edit"></i>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="mb-2 mt-2">
                                                    {value.raid < 3 || value.raid < 3 ? (
                                                        <Progress color="success" className="progress-md" value={value.pst}></Progress>
                                                    ) : <Progress color="warning" className="progress-md" value={value.pst}></Progress>}
                                                </div>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment >
    )
}

export default PoolCard