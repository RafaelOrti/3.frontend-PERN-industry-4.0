import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'

import React, { useState, useEffect } from 'react'

// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import DataPickerAlarms from '../../Components/dataPickerAlarms/dataPickerAlarms'
import { StyledEngineProvider } from '@mui/material/styles'

import './Alarms.scss'

const Alarms = props => {
  const [dataAlarms, setDataAlarms] = useState({
    on: '',
    degreening: '',
    door: '',
    password: '',
    temp: '',
    H2O: '',
    C2O: '',
    C2H4: ''
  })

  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  return (
    <div className='homeDesign'>
      <div className='homeCard'>
        <div className='homeCardTitleGraph'>
          <StyledEngineProvider injectFirst>
            <DataPickerAlarms />
          </StyledEngineProvider>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  user: state.user,
  // token: state.token,
  hideFooter: state.hideFooter
}))(Alarms)
