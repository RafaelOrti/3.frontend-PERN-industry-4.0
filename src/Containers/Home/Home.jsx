import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { raiz } from '../../utiles'

// notificaciones
import { useNotifications } from '@mantine/notifications'

// ENDPOINTS CALL
import axios from 'axios'

// ICONS
import {
  At,
  Lock,
  Check,
  ZoomExclamation,
  Photo,
  UserCircle,
  UserPlus
} from 'tabler-icons-react'

import './Home.scss'

const Home = props => {
  const [dataHome, setDataHome] = useState({
    temp: '',
    H2O: '',
    C2O: '',
    C2H4: ''
  })

  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  useEffect(() => {
    call()
  }, [dataHome])

  const call = async () => {
    ('repeticion')
    const config = { headers: { Authorization: `Bearer ${props.user?.token}` } }
    const res = await axios.get(raiz + 'installation/communication', config)
    setTimeout(() => {
      setDataHome({
        temp: res.data.temperature,
        H2O: res.data.h2o,
        CO2: res.data.co2,
        C2H4: res.data.c2h4
      })
    }, 1000)
  }

  // //timers
  // const continuaousCall = 8000; // 10 hour in msec, frecuency call timing
  // setInterval(
  //     call, continuaousCall);

  return (
    <div className='homeDesign'>
      <div className='homeCard'>
        <div className='homeCardTitleHome'>
          <div className='datosHome'>
            <div>TEMPERATURA</div>
            <div>HUMEDAD</div>
            <div>CO2</div>
            <div>ETILENO</div>
          </div>
          <div className='datosHome'>
            <div>{dataHome.temp}</div>
            <div>{dataHome.H2O}</div>
            <div>{dataHome.CO2}</div>
            <div>{dataHome.C2H4}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  user: state.user,
  // token: state.token,
  hideFooter: state.hideFooter
}))(Home)
