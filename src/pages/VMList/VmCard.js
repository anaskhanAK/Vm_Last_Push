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

  const [state, setState] = useState(false);

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

  const [changeVmStatus, { loading: loadingA, data: dataA, error: errorA }] = useMutation(VM_ACTION)

  const [getUserVms, { loading, data, error }] = useLazyQuery(GET_USER_VMS, {
    variables: {
      input: {
        token: mvToken
      }
    }
  });

  if(dataA) console.log("This Is Data A", dataA)

  const toggle = (id) => {
    const rr = vmsList.map((item) => {
      // console.log(item.id, id, 'item.id=id');
      if (item.id == id) {
        item.isSelected = true
        changeVmStatus({
          variables: {
            input: {
              "button": false,
              "id": id,
              "token": mvToken
            }
          }
        })
      }
      return item
    })
    setVmsList(rr)
  }

  const toggleD = (id) => {
    const rr = vmsList.map((item) => {
      // console.log(item.id, id, 'item.id=id');
      if (item.id == id) {
        item.isSelected = false
        console.log(id)
        changeVmStatus({
          variables: {
            input: {
              "button": true,
              "id": id,
              "token": mvToken
            }
          }
        })
      }
      return item
    })
    setVmsList(rr)
  }



  useEffect(() => {
    getUserVms()
    console.log(data,'dd')
    if (loading) console.log("loading...")
    if (data) {

      let array = []
      data.getUserAllVM.map((item) => {

        const data = {
          "VM_Image": item.VM_Image,
          "VirtualMachine_Name": item.VirtualMachine_Name,
          "Status": item.Status,
          "id": item.id,
          "isSelected": false
        }
        array.push(data)

      })
      setVmsList(array)
    };
    if (error) console.log(error.message)
  }, [data])

useEffect(()=>{ getUserVms()},[dataA])

  return (
    <React.Fragment>
      {vmsList && vmsList ? (vmsList.map((e, ind) => {
        // console.log(e.id,'eeeeeeeeeeeeeeeeeeeeeeeeee');
        return (
          <>
            {e.isSelected || e.Status ?
              <Col xl="4" sm="6" key={ind} value={e.VirtualMachine_Name}>
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
                            <Spinner type="grow" size="sm" color="success" />
                          </div>
                        </Col>
                      </div>
                    </CardBody>
                  </Link>

                  <div className="px-4 py-3 border-top">
                    <Row>
                      <Col lg="10">
                        <div className="d-grid gap-2">

                          <Button onClick={() => toggle(e.id)} color={'danger'} type="button" className="btn btn-label" >
                            <i className={'bx bx-power-off label-icon'}></i>
                            {'STOPE'}
                          </Button>

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
                            value=""
                            id="defaultCheck1"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
              :
              <Col xl="4" sm="6" key={ind} value={e.VirtualMachine_Name}>
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
                            {/* <Spinner type="grow" size="sm" color="success" style={{ display: state ? '' : 'none' }} /> */}
                          </div>
                        </Col>
                      </div>
                    </CardBody>
                  </Link>

                  <div className="px-4 py-3 border-top">
                    <Row>
                      <Col lg="10">
                        <div className="d-grid gap-2">



                          <Button onClick={() => toggleD(e.id)} color={'success'} type="button" className="btn btn-label" >
                            <i className={'bx bx-key label-icon'}></i>
                            {'START'}
                          </Button>

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
                            value=""
                            id="defaultCheck1"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            }
          </>
        )

      })) : getUserVms()}

    </React.Fragment>

  )
}

export default VmCard