import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_USER_VMS } from 'gqlOprations/Queries';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container, Col, UncontrolledTooltip, Row, Badge, Button, Spinner } from 'reactstrap';
import Vm from "../../assets/images/1..jpg";
import alt from "assets/images/Azure.png"
import { VM_ACTION } from 'gqlOprations/Mutations';

const VmCard = () => {

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

  const [getUserVms, { loading, data, error }] = useLazyQuery(GET_USER_VMS, {
    variables: {
      input: {
        token: mvToken
      },

    },
    onCompleted: data => {
      console.log(data);
      setVmsList(data.getUserAllVM);
    },
    fetchPolicy: "cache-and-network"
  });

  const [changeVmStatus, { loading: loadingA, data: dataA, error: errorA }] = useMutation(VM_ACTION)


  const toggleTrue = (id) => {
    // console.log(id)
    changeVmStatus({
      variables: {
        input: {
          button: false,
          id: id,
          token: mvToken
        }
      },
      onCompleted: () => getUserVms()
    })
  }

  const toggleFalse = (id) => {
    // console.log(id)
    changeVmStatus({
      variables: {
        input: {
          button: true,
          id: id,
          token: mvToken
        }
      },
      onCompleted: () => getUserVms()
    })
  }


  useEffect(() => {
    getUserVms()
  }, [])





  return (
    <React.Fragment>
      {vmsList && vmsList ? (vmsList.map((e, ind) => {
        return <Col xl="4" sm="6" key={ind} value={e.VirtualMachine_Name}>
          <Card>
            <Link to={`/vmdetails/${e.id}`}>
              <CardBody>

                <div className="d-flex">

                  <Col lg="3">
                    <div className="avatar-md me-4">
                      <span className="avatar-title rounded bg-light text-danger font-size-16">
                        <img src={"http://167.99.36.48:3003/" + e.VM_Image.split("app/")[1] || alt} height="69" width="69" style={{ borderRadius: "4px" }} />
                      </span>
                    </div>
                  </Col>
                  <Col lg="8">
                    <div className="flex-grow-1 overflow-hidden" style={{ marginTop: '25px' }}>

                      <h5 className="text-truncate font-size-15">
                        {e.VirtualMachine_Name}
                      </h5>
                    </div>
                  </Col>
                  <Col lg="1">
                    <div style={{ marginTop: "27px", marginLeft: '15px' }}>
                      {e.Status === true && e.Status === true ? (
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

                    {e.Status === true && e.Status === true ? (
                      <Button onClick={() => toggleTrue(e.id)} color={'danger'} type="button" className="btn btn-label" >
                        <i className={'bx bx-power-off label-icon'}></i>
                        {loadingA && loadingA ? (
                          <i className="bx bx-loader-alt bx-spin bx-sx"></i>
                        ) : "STOP"}
                      </Button>
                    ) :
                      <Button onClick={() => toggleFalse(e.id)} color={'success'} type="button" className="btn btn-label" >
                        <i className={'bx bx-power-off label-icon'}></i>
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
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      })) : getUserVms()}

    </React.Fragment>

  )
}

export default VmCard