import { useLazyQuery } from '@apollo/client';
import { GET_USER_VMS } from 'gqlOprations/Queries';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container, Col, UncontrolledTooltip, Row, Badge, Button, Spinner } from 'reactstrap';
import Vm from "../../assets/images/1..jpg";

const VmCard = () => {

  const [vmsList, setVmsList] = useState([]);

  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
    console.log(state)
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
  const mvid = getCookies("MvUserId");

  const [getUserVms, { loading, data, error }] = useLazyQuery(GET_USER_VMS, {
    variables: {
      input: {
        token: mvToken
      }
    }
  });
  // if(data) console.log(data);
  // if(loading) console.log("loading...")
  // if(error) console.log(error.message)

  useEffect(() => {
    if (loading) console.log("loading...")
    if (data) {
      // console.log(data);
      setVmsList(p => (data.getUserAllVM));
      // console.log(vmsList)
    }
    if (error) console.log(error)
  }, [data])

  useEffect(() => { getUserVms() }, [])

  return (
    <React.Fragment>
      {vmsList.map(e => {
        return <Col xl="4" sm="6" key={e.id} value={e.VirtualMachine_Name}>
          <Card>
            <Link to={`/vmdetails/${e.id}`}>
              <CardBody>

                <div className="d-flex">

                  <Col lg="3">
                    <div className="avatar-md me-4">
                      <span className="avatar-title rounded bg-light text-danger font-size-16">
                        <img src={Vm} height="69" width="69" style={{ borderRadius: "4px" }} />
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
                      <Spinner type="grow" size="sm" color="success" style={{ display: state ? '' : 'none' }} />
                    </div>
                  </Col>
                </div>
              </CardBody>
            </Link>

            <div className="px-4 py-3 border-top">
              <Row>
                <Col lg="10">
                  <div className="d-grid gap-2">
                    <Button onClick={toggle} color={state ? 'danger' : 'success'} type="button" className="btn btn-label" >
                      <i className={state ? 'bx bx-power-off label-icon' : 'bx bx-key label-icon'}></i>
                      {state ? 'STOP' : 'START'}
                    </Button>
                  </div>
                </Col>

                <Col lg="1">
                  <Link to="/update-vm">
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
                      value=""
                      id="defaultCheck1"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      })}

    </React.Fragment>

  )
}

export default VmCard