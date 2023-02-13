import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"

import Slider from "react-rangeslider"
import "react-rangeslider/lib/index.css"

const StoregeSlider = (props) => {

  const formatkg = value => " " + value;
  const [prefix, setprefix] = useState(0);
  const [con, setCon] = useState("MB")
  const [valueToShow, setValueToShow] = useState(0)

  function valueLabelFormat(value) {

    const units = ['MB', 'GB'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 1024 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 1024;
      console.log(typeof(scaledValue))
    }
    // const mValue = scaledValue
    // if (scaledValue < 1024){
    //   setprefix(scaledValue)
    // }
    // else {
    //   setprefix(Math.round(scaledValue))
    // }
    // setValueToShow(scaledValue))
    setprefix(Math.round(scaledValue))
    setCon(units[unitIndex])
    props.sValue(Math.round(scaledValue))
    // return `${Math.round(scaledValue)} ${units[unitIndex]}`;
  }


  return (
    <>
      <div className="mb-3">
        <h5 className="font-size-14 mb-3 mt-0">Storage :</h5>
        <Slider
          min={0}
          max={16825}
          format={prefix}
          value={prefix}
          onChange={value => {
            // setprefix(value);
            valueLabelFormat(value)
            // props.sValue(value)
          }}
        />
        <span className="float-right mt-4">{prefix} {con} </span>
      </div>
    </>
  )
}

export default StoregeSlider

