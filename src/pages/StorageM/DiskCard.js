import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table } from "reactstrap";
import { LiData1 } from "./LiData";

const DiskCard = () => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Row className="mb-3">
                        <h5 className="card-header bg-transparent border-bottom">Disk</h5>
                    </Row>
                    <Row>
                        {LiData1.map((value, index) => {
                            return (
                                <Col lg="6" key={index}>
                                    <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-1">
                                        <CardBody>
                                            <Row>
                                                <div className="d-flex flex-wrap">
                                                    <div className="me-3">
                                                        <p className="mb-2">Name: </p>
                                                        <p className="mb-2">Type: </p>
                                                        <p className="mb-2">Size: </p>
                                                        <p className="mb-2">Used Size: </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted mb-2">{value.name}</p>
                                                        <p className="text-muted mb-2">{value.type}</p>
                                                        <p className="text-muted mb-2">{value.as}</p>
                                                        <p className="text-muted mb-2">{value.us}</p>
                                                    </div>
                                                </div>
                                            </Row>
                                            <Row>
                                                {/* <div className="mb-2 mt-2">
                                                    {value.us < 3 || value.us < 3 ? (
                                                        <Progress color="primary" className="progress-md" value={75}></Progress>
                                                    ) : <Progress color="primary" className="progress-md" value={75}></Progress>}

                                                </div> */}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}

                    </Row>

                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default DiskCard