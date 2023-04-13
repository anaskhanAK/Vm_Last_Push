import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import SocketIOFileUploadServer from "socketio-file-upload";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LiData1 } from "./LiData";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Modal,
    Container,
    Label,
    Progress,
    Input,
    FormFeedback,
    Form,
    Alert
} from "reactstrap";


const AddDiskModel = (props) => {

    const [checklist, setchecklist] = useState([])
    const [checkValue, setcheckValue] = useState([])
    const [modal_standard, setmodal_standard] = useState(false);
    const [alert, setAlert] = useState()
    const [progressColor, setProgressColor] = useState("")

    // console.log(props.dataParentToChild)

    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    const handleCheck = (e) => {
        // console.log(e)
        const conId = document.getElementById("cardId"+e.id);
        console.log(conId)
        conId.classList.remove("border-primary");
        conId.classList.add("border-success")

        // console.log(e)
        const id = e.id
        const value = e.us
        const hashValue = checklist.includes(id);
        console.log(hashValue)
        if (hashValue === true) {
            const index = checklist.indexOf(id);

            if (index > -1) {
                checklist.splice(index, 1)
                checkValue.splice(index, 1)
                console.log("true")
                const conId = document.getElementById("cardId"+e.id);
                console.log(conId)
                conId.classList.remove("border-success");
                conId.classList.add("border-primary")
            }
        }
        if (hashValue === false) {
            console.log("false")
            checklist.push(id)
            checkValue.push(value)
            const conId = document.getElementById("cardId"+e.id);
            console.log(conId)
            conId.classList.remove("border-primary");
            conId.classList.add("border-success")
        }
        if (checkValue.length > 1) {
            if (checkValue[0] !== checkValue[1]) {
                setProgressColor("warning")
            }
        }
        else { setProgressColor("success") }

        console.log(checkValue)
        console.log(checklist)
    }


    return (
        <React.Fragment>
            <Col>
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            tog_standard();
                        }}
                        className="btn btn-primary btn-label mt-4"
                        data-toggle="modal"
                        data-target="#myModal"
                    >
                        <i className="bx bxs-disc label-icon"></i> Add Disks
                    </button>
                    <Modal
                        size="xl"
                        className="modal-dialog-centered"
                        isOpen={modal_standard}
                        toggle={() => {
                            tog_standard();
                        }}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                                Select Disks
                            </h5>
                            <button
                                type="button"
                                onClick={() => {
                                    setmodal_standard(false);
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <Row>
                                {LiData1.map((value, index) => {
                                    return (
                                        <Col lg="2" key={index} id={"liId_"+value.id} onClick={()=>{handleCheck(value)}}>
                                            <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-2" id={"cardId"+value.id}>
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
                                            {/* <Card className="mini-stats-wid shadow-lg rounded-2 border-primary border-1">
                                                <CardBody>
                                                    <Row>
                                                        <Col lg={10}>
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
                                                        </Col>
                                                        <Col lg={2}>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value={value}
                                                                onClick={() => handleCheck(value)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card> */}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>

                        <div className="modal-footer">
                            <Col lg={11}>
                                <Progress color={progressColor || "success"} className="progress-xl" value={75} style={{ height: "37px" }}></Progress>
                            </Col>
                            <Col style={{ float: "right" }}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ float: "right" }}
                                // onClick={handleVmPassSubmit}
                                >
                                    Add
                                </button>
                            </Col>
                        </div>
                    </Modal>
                </div>
            </Col>

        </React.Fragment >
    )
}

export default AddDiskModel