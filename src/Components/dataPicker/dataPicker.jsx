

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';
//ENDPOINTS CALL
import axios from 'axios';
import { raiz } from '../../utiles';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { NOT_HOME } from "../../redux/actions";
import { CanvasJSChart } from 'canvasjs-react-charts'
import './dataPicker.scss';

let xAxis = 0;

const DataPicker = (props) => {
  // console.log("props", props)
  const [value1, setValue1] = useState({ startDate: new Date() });
  const [value2, setValue2] = useState({ endDate: new Date() });
  const [dataGraph, setDataGraph] = useState({});
  let now = new Date();
  console.log("rrr", now);
  console.log("rrr", value1);
  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  const searchData = async () => {
    console.log("searchData")

    let hours = Math.abs(value1.startDate - value2.endDate) / 36e5;
    let minutes = Math.abs(value1.startDate - value2.endDate) / 6e4;
    let seconds = Math.abs(value1.startDate - value2.endDate) / 1000;

    xAxis = Math.round(seconds / 10);
     
    console.log("minutes", xAxis)


    let config = { headers: { Authorization: `Bearer ${props.user?.token}` } };
    const body = { startDate: value1.startDate, endDate: value2.endDate };
    console.log(body)
    console.log("searchData")
    let res = await axios.post(raiz + "installation/graphData", body, config);
    console.log("x", res.data)
    setDataGraph(res.data);
    console.log("3333", dataGraph)



  }


  function generateDataPoints(noOfDps) {
    console.log("generateDataPoints", noOfDps)
    if (dataGraph != null) {
      var xVal = 0, yVal = noOfDps;
      var dps = [];
      for (var i = 0; i < noOfDps; i++) {

        if (dataGraph[i] === undefined) {
          yVal = 0;
        } else {
          yVal = dataGraph[i].temperature
        }
        dps.push({ x: xVal, y: yVal });
      
        if(noOfDps < 7){
          xVal += 0.2;
        } else if (noOfDps < 18) {
          xVal += 0.182;
        } else {
          xVal += 0.1768;
        }
      }
      console.log("2222", noOfDps)
      return dps;
    }

  }

  const options = {

    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Temperatura"
    },
    axisY: {
      title: "Temperatura",
      includeZero: false,
      suffix: " °C"
    },
    axisX: {
      title: "Time",
      prefix: "",
      suffix: " minutos"

    },
    theme: "light2", // "light1", "dark1", "dark2"
    zoomEnabled: true,
    data: [{
      type: "area",
      dataPoints: generateDataPoints(xAxis)
    }]
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2}>
        {/* <MobileDateTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDateTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <DateTimePicker
          label="Fecha inicio"
          renderInput={(params) => <TextField {...params} />}
          value={value1.startDate}
          onChange={(newValue) => {
            setValue1({ startDate: newValue });
          }}
        />
        <DateTimePicker
          label="Fecha final"
          renderInput={(params) => <TextField {...params} />}
          value={value2.endDate}
          onChange={(newValue) => {
            setValue2({ endDate: newValue });
          }}
        />
        <button onClick={() => {
          searchData();
        }}>Buscar</button>
      </Stack>
      <CanvasJSChart className='graph' options={options} />
    </LocalizationProvider>

  );
}


export default connect((state) => ({
  user: state.user,
  // token: state.token,
  hideFooter: state.hideFooter
}))(DataPicker);