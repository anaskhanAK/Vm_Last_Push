import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table } from "reactstrap";
import { LiData1 } from "./LiData";

const DiskCard = (props) => {

    const [disks, setDisks] = useState()

    useEffect(() => {
        if (props.diskData) {
            console.log(props.diskData.disk)
            setDisks(props.diskData.disk)
        }
    }, [props.diskData])

    useEffect(() => { console.log(props.diskData, "jjjj") }, [])

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Row className="mb-3">
                        <h5 className="card-header bg-transparent border-bottom"> Used Disks</h5>
                    </Row>
                    <Row>
                        {disks && disks ? (disks.length > 0 || disks.length > 0 ? ((disks.map((value, index) => {
                            return (
                                <Col lg="6" key={index}>
                                    <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-1">
                                        <CardBody className="p-3">
                                            <Row>
                                                <div className="d-flex flex-wrap">
                                                    <div className="me-2">
                                                        <p className="mb-1">Disk Name: </p>
                                                        {/* <p className="mb-2">Type: </p> */}
                                                        <p className="mb-1">Disk Size: </p>
                                                        <p className="mb-0">Storage Name: </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted mb-1 text-truncate" style={{maxWidth:"80px"}}>{value.diskName}</p>
                                                        {/* <p className="text-muted mb-2">{value.type}</p> */}
                                                        <p className="text-muted mb-1">{value.diskSize}{" GB"}</p>
                                                        <p className="text-muted mb-0 text-truncate" style={{maxWidth:"80px"}}>{value.storageId.storageName}</p>
                                                    </div>
                                                </div>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        }))):<Col className="d-flex justify-content-center"> No Disks Yet </Col>) :
                            <Col className="d-flex justify-content-center"> No Disks Yet </Col>
                        }
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default DiskCard