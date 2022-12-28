import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import UploadImg from "pages/CreateVm/UploadImg";
import RamSlider from "pages/CreateVm/RamSlider";
import StoregeSlider from "pages/CreateVm/StoregeSlider";
import { io } from "socket.io-client";
import SocketIOFileUploadServer from "socketio-file-upload";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_IOS_BY_ID } from "gqlOprations/Queries";
import IsoModel from "pages/CreateVm/IsoModel";
import { CREATE_ISO } from "gqlOprations/Mutations";


const DcVm = () => {

    const [passedSteps, setPassedSteps] = useState([1])
    const [passedStepsVertical, setPassedStepsVertical] = useState([1])
    const [activeTabVartical, setoggleTabVertical] = useState(1)
    const [filename, setFilename] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [isoList, setIsoList] = useState([])
    const [selectedOption, setSelectedOption] = useState()


    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

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
    const mvid = getCookies("MvUserId");
    // console.log(mvid)


    const [getIsoList, { loading: loadingA, data: dataA, error: errorA }] = useLazyQuery(GET_IOS_BY_ID, {
        variables: {
            input: {
                token: mvToken
            }
        }
    });

    const [createIso, { loading: loadingB, data: dataB, error: errorB }] = useMutation(CREATE_ISO);

    if (loadingB) { console.log("loadingb...") }
    if (dataB) console.log(dataB)
    if (errorB) { console.log(errorB.message) }

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    function toggleTabVertical(tab) {
        if (activeTabVartical !== tab) {
            var modifiedSteps = [...passedStepsVertical, tab]

            if (tab >= 1 && tab <= 4) {
                setoggleTabVertical(tab)
                setPassedStepsVertical(modifiedSteps)
            }
        }
    }

    const uplaodURL = 'http://placed.ro:2000';

    useEffect(() => {
        var socket = io.connect(uplaodURL)
        var uploader = new SocketIOFileUploadServer(socket)

        uploader.addEventListener("complete", function (event) {
            console.log(event.file.name, 'Upload Complete');
            console.log(event.file, "111this is file ");
            createIso({
                variables: {
                    input: {
                        Name: event.file.name,
                        Size: event.file.size,
                        Type: event.file.type,
                        userId: mvid
                    }
                }
            })

            window.location.reload(false);

        })
        uploader.addEventListener("choose", function (event) {
            console.log(event.file, "Choose");
        })
        uploader.addEventListener("start", function (event) {
            console.log(event.file.name, "Start");
            setFilename(p => (event.file.name))
            const videoFile = event.file
        })
        uploader.addEventListener("progress", function (event) {
            setUploadPercentage(p => (event.bytesLoaded / event.file.size * 100))
            console.log(event.bytesLoaded / event.file.size * 100, 'Upload progress');
        })
        uploader.addEventListener("load", function (event) {
            console.log(event.file.name, "load");
        })
        uploader.addEventListener("error", function (event) {
            console.error(event.message)
        })
        uploader.useBuffer = true
        uploader.chunkSize = ((1 * 1000) * (0.2 * 1000))
        //uploader.maxFileSize = 90000
        // uploader.useText = true
        // uploader.serializedOctets = true

        uploader.listenOnInput(document.getElementById("file-upload-btn"));

        document.getElementById("file-upload-btn").addEventListener("click", uploader.prompt, false);



    }, [])

    useEffect(() => {
        if (loadingA) console.log("loading...")
        if (dataA) {
            setIsoList(p => (dataA.getIOSById))
            console.log(dataA)
        }
        if (errorA) console.log(errorA)
    }, [dataA])

    useEffect(() => { getIsoList() }, [])

    return (
        <React.Fragment>
            {/* <Form> */}
            <Col lg="12">
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Create VM</h4>
                        <div className="vertical-wizard wizard clearfix vertical">
                            <div className="steps clearfix">
                                <p>  </p>
                                <ul>
                                    <NavItem
                                        className={classnames({
                                            current: activeTabVartical === 1,
                                        })}
                                    >
                                        <NavLink
                                            className={classnames({
                                                active: activeTabVartical === 1,
                                            })}
                                            onClick={() => {
                                                toggleTabVertical(1)
                                            }}
                                            disabled={!(passedStepsVertical || []).includes(1)}
                                        >
                                            <span className="number">1.</span> CreateVm
                                        </NavLink>
                                    </NavItem>
                                    <NavItem
                                        className={classnames({
                                            current: activeTabVartical === 2,
                                        })}
                                    >
                                        <NavLink
                                            className={classnames({
                                                active: activeTabVartical === 2,
                                            })}
                                            onClick={() => {
                                                toggleTabVertical(2)
                                            }}
                                            disabled={!(passedStepsVertical || []).includes(2)}
                                        >
                                            <span className="number">2.</span>{" "}
                                            <span>Upload VM Image</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem
                                        className={classnames({
                                            current: activeTabVartical === 3,
                                        })}
                                    >
                                        <NavLink
                                            className={
                                                (classnames({
                                                    active: activeTabVartical === 3,
                                                }),
                                                    "done")
                                            }
                                            onClick={() => {
                                                toggleTabVertical(3)
                                            }}
                                            disabled={!(passedStepsVertical || []).includes(3)}
                                        >
                                            <span className="number">3.</span> Advance Options
                                        </NavLink>
                                    </NavItem>
                                    <NavItem
                                        className={classnames({
                                            current: activeTabVartical === 4,
                                        })}
                                    >
                                        <NavLink
                                            className={
                                                (classnames({
                                                    active: activeTabVartical === 4,
                                                }),
                                                    "done")
                                            }
                                            onClick={() => {
                                                toggleTabVertical(4)
                                            }}
                                            disabled={!(passedStepsVertical || []).includes(4)}
                                        >
                                            <span className="number">4.</span> Confirm Detail
                                        </NavLink>
                                    </NavItem>
                                </ul>
                            </div>
                            <div className="content clearfix">
                                <TabContent
                                    activeTab={activeTabVartical}
                                    className="body"
                                >
                                    <TabPane tabId={1}>
                                        <Form>
                                            <Row>
                                                <Col lg="6">
                                                    <Row>
                                                        <div className="mb-3" >
                                                            <Label for="basicpill-phoneno-input3">
                                                                Name:
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="vm-name"
                                                                placeholder="Enter VM Name"

                                                            />
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="mb-3">
                                                            <Label for="basicpill-phoneno-input3">
                                                                ISO File
                                                            </Label>
                                                            <div>

                                                                <div>
                                                                    <div className="d-flex">
                                                                        {/* <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            onChange={(e) => { }}
                                                                            placeholder="choose file"
                                                                            value={filename}
                                                                            style={{ marginRight: "5px" }}
                                                                            // list="isoNames"
                                                                            // name ="isoNames"
                                                                        /> */}
                                                                        <select defaultValue="0" className="form-select" style={{ marginRight: "5px" }}>
                                                                            <option value="0">Choose...</option>
                                                                            {isoList.map(e => {
                                                                                return <option key={e.id} value={e.Name}> {e.Name} </option>
                                                                            })}

                                                                        </select>
                                                                        <button
                                                                            style={{ margin: "0px" }}
                                                                            id="file-upload-btn"
                                                                            className="btn btn-primary"
                                                                            onClick={(e) => e.preventDefault()}
                                                                        >
                                                                            Upload
                                                                        </button>
                                                                    </div>
                                                                    <Progress
                                                                        className="progress-sm"
                                                                        color="primary"
                                                                        value={uploadPercentage}
                                                                        style={{ marginTop: "3px" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="mb-3">
                                                            <Label for="basicpill-phoneno-input3">
                                                                Operating System:
                                                            </Label>
                                                            <select className="form-control">
                                                                <option> Windows </option>
                                                                <option> Linux </option>
                                                                <option> IOS </option>
                                                                <option> Others </option>
                                                            </select>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <Row>
                                                        <StoregeSlider />
                                                    </Row>
                                                    <br></br>

                                                    <Row>
                                                        <RamSlider />
                                                    </Row>
                                                    <Row>
                                                        <div style={{ height: "10px" }}></div>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </TabPane>
                                    <TabPane tabId={2}>
                                        <div>
                                            <Form>
                                                <div className="row justify-content-center">
                                                    <Col lg="6">
                                                        <div className="text-center">
                                                            <div style={{ height: "250px" }}>
                                                                <img ref={uploadedImage} width="270px" height="250px" style={{ borderRadius: "5px" }}></img>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg="6">
                                                        <div className="text-center" style={{ height: "265px" }}>
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <Input className="form-control" type="file" id="formFile" accept="image/*" onChange={handleImageUpload} ref={imageUploader} />
                                                        </div>
                                                    </Col>
                                                </div>
                                            </Form>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId={3}>
                                        <div>
                                            <Form>
                                                <Row>
                                                    <Col lg="6">
                                                        <Row>
                                                            <div className="mb-3">
                                                                <Label for="basicpill-phoneno-input3">
                                                                    CPU's:
                                                                </Label>
                                                                <select className="form-control">
                                                                    <option> 0 </option>
                                                                    <option> 1 </option>
                                                                    <option> 2 </option>
                                                                    <option> 3 </option>
                                                                    <option> 4 </option>
                                                                    <option> 5 </option>
                                                                </select>
                                                                <Label> minimum requird 2 </Label>
                                                            </div>
                                                        </Row>
                                                        <br></br>
                                                        <br></br>
                                                        <Row>
                                                            <div className="mb-3">
                                                                <Label for="basicpill-phoneno-input3">
                                                                    TPM Module:
                                                                </Label>
                                                                <div
                                                                    className="form-check form-switch form-switch-lg mb-3"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="customSwitchsizelg"
                                                                        defaultChecked
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="customSwitchsizelg"
                                                                    >
                                                                        Switch
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col lg="6">
                                                        <Row>
                                                            <div className="mb-3">
                                                                <Label for="basicpill-phoneno-input3">
                                                                    I/O Diaries:
                                                                </Label>
                                                                <select className="form-control">
                                                                    <option> 0 </option>
                                                                    <option> 1 </option>
                                                                    <option> 2 </option>
                                                                    <option> 3 </option>
                                                                    <option> 4 </option>
                                                                    <option> 5 </option>
                                                                </select>
                                                                <Label> Create </Label>
                                                            </div>
                                                        </Row>
                                                        <br></br>
                                                        <br></br>
                                                        <Row>
                                                            <div className="mb-3">
                                                                <Label for="basicpill-phoneno-input3">
                                                                    Network:
                                                                </Label>
                                                                <select className="form-control">
                                                                    <option> 0 </option>
                                                                    <option> 1 </option>
                                                                    <option> 2 </option>
                                                                    <option> 3 </option>
                                                                    <option> 4 </option>
                                                                    <option> 5 </option>
                                                                </select>
                                                                <Label> Create </Label>
                                                            </div>
                                                        </Row>
                                                        <div style={{ height: "10px" }}></div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>
                            <div className="actions clearfix">
                                <ul>
                                    <li
                                        className={
                                            activeTabVartical === 1
                                                ? "previous disabled"
                                                : "previous"
                                        }
                                    >
                                        <Link
                                            to="#"
                                            onClick={() => {
                                                toggleTabVertical(activeTabVartical - 1)
                                            }}
                                        >
                                            Previous
                                        </Link>
                                    </li>
                                    {activeTabVartical < 3 && activeTabVartical < 3 ? (
                                        <li
                                            className={
                                                activeTabVartical === 4 ? "next disabled" : "next"
                                            }
                                        >
                                            <Link
                                                to="#"
                                                onClick={() => {
                                                    toggleTabVertical(activeTabVartical + 1)
                                                }}
                                            >
                                                Next
                                            </Link>
                                        </li>
                                    ) :
                                        <button
                                            style={{ margin: "0px" }}
                                            id="update-submit"
                                            type="submit"
                                            className="btn btn-primary">
                                            Submit
                                        </button>
                                    }
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            {/* </Form> */}
        </React.Fragment>
    )
};



export default DcVm;
