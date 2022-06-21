
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { connect } from 'react-redux'

import { raiz } from '../../utiles'

import 'antd/dist/antd.css'
import './SiderG.scss'

// ICONS

import {
  HomeOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'

import axios from 'axios'

const SiderG = (props) => {
  // ("props.credentials?.user.rol")
  // (props)
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')

  useEffect(() => {
    // ("props.credentials");
    // (props.credentials);
  })

  const navegar = (lugar) => {
    setTimeout(() => {
      navigate(lugar)
    }, 200)
  }

  // const logOut = () => {
  //     //Borrar de RDX las credenciales
  //     props.dispatch({ type: LOGOUT });

  //     setTimeout(() => {
  //         navigate("/");
  //     }, 1500);
  // }

  const manejador = (ev) => {
    setTitulo(ev.target.value)
  }
  // {
  //     window.location.pathname === "/add" &&
  //     <div className="link" onClick={() => navegar("/film")}>Film</div>
  // }

  // (window.location.pathname);

  if (props.user?.user) {
    return (
      <div
        className='designSiderGlobal' style={{
          display: props.hideFooter.isHome ? 'none' : undefined
        }}
      >
        {
                    window.location.pathname !== '/display' &&

                      <div className='designSider'>

                        <div className='siderLinksDesign'>

                          {/* {
                                (props.user?.user.authorizationLevel === 3) && (window.location.pathname === "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}><b>Admin</b></div>

                            }
                            {
                                (props.user?.user.authorizationLevel === 3) && (window.location.pathname !== "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}>Admin</div>
                            }
                            {
                                (props.user?.user.authorizationLevel === 5) && (window.location.pathname === "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}><b>Admin</b></div>

                            }
                            {
                                (props.user?.user.authorizationLevel === 5) && (window.location.pathname !== "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}>Admin</div>
                            } */}
                          {
                                (window.location.pathname === '/home') &&
                                  <div className='link' onClick={() => navegar('/home')}>
                                    <b>Home</b>
                                  </div>
                            }
                          {
                                (window.location.pathname !== '/home') &&
                                  <div className='link' onClick={() => navegar('/home')}>
                                    Home
                                  </div>
                            }
                          {
                                (window.location.pathname === '/graph') &&
                                  <div className='link' onClick={() => navegar('/graph')}>
                                    <b>Gráficos</b>
                                  </div>
                            }
                          {
                                (window.location.pathname !== '/graph') &&
                                  <div className='link' onClick={() => navegar('/graph')}>
                                    Gráficos
                                  </div>
                            }
                          {
                                (window.location.pathname === '/alarms') &&
                                  <div className='link' onClick={() => navegar('/alarms')}>
                                    <b>Alarmas</b>
                                  </div>
                            }
                          {
                                (window.location.pathname !== '/alarms') &&
                                  <div className='link' onClick={() => navegar('/alarms')}>
                                    Alarmas
                                  </div>
                            }
                          {
                                (window.location.pathname === '/actionsRecord') &&
                                  <div className='link' onClick={() => navegar('/installationAV')}>
                                    <b>AV</b>
                                  </div>
                            }
                          {
                                (window.location.pathname !== '/actionsRecord') &&
                                  <div className='link' onClick={() => navegar('/installationAV')}>
                                    AV
                                  </div>
                            }
                          {/* {
                                (window.location.pathname === "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    <b>Comunicaciones</b>
                                </div>
                            }
                            {
                                (window.location.pathname !== "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    Comunicaciones
                                </div>
                            }
                            {
                                (window.location.pathname === "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    <b>Conexiones</b>
                                </div>
                            }
                            {
                                (window.location.pathname !== "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    Conexiones
                                </div>
                            } */}

                        </div>

                      </div>
                }
        {
                    window.location.pathname === '/display' &&
                    (

                      <div className='siderSpace logoDesign'>
                        {/* <img className="logoDisplay" src={require('../../img/volver.png')} alt="logo" onClick={() => navegar("/film")}></img> */}
                      </div>

                    )
                }
      </div>

    )
  }
}

export default connect((state) => ({
  user: state.user,
  hideFooter: state.hideFooter
}))(SiderG)
