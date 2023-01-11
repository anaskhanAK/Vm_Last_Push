import React from 'react'
import { Card, CardBody, Col, Button, Container, CardImg, CardText, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, CardTitle, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import RamSlider from 'pages/CreateVm/RamSlider'
import StoregeSlider from 'pages/CreateVm/StoregeSlider'
import Vm from "../../assets/images/1..jpg";
import { useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_CONFIG, GET_SPECIFIC_VM } from 'gqlOprations/Queries'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UPDATE_VM } from 'gqlOprations/Mutations'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import alt from "assets/images/Azure.png"


const UpdateVm = () => {
    document.title = "Update VM";

    toastr.options = {
        positionClass: "toast-top-center",
        closeButton: true,
    }

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

    const { vmId } = useParams();

    const [vmUpdateData, setVmUpdateData] = useState({});
    const [updateImg, setUpdateImg] = useState();
    const [config, setConfig] = useState();

    const getStorageVal = (storage) => {
        console.log("this is Storage Value From Update Vm : ", storage);
        setConfig({
            ...config,
            getConfigFile: {
                ...config.getConfigFile,
                Storage: storage
            }
        })
    };

    const getRamVal = (ram) => {
        console.log("this is Ram Value From Update Vm : ", ram);
        setConfig({
            ...config,
            getConfigFile: {
                ...config.getConfigFile,
                Memory: ram
            }
        })
    };


    const [updateVm, { loading: loadingB, data: dataB, error: errorB }] = useMutation(UPDATE_VM)
    const [getCurrant, { loading: loadingC, data: dataC, error: errorC }] = useLazyQuery(GET_SPECIFIC_VM, {
        variables: {
            input: {
                token: mvToken,
                id: vmId
            }
        },
        onCompleted: dataC => {
            setVmUpdateData(dataC.getSpecificVM);
            const jsonConfig = JSON.parse(dataC.getSpecificVM.Config);
            // console.log(jsonConfig)
            setConfig(p => (jsonConfig))
        },
        fetchPolicy: "cache-and-network"
    });

    const handleUpdateChange = (e) => {
        setVmUpdateData({
            ...vmUpdateData,
            [e.target.name]: e.target.value
        }
        );
    }

    const handleImageUp = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUpdateImg(reader.result.toString());
            const eImage = reader.result.toString();
            console.log(eImage)
            setVmUpdateData(prevState => ({
                ...prevState,
                vmImage: eImage
            })
            )
        };
        reader.readAsDataURL(file)
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault(),
            console.log("nnnn")
        const strConfig = JSON.stringify(config);
        updateVm({
            variables: {
                input: {
                    "Status": false,
                    "Config": strConfig,
                    "token": mvToken,
                    "Title": vmUpdateData.virtualMachineName,
                    "virtualMachineName": vmUpdateData.virtualMachineName,
                    "Description": vmUpdateData.Description,
                    "id": vmId,
                    "vmImage": vmUpdateData.vmImage || null,
                }
            },
            onCompleted: dataB => {
                toastr.success("Virtual Machine Updated");
                getCurrant()
                // console.log(dataB)
            }
        })
    };

    useEffect(() => { getCurrant() }, [])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Update VM" breadcrumbItem="Update VM" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <Row>
                                    <Col lg="4">
                                        <Card>
                                            <CardBody>
                                                <CardTitle className="mb-4">Update VM Image</CardTitle>
                                                <img
                                                    // src={updateImg || dataC && dataC ? ("http://167.99.36.48:3003/" + dataC.getSpecificVM.VM_Image.split("app/")[1]) : ""}
                                                    src={updateImg && updateImg ? (
                                                        updateImg
                                                    ) : (
                                                        dataC && dataC ? (
                                                            "http://167.99.36.48:3003/" + dataC.getSpecificVM.VM_Image.split("app/")[1]
                                                        ) : alt
                                                    )}
                                                    height="300px"
                                                    width="100%"
                                                />
                                                <CardBody>
                                                    <Row>
                                                        <Input
                                                            className="form-control"
                                                            type="file"
                                                            id="formFile"
                                                            accept="image/*"
                                                            name="vmImage"
                                                            onChange={handleImageUp}
                                                        />
                                                    </Row>
                                                </CardBody>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="8">
                                        <Card>
                                            <CardBody>
                                                <CardTitle className="mb-4"> Update VM Details </CardTitle>
                                                <Form onSubmit={handleUpdateSubmit}>
                                                    <Row>
                                                        <Col lg="6">
                                                            <Row>
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-phoneno-input3">
                                                                        Name:
                                                                    </Label>
                                                                    <p style={{ fontSize: "15px", marginBottom: "0px" }}> {vmUpdateData.VirtualMachine_Name} </p>
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-phoneno-input3">
                                                                        Change Name:
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="basicpill-phoneno-input3"
                                                                        placeholder="Enter VM Name"
                                                                        name='virtualMachineName'
                                                                        onChange={handleUpdateChange}
                                                                        value={vmUpdateData.virtualMachineName || ""}
                                                                    />
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                        Description:
                                                                    </Label>
                                                                    <textarea
                                                                        id="basicpill-address-input1"
                                                                        className="form-control"
                                                                        rows="2"
                                                                        placeholder="Description..."
                                                                        name='Description'
                                                                        onChange={handleUpdateChange}
                                                                        value={vmUpdateData.Description || ""}
                                                                    />
                                                                </div>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6">
                                                            <Row>
                                                                <StoregeSlider sValue={getStorageVal} />
                                                            </Row>
                                                            <br></br>
                                                            <Row>
                                                                <RamSlider rValue={getRamVal} />
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <div className="d-grid gap-2">
                                                            <Button color="primary" type="submit" className="btn-lg" >
                                                                UPDATE
                                                            </Button>
                                                        </div>
                                                    </Row>

                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container >
            </div >
        </React.Fragment >
    )
}

export default UpdateVm