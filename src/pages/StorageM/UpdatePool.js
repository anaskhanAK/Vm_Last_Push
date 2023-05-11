import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table, Button, UncontrolledTooltip } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
// import { LiData1, LiData2 } from "./LiData";
import { useLazyQuery } from "@apollo/client";
import { GET_STORAGE_DATA, GET_UNUSED_DISKS } from "gqlOprations/Queries";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./card.scss"


const UpdatePool = () => {

    // const [activeLi, setActiveLi] = useState(LiData2)
    const [unSelectDisks, setUnSelectDisks] = useState()
    const [selectedDisks, setSelectedDisks] = useState()
    const [storageData, setStorageData] = useState()
    const { storageId } = useParams()
    const [cStorageData, setCStorageData] = useState({
        storageName: "",
        storageType: "",
        storageSize: ""
    })
    // const [storageT, setStorageT] = useState()

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

    const [getUnUsedDisksUpdate, { loading: loadingB, data: dataB, error: errorB }] = useLazyQuery(GET_UNUSED_DISKS)
    const [getSpecificStorage, { loading: loadingA, data: dataA, error: errorA }] = useLazyQuery(GET_STORAGE_DATA, {
        variables: {
            input: {
                token: mvToken,
                id: storageId
            },
        },
        onCompleted: (DataA) => {
            console.log(DataA, "dataA")
            setStorageData(DataA.getStorageDetailsDisk);
            setSelectedDisks(DataA.getStorageDetailsDisk.disk)
            const sName = DataA.getStorageDetailsDisk.storage[0].storageName;
            const sType = DataA.getStorageDetailsDisk.storage[0].storageType;
            const sSize = DataA.getStorageDetailsDisk.storage[0].storageSize;
            setCStorageData({
                ...cStorageData,
                storageName: sName,
                storageType: sType,
                storageSize: sSize
            })
        },

        fetchPolicy: "cache-and-network"
    })

    const handleStorageDataChange = (e) => {
        console.log(e.target.value)
        setCStorageData({
            ...cStorageData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = () => {
        console.log(cStorageData.storageName)
        console.log(cStorageData.storageType)
        console.log(cStorageData.storageSize)
        const selectedIds = selectedDisks.map(selectedDisks => selectedDisks.id);
        console.log(selectedIds)

    }

    const handleSelectedClick = (e) => {
        setSelectedDisks(selectedDisks.filter(selectedDisks => selectedDisks.id !== e.id))
        const newDisk = e
        setUnSelectDisks([...unSelectDisks, newDisk]);
    }

    const handleUnSelectedClick = (e) => {
        setUnSelectDisks(unSelectDisks.filter(unSelectDisks => unSelectDisks.id !== e.id))
        const newDisk = e
        setSelectedDisks([...selectedDisks, newDisk]);
    }

    let totalS;
    if (cStorageData) {
        if (cStorageData.storageType === "Fast Storage") {
            console.log("Fast")
            totalS = "2"
        }
        if (cStorageData.storageType === "Safe Storage") {
            console.log("Safe")
            totalS = "2"
        }
        if (cStorageData.storageType === "Mixed Storage") {
            console.log("Mixed")
            totalS = "3"
        }
        if (cStorageData.storageType === "Redundant Mixed Storage") {
            console.log("Redundant")
            totalS = "4"
        }
    }


    useEffect(() => {
        if (dataB) {
            setUnSelectDisks(dataB.getUnAssignedDisk)
        }
    }, [dataB])
    useEffect(() => { getUnUsedDisksUpdate() }, [])
    useEffect(() => { getSpecificStorage() }, [])


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
                                                            // value={cStorageData.storageName || ""}
                                                            defaultValue={cStorageData.storageName}
                                                            onChange={handleStorageDataChange}
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
                                                            name="storageType"
                                                            // value={cStorageData.storageType || ""}
                                                            defaultValue={cStorageData.storageType}
                                                            onChange={handleStorageDataChange}
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
                                            <Row className="mb-3 border-bottom">
                                                <Col lg={4}>
                                                    <h5 className="card-header bg-transparent">Available Disks</h5>
                                                </Col>
                                                <Col lg={4} className="d-flex justify-content-center">
                                                    <h6 className="modal-title mt-2 text-warning " id="myModalLabel1">
                                                        Please Select Minimum {totalS} Disk
                                                    </h6>
                                                </Col>
                                                <Col lg={4}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        style={{ float: "right" }}
                                                        onClick={handleUpdate}
                                                    >
                                                        Update
                                                    </button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {selectedDisks && selectedDisks ? (selectedDisks.map((value, index) => {
                                                    return (
                                                        <Col lg="2" key={index} id={"liId_" + value.id} onClick={() => { handleSelectedClick(value) }}>
                                                            <a>
                                                                <Card className="mini-stats-wid shadow-lg rounded-2 border-danger border-2 card3 eee" id={"cardId1_" + value.id} >
                                                                    <CardBody className="p-3">
                                                                        <Row>
                                                                            <Col lg={12}>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="d-flex flex-wrap">
                                                                                        <div className="me-2">
                                                                                            <p className="mb-0">Name: </p>
                                                                                            <p className="mb-0">Size: </p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p className="text-muted mb-0 text-truncate" style={{ maxWidth: "75px" }}>{value.diskName}</p>
                                                                                            <p className="text-muted mb-0">{value.diskSize}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </a>
                                                            <UncontrolledTooltip placement="top" target={"cardId1_" + value.id}>
                                                                {"Remove " + value.diskName}
                                                            </UncontrolledTooltip>

                                                        </Col>
                                                    )
                                                })) : null}
                                            </Row>
                                            <Row className="bg-transparent mb-4">
                                                <Col>
                                                    <Progress color={"warning"} className="progress-xl" value={75}></Progress>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {unSelectDisks && unSelectDisks ? (unSelectDisks.map((value, index) => {
                                                    return (
                                                        <Col lg="2" key={index} id={"liId_" + value.id} onClick={() => { handleUnSelectedClick(value) }}>
                                                            <a>
                                                                <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-2 card2 eee" id={"cardId_" + value.id} >
                                                                    <CardBody className="p-3">
                                                                        <Row>
                                                                            <Col lg={12}>
                                                                                <div className="d-flex flex-wrap">
                                                                                    <div className="d-flex flex-wrap">
                                                                                        <div className="me-2">
                                                                                            <p className="mb-0">Name: </p>
                                                                                            <p className="mb-0">Size: </p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p className="text-muted mb-0 text-truncate" style={{ maxWidth: "75px" }}>{value.diskName}</p>
                                                                                            <p className="text-muted mb-0">{value.diskSize}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </a>
                                                            <UncontrolledTooltip placement="top" target={"cardId_" + value.id}>
                                                                {"Add " + value.diskName}
                                                            </UncontrolledTooltip>

                                                        </Col>
                                                    )
                                                })) : null}
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