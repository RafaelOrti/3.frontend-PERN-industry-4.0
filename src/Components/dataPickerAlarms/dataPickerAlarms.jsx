

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
import './dataPickerAlarms.scss';

import SweetPagination from "sweetpagination";

let xAxis = 0;
let items;

const DataPickerAlarms = (props) => {
  console.log("props", items)
  const [value1, setValue1] = useState({ startDate: new Date() });
  const [value2, setValue2] = useState({ endDate: new Date() });
  const [dataGraph, setDataGraph] = useState({});


  const [currentPageData, setCurrentPageData] = useState("");


  let now = new Date();

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
    let res = await axios.post(raiz + "installation/alarmsData", body, config);
    console.log("x", res.data)
    setDataGraph(res.data);
    console.log("3333", dataGraph)
    items = res.data
    setCurrentPageData(res.data)
    console.log("items", items[0][1])


  }



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2}>
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
      {
        console.log("eeee", currentPageData)
      }
      {
        (currentPageData !== "") &&
        <div>
          {currentPageData.map((item) => (
            <div>
              <h3>{item[9]}</h3>
              {
                console.log("eeee", item[1])
              }
              {
                (item[1][0] === true) &&
                <h6 >Alarma alta temperatura</h6>
              }
            </div>
          ))}

          <SweetPagination
            currentPageData={setCurrentPageData}
            dataPerPage={3}
            getData={items}
            navigation={true}
          />
        </div>
      }
    </LocalizationProvider>

  );
}

export default connect((state) => ({
  user: state.user,
  // token: state.token,
  hideFooter: state.hideFooter
}))(DataPickerAlarms);


