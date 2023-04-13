import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Card, CardBody, Container, Col, Row, Spinner, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_VM, VM_ACTION } from 'gqlOprations/Mutations';
import { GET_USER_VMS } from 'gqlOprations/Queries';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import alt from "assets/images/Azure.png"


const VmList = () => {

    const history = useHistory();

    const [checklist, setchecklist] = useState([])
    const [vmsList, setVmsList] = useState([]);


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

    toastr.options = {
        positionClass: "toast-top-center",
        closeButton: true,
    }

    const [changeVmStatus, { loading: loadingA, data: dataA, error: errorA }] = useMutation(VM_ACTION)
    const [deleteVms, { loading: loadingB, data: dataB, error: errorB }] = useMutation(DELETE_VM)
    const [getUserVms, { loading: loadingC, data: dataC, error: errorC }] = useLazyQuery(GET_USER_VMS, {
        variables: {
            input: {
                token: mvToken
            },

        },
        onCompleted: (DataD) => {
            // console.log(DataD);
            // resetData(DataD)
            setVmsList(DataD.getUserAllVM);
        },

        fetchPolicy: "cache-and-network"
    });

    const resetData = () => {
        // console.log("this is reset data")
        // setTimeout(getUserVms(),3000)
        setTimeout(() => {
            // console.log("Delayed for 1 second.");
            getUserVms()
        }, "2000")
    }

    const toggleTrue = (id) => {
        // console.log(id)
        // console.log("////////")
        changeVmStatus({
            variables: {
                input: {
                    button: false,
                    id: id,
                    token: mvToken
                }
            },
            onCompleted: (dataO) => {
                // console.log(dataO);
                // setTimeout(resetData(), 5000)
                resetData()
                // getUserVms()
            }
        })
    }

    const toggleFalse = (id) => {
        // console.log(id)
        // console.log(".......")
        changeVmStatus({
            variables: {
                input: {
                    button: true,
                    id: id,
                    token: mvToken
                }
            },
            onCompleted: (dataI) => {
                // console.log(dataI)
                let timeout;
                // timeout = setTimeout(resetData(),3000)
                resetData()
                // getUserVms()
            }
        })
    }

    const handleCheck = (id) => {
        const value = id
        const hashValue = checklist.includes(value);
        // console.log(hashValue)
        if (hashValue === true) {
            const index = checklist.indexOf(value);
            if (index > -1) {
                checklist.splice(index, 1)
                // console.log("true")
            }
        }
        if (hashValue === false) {
            // console.log("false")
            checklist.push(value)
        }
    };

    const handleDeleteVms = () => {
        deleteVms({
            variables: {
                input: {
                    token: mvToken,
                    id: checklist
                }
            },
            onCompleted: dataB => {
                // console.log(dataB);
                toastr.success("Selected VMs Deleted");
                getUserVms()
                setchecklist([]);
            }
        });
    }

    useEffect(() => {
        getUserVms()
    }, [])

    document.title = "VM List";

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid={true}>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="VM List" />
                </Container>

                <div className='mb-2 overflow-auto' >
                    <button
                        className="btn btn-primary w-md float-end"
                        onClick={() => history.push('/createvm')}
                    >
                        Create VM
                    </button>
                    <button
                        className="btn btn-danger w-md float-end"
                        onClick={() => handleDeleteVms()}
                        style={{ marginRight: "10px" }}
                    >
                        Delete Selected VMs
                    </button>
                </div>

                <Row>
                    {vmsList && vmsList ? (vmsList.map((e, ind) => {
                        return <Col xl="4" sm="6" key={ind} value={e.virtualMachineName}>
                            <Card>
                                <Link to={`/vmdetails/${e.id}`}>
                                    <CardBody>

                                        <div className="d-flex">

                                            <Col lg="3">
                                                <div className="avatar-md me-4">
                                                    <span className="avatar-title rounded bg-light text-danger font-size-16">
                                                        <img src={"http://167.99.36.48:3003/" + e.vmImage.split("app/")[1] || alt} height="69" width="69" style={{ borderRadius: "4px" }} />
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col lg="8">
                                                <div className="flex-grow-1 overflow-hidden" style={{ marginTop: '25px' }}>

                                                    <h5 className="text-truncate font-size-15">
                                                        {e.virtualMachineName}
                                                    </h5>
                                                </div>
                                            </Col>
                                            <Col lg="1">
                                                <div style={{ marginTop: "27px", marginLeft: '15px' }}>
                                                    {e.status === true && e.status === true ? (
                                                        <Spinner type="grow" size="sm" color="success" />
                                                    ) : null}
                                                </div>
                                            </Col>
                                        </div>
                                    </CardBody>
                                </Link>

                                <div className="px-4 py-3 border-top">
                                    <Row>
                                        <Col lg="10">
                                            <div className="d-grid gap-2">

                                                {e.status === true && e.status === true ? (
                                                    <Button onClick={() => toggleTrue(e.id)} color={'danger'} type="button" className="btn btn-label" >
                                                        <i className={'bx bx-power-off label-icon'}></i>
                                                        {loadingA && loadingA ? (
                                                            <i className="bx bx-loader-alt bx-spin bx-sx"></i>
                                                        ) : "STOP"}
                                                    </Button>
                                                ) :
                                                    <Button onClick={() => toggleFalse(e.id)} color={'success'} type="button" className="btn btn-label" >
                                                        <i className={'mdi mdi-power-on label-icon'}></i>
                                                        {loadingA && loadingA ? (
                                                            <i className="bx bx-loader-alt bx-spin bx-sx"></i>
                                                        ) : "START"}
                                                    </Button>
                                                }

                                            </div>
                                        </Col>

                                        <Col lg="1">
                                            <Link to={`/update-vm/${e.id}`}>
                                                <div style={{ marginTop: "8px", display: "flex", justifyContent: "center" }}>
                                                    <i className="bx bx-edit bx-sm " />
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col lg="1">
                                            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", width: "20px" }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={e.id}
                                                    id={e.id}
                                                    onClick={() => handleCheck(e.id)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    })) : getUserVms()}
                </Row>
            </div>
        </React.Fragment>
    )
}

export default VmList;