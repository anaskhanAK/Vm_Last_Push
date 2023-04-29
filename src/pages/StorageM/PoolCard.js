import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, FormFeedback, NavItem, NavLink, Row, TabContent, TabPane, Progress, CardTitle, Table, Button } from "reactstrap";
import { LiData } from "./LiData";
import { Link } from 'react-router-dom';
import SimpleBar from "simplebar-react";
import { useLazyQuery } from "@apollo/client";
import { GET_STORAGE_DATA, GET_USER_POOLS } from "gqlOprations/Queries";
import DiskCard from './DiskCard';

const PoolCard = () => {

    const [poolArray, setPoolArray] = useState()
    const [storageIds, setStorageIds] = useState()

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

    // const [getUserPools, { loading: loadingA, data: dataA, error: errorA }] = useLazyQuery(GET_USER_POOLS, {
    //     variables: {
    //         input: {
    //             token: mvToken
    //         },
    //     },
    //     onCompleted: (DataA) => {
    //         console.log(DataA.getStorageList)
    //         // setPoolArray(DataA.getStorageList);
    //         const lenOfIds = DataA.getStorageList.length
    //         console.log(lenOfIds)
    //     },

    //     fetchPolicy: "cache-and-network"
    // })

    const [getStorageData, { loading: loadingB, data: dataB, error: errorB }] = useLazyQuery(GET_STORAGE_DATA, {
        variables: {
            input: {
                token: mvToken
            },
        },
        onCompleted: (DataB) => {
            console.log(DataB.getStorageDetailsDisk.storage, "dataB")
            setPoolArray(DataB.getStorageDetailsDisk);
        },

        fetchPolicy: "cache-and-network"
    })

    // useEffect(() => { getUserPools() }, [])
    useEffect(() => { getStorageData() }, [])

    return (
        <React.Fragment>
            <Row>
                <Col lg={7}>
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
                                {poolArray && poolArray ? (poolArray.storage.length > 0 || poolArray.storage.length > 0 ? ((poolArray.storage.map((value, index) => {
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
                                                                <p className="text-muted mb-2">{value.storageName}</p>
                                                                <p className="text-muted mb-2">{value.storageType}</p>
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
                                                            <Progress color="warning" className="progress-md" value={50}></Progress>
                                                            {/* {value.raid < 3 || value.raid < 3 ? (
                                                        <Progress color="success" className="progress-md" value={value.pst}></Progress>
                                                    ) : <Progress color="warning" className="progress-md" value={value.pst}></Progress>} */}
                                                        </div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                }))):<Col className="d-flex justify-content-center"> No Storage Yet </Col>) :
                                    <Col className="d-flex justify-content-center"> No Storage Yet </Col>
                                }
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={5}>
                    <DiskCard
                        diskData={poolArray}
                    />
                </Col>
            </Row>
        </React.Fragment >
    )
}

export default PoolCard