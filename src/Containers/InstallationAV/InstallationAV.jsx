
import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'

import React, { useState, useEffect } from 'react'

// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import DataPicker from '../../Components/dataPicker/dataPicker'
import { StyledEngineProvider } from '@mui/material/styles'

import './InstallationAV.scss'

const AV = (props) => {
  const [AV, setAV] = useState({ })

  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  // setInterval(() => {

  //     setAV("")
  // }   , 2000)

  return (
    <div className='homeDesign'>
      <div className='homeCard'>
        <div className='homeCardTitleAV'>
          <div className='datosAV'>
            <img className='imageAV' src={require('../../imagenesAV/clearGreen.jpg')} alt='av' />
            <img className='imageAV' src={require('../../imagenesAV/darkGreen.jpg')} alt='av' />
            <img className='imageAV' src={require('../../imagenesAV/lowRed.jpg')} alt='av' />
            <img className='imageAV' src={require('../../imagenesAV/orange.jpg')} alt='av' />
          </div>
          <div className='datosAV'>
            <img className='imageAV' src={require('../../imagenesAV/original.jpg')} alt='av' />
            <img className='imageAV' src={require('../../imagenesAV/red.jpg')} alt='av' />
            <img className='imageAV' src={require('../../imagenesAV/yellow.jpg')} alt='av' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({
  user: state.user,
  // token: state.token,
  hideFooter: state.hideFooter
}))(AV)
