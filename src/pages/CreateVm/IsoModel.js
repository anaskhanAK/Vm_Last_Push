import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import SocketIOFileUploadServer from "socketio-file-upload";

import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Modal,
    Container,
    Label,
    Progress
} from "reactstrap";


const IsoModel = () => {

    const [modal_standard, setmodal_standard] = useState(false);
    const [filename, setFilename] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)

    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    const uplaodURL = 'http://placed.ro:2000';

    useEffect(() => {
        var socket = io.connect(uplaodURL)
        var uploader = new SocketIOFileUploadServer(socket)

        // uploader.addEventListener("complete", function (event) {
        //     console.log(event.file.name, 'Upload Complete');

        // })
        // uploader.addEventListener("choose", function (event) {
        //     console.log(event.file, "Choose");
        // })
        // uploader.addEventListener("start", function (event) {
        //     console.log(event.file.name, "Start");
        //     setFilename(p => (event.file.name))
        //     const videoFile = event.file
        // })
        // uploader.addEventListener("progress", function (event) {
        //     setUploadPercentage(p => (event.bytesLoaded / event.file.size * 100))
        //     console.log(event.bytesLoaded / event.file.size * 100, 'Upload progress');
        // })
        // uploader.addEventListener("load", function (event) {
        //     console.log(event.file.name, "load");
        // })
        // uploader.addEventListener("error", function (event) {
        //     console.error(event.message)
        // })
        // uploader.useBuffer = true
        // uploader.chunkSize = ((1 * 1000) * (0.2 * 1000))
        // //uploader.maxFileSize = 90000
        // // uploader.useText = true
        // // uploader.serializedOctets = true

        // uploader.listenOnInput(document.getElementById("file-upload-btn"));
        // uploader.listenOnInput(document.getElementById("file-upload-btn"));

        // document.getElementById("file-upload-btn").addEventListener("click", uploader.prompt, false);
console.log(document.getElementById("file-upload-btn"),'sss')
    }, [])

    return (
        <React.Fragment>

            <Col >
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            tog_standard();
                        }}
                        className="btn btn-primary "
                        data-toggle="modal"
                        data-target="#myModal"
                    >
                        Upload
                    </button>

                    <Modal
                        isOpen={modal_standard}
                        toggle={() => {
                            tog_standard();
                        }}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                                Modal Heading
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
                                <div className="mb-3">
                                    <Label for="basicpill-phoneno-input3">
                                        ISO File
                                    </Label>
                                    <div>

                                        <div>
                                            <div className="d-flex">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    onChange={(e) => { }}
                                                    placeholder="choose file"
                                                    value={filename}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                <input type="file" hidden id="file-input"/>
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
                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={() => {
                                    tog_standard();
                                }}
                                className="btn btn-secondary "
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary "
                            >
                                Save changes
                            </button>
                        </div>
                    </Modal>
                </div>
            </Col>

        </React.Fragment>
    )
}

export default IsoModel