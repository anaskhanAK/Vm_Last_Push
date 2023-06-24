import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table, Button, UncontrolledTooltip } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import Select from "react-select";
import EditDiskModel from "./EditDiskModal";
import { Create_Storage, UPDATE_DISK, UPDATE_STORAGE } from "gqlOprations/Mutations";
import { GET_STORAGE_DATA, GET_UNUSED_DISKS } from "gqlOprations/Queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import SimpleBar from "simplebar-react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const UpdateStorage = () => {

    const [storageData, setStorageData] = useState({
        storageType: "Fast Storage"
    });
    const [diskData, setDiskData] = useState()
    const [data_attr, setdata_attr] = useState(2);
    const [selectedDisks, setSelectedDisks] = useState()
    const [totalDiskSize, setTotalDiskSize] = useState()
    const [totalStorageSize, setTotalStorageSize] = useState()
    const [totalDiskIds, setTotalDiskIds] = useState()
    const [tLi, setTLi] = useState()

    const [selectionCount, setSelectionCount] = useState("2")
    const [disksForModal, setDisksForModal] = useState()
    const [unUsedDisks, setUnUsedDisks] = useState()
    const [selectedDisksIds, setSelectedDisksIds] = useState()
    const { storageId } = useParams()

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

    toastr.options = {
        positionClass: "toast-top-center",
        closeButton: true,
    }

    const mvToken = getCookies("MvUserToken");

    const [getUnUsedDisks, { loading: loadingA, data: dataA, error: errorA }] = useLazyQuery(GET_UNUSED_DISKS);
    const [createDisk, { loading: loadingB, data: dataB, error: errorB }] = useMutation(UPDATE_DISK);
    const [updateStorageCall, { loading: loadingD, data: dataD, error: errorD }] = useMutation(UPDATE_STORAGE);
    const [getSpecificStorage, { loading: loadingC, data: dataC, error: errorC }] = useLazyQuery(GET_STORAGE_DATA, {
        variables: {
            input: {
                token: mvToken,
                id: storageId
            },
        },
        onCompleted: (DataC) => {
            // console.log(DataC, "dataC")
            setSelectedDisks(DataC.getStorageDetailsDisk.disk)
            const sName = DataC.getStorageDetailsDisk.storage[0].storageName;
            const sType = DataC.getStorageDetailsDisk.storage[0].storageType;
            const sSize = DataC.getStorageDetailsDisk.storage[0].storageSize;
            setStorageData({
                ...storageData,
                storageName: sName,
                storageType: sType,
                storageSize: sSize
            })

            const ppp = DataC.getStorageDetailsDisk.disk
            const totalIds = []
            const array = []
            for (let i = 0; i < ppp.length; i++) {
                const getId = ppp[i].id;
                const getVal = ppp[i].diskSize;
                totalIds.push(getId)
                array.push(getVal)
            }

            const totalValue = array.reduce((a, b) => a + b, 0)
            setSelectedDisksIds(totalIds)
            setTLi(array)
            setTotalDiskSize(totalValue)
            setTotalDiskIds(totalIds)
        },

        fetchPolicy: "cache-and-network"
    })


    const getDiskList = (diskList) => {
        console.log("from perent", diskList)
        setSelectedDisks(diskList)
        const array = []
        const totalIds = []
        for (let i = 0; i < diskList.length; i++) {
            const getVal = diskList[i].diskSize;
            const getId = diskList[i].id;
            array.push(getVal)
            totalIds.push(getId)
        }
        const totalValue = array.reduce((a, b) => a + b, 0)
        console.log(totalValue)
        setTLi(array)
        setTotalDiskSize(totalValue)
        setTotalDiskIds(totalIds)
    }

    let totalSS;
    if (storageData.storageType) {
        let st = storageData.storageType;

        if (st == "Fast Storage") {
            // console.log("its fast")
            if (totalDiskSize) {
                // console.log("ssss")
                totalSS = totalDiskSize
                // console.log(totalDiskSize)
            }
        }
        if (st == "Safe Storage") {
            // console.log("its Safe")
            if (totalDiskSize) {
                let ddd = (totalDiskSize / 100) * 50;
                totalSS = ddd
            }
        }
        if (st == "Mixed Storage") {
            // console.log("its Mixed")
            if (tLi) {
                // console.log(tLi)
                // console.log(totalDiskSize)
                let sMin = Math.min.apply(null, tLi);
                let N = totalDiskSize
                const result = (N - 1) * sMin;
                totalSS = result
                // console.log(result);
            }
        }
        if (st == "Redundant Mixed Storage") {
            // console.log("its Redundant Mixed")
            if (tLi) {
                // console.log(tLi)
                // console.log(totalDiskSize)
                let sMin = Math.min.apply(null, tLi);
                let N = totalDiskSize;
                const result = (N - 2) * sMin;
                totalSS = result
                // console.log(result);
            }
        }
    }

    const handleStorageChange = (e) => {
        setStorageData({
            ...storageData,
            [e.target.name]: e.target.value
        })

        if (e.target.value == "Fast Storage") {
            setSelectionCount("2")
        }
        if (e.target.value == "Safe Storage") {
            setSelectionCount("2")
        }
        if (e.target.value == "Mixed Storage") {
            setSelectionCount("3")
        }
        if (e.target.value == "Redundant Mixed Storage") {
            setSelectionCount("4")
        }
    }


    const handleDiskSubmit = (idd) => {
        console.log(mvToken)
        console.log(idd, "idd")
        console.log(totalDiskIds, "totaDisksIds")
        console.log(totalSS, "totalSS")
        createDisk({
            variables: {
                input: {
                    "storageId": idd,
                    "id": totalDiskIds
                }
            },
            onCompleted: (dataB) => {
                toastr.success("Storage Created Successfully")
                console.log(dataB)
            }
        })
    }

    const handleStorageSubmit = () => {
        console.log("handleSubmit")
        console.log(storageData.storageName)
        console.log(storageData.storageType)
        console.log(totalSS)
        updateStorageCall({
            variables: {
                input: {
                    "token": mvToken,
                    "storageType": storageData.StorageType,
                    "storageSize": totalSS,
                    "storageName": storageData.storageName,
                    "id": storageId
                }
            },
            onCompleted: (dataD) => {
                console.log(dataD)
                let idd = dataD.updateStorage.id
                handleDiskSubmit(idd)
            }
        })

    }

    useEffect(() => { getSpecificStorage() }, [])
    useEffect(() => {
        if (dataA) {
            setUnUsedDisks(dataA.getUnAssignedDisk)
        }
    }, [dataA])
    useEffect(() => { getUnUsedDisks() }, [])
    useEffect(() => {
        if (selectedDisks) {
            if (unUsedDisks) {
                // console.log(selectedDisks.concat(unUsedDisks))
                const ddd = selectedDisks.concat(unUsedDisks)
                setDisksForModal(ddd)
            }
        }
    }, [selectedDisks, unUsedDisks])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Storage" breadcrumbItem="Update Storage" />
                    <Card>
                        <CardBody>
                            <Row>
                                <Col lg={6}>
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-3">
                                                <h5 className="card-header bg-transparent border-bottom">Update Storage</h5>
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
                                                        defaultValue={storageData.storageName}
                                                        onChange={handleStorageChange}
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
                                                        name="storageType"
                                                        onChange={handleStorageChange}
                                                        defaultValue={storageData.storageType}
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
                                                <h5 className="card-header bg-transparent border-bottom">Update Disk</h5>
                                            </Row>
                                            <Row>
                                                <Col lg={10} className="p-3">
                                                    <Card className="border-2">
                                                        <CardBody className="p-1 d-flex overflow-auto">
                                                            {selectedDisks && selectedDisks ? (
                                                                selectedDisks.map((value, index) => {
                                                                    return (
                                                                        <Col lg="2" className="p-0" key={index} style={{ marginRight: "3px" }}>
                                                                            <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-1 mb-0" id={"miniCard_" + value.id} >
                                                                                <CardBody className="p-2">
                                                                                    <Row>
                                                                                        <Col lg={12}>
                                                                                            <div className="d-flex flex-wrap">
                                                                                                <div className="d-flex flex-wrap">
                                                                                                    <div className="me-2">
                                                                                                        <p className="mb-0" style={{ fontSize: "7px" }}>Name: </p>
                                                                                                        <p className="mb-0" style={{ fontSize: "7px" }}>Size: </p>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <p className="text-muted mb-0 text-truncate" style={{ maxWidth: "25px", fontSize: "7px" }}>{value.diskName}</p>
                                                                                                        <p className="text-muted mb-0 text-truncate" style={{ maxWidth: "25px", fontSize: "7px" }}>{value.diskSize}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </CardBody>
                                                                            </Card>
                                                                            <UncontrolledTooltip placement="top" target={"miniCard_" + value.id}>
                                                                                {value.diskName}
                                                                            </UncontrolledTooltip>
                                                                        </Col>

                                                                    )
                                                                })
                                                            ) :
                                                                <Col>
                                                                    <div style={{ marginTop: "8px", marginBottom: "-6px", marginLeft: "10px" }}>
                                                                        <p> Please Select And Add Disks </p>
                                                                    </div>
                                                                </Col>
                                                            }

                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={2}>
                                                    <EditDiskModel
                                                        selectedIds={selectedDisksIds}
                                                        preSelectDisks={selectedDisks}
                                                        allDisks={disksForModal}
                                                        finalDisks={getDiskList}
                                                        numOfSelect={selectionCount}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <button
                                                        id="file-upload-btn"
                                                        className="btn btn-primary mt-4 float-end"
                                                        onClick={(e) => handleStorageSubmit()}
                                                    >
                                                        Update Now
                                                    </button>
                                                </Col>
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

export default UpdateStorage