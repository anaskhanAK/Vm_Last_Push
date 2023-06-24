import React, { useState } from "react";
import { useEffect } from "react";
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
    Alert,
    Tooltip,
    UncontrolledTooltip
} from "reactstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_UNUSED_DISKS } from "gqlOprations/Queries";
import { LiDisk1 } from "./LiData";
import "./card.scss"
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const EditDiskModel = (props) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState([])
    const [modal_standard, setmodal_standard] = useState(false);
    const [alert, setAlert] = useState()
    // const [progressColor, setProgressColor] = useState("")
    const [storageSize, setStorageSize] = useState()
    const [minimumSel, setMinimumSel] = useState("2")
    const [diskLi, setDiskLi] = useState()
    const [selectedObj, setSelectedObj] = useState()
    const [selectedIds, setSelectedIds] = useState()


    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
        checkOnSelected()
        setMinimumSel(props.numOfSelect)
    }

    const checkOnSelected = () => {
        if (modal_standard === false) {
            setTimeout(() => {
                selectedIds.forEach((item) => {
                    const getId = "cardId_" + item;
                    const getLi = document.getElementById(getId)
                    getLi.classList.add("bg-primary")
                });
            }, 400);
        }
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    const saveDisks = () => {
        const ids = selectedItems
        const Obj = diskLi.filter((item) => ids.includes(item.id));
        // console.log(Obj)
        console.log(parseInt(minimumSel))
        console.log(selectedItems.length)
        if (selectedItems.length < parseInt(minimumSel)) {
            const elem = document.getElementById("myModalLabel1")
            elem.classList.add("shake")
            setTimeout(() => {
                elem.classList.remove("shake")
            }, 500);
        } else {
            props.finalDisks(Obj)
            setSelectedItems([])
            tog_standard()
        }
    };

    const handleItemClick = (item) => {
        const itemId = item.id;
        const getId = "cardId_" + itemId;
        const getLi = document.getElementById(getId)
        const isSelected = selectedItems.includes(itemId);
        if (isSelected) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
            const getLi = document.getElementById(getId)
            getLi.classList.remove("bg-primary")
        } else {
            setSelectedItems([...selectedItems, itemId]);
            getLi.classList.add("bg-primary")
        }
    };

    let progressColor;
    if (selectedItems.length > 0) {
        const ids = selectedItems
        const Obj = diskLi.filter((item) => ids.includes(item.id));
        // console.log(Obj)
        const array = []
        for (let i = 0; i < Obj.length; i++) {
            const getVal = Obj[i].diskSize;
            array.push(getVal)
        }
        // console.log(array)

        const myArray = array;

        let areAllValuesSame = true;
        for (let i = 1; i < myArray.length; i++) {
            if (myArray[i] !== myArray[0]) {
                areAllValuesSame = false;
                break;
            }
        }

        if (areAllValuesSame == true) {
            progressColor = "success"
        }
        else {
            progressColor = "warning"
        }

    }


    useEffect(() => {
        if (props.allDisks) {
            if (props.selectedIds) {
                setDiskLi(props.allDisks)
                setSelectedIds(props.selectedIds);
                setSelectedItems(props.selectedIds)
            }
        }
    }, [props.allDisks, props.selectedIds])

    return (
        <React.Fragment>
            <Col>
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            tog_standard();
                        }}
                        className="btn btn-primary btn-label"
                        style={{ marginLeft: "-20px", fontSize: "12px", marginTop: "15px" }}
                        data-toggle="modal"
                        data-target="#myModal"
                    >
                        <i className="bx bxs-disc label-icon"></i> Edit Disks
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
                            <Col>
                                <h5 className="modal-title mt-0" id="myModalLabel">
                                    Select Disks
                                </h5>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <h6 className="modal-title mt-0 text-warning" id="myModalLabel1">
                                    Please Select Minimum {minimumSel} Disk
                                </h6>
                            </Col>
                            <Col>
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
                            </Col>

                        </div>

                        <div className="modal-body">
                            <Row>
                                {diskLi && diskLi ? (diskLi.map((value, index) => {
                                    return (
                                        <Col lg="2" key={index} id={"liId_" + value.id} onClick={() => { handleItemClick(value) }}>
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
                                                {value.diskName}
                                            </UncontrolledTooltip>

                                        </Col>
                                    )
                                })) : null}
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
                                    onClick={saveDisks}
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

export default EditDiskModel