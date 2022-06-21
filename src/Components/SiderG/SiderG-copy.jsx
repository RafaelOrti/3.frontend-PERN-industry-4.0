
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { connect } from 'react-redux'

import { raiz } from '../../utiles'

import 'antd/dist/antd.css'
import './SiderG.scss'
import { Layout, Menu, Breadcrumb } from 'antd'

// ICONS

import {
  HomeOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout

function getItem (label, key, icon) {
  return {
    key,
    icon,
    label
  }
}
// let navigate = useNavigate();
const items = [
  getItem((
    <a href='/home' rel='noopener noreferrer' style={{ margin: '1.24em' }}>
      Home
    </a>
  ), '1', <HomeOutlined />),
  getItem(<a href='/graph' rel='noopener noreferrer' style={{ margin: '1.24em' }}>
    Gráficos
          </a>, '2', <DesktopOutlined />),
  getItem(<a href='/alarm' rel='noopener noreferrer' style={{ margin: '1.24em' }}>
    Alarmas
          </a>, '3', <PieChartOutlined />),
  getItem(<a href='/event' rel='noopener noreferrer' style={{ margin: '1.24em' }}>
    Eventos
          </a>, '4', <DesktopOutlined />),
  getItem(<a href='/com' rel='noopener noreferrer' style={{ margin: '1.24em' }}>
    Comunicaciones
          </a>, '5', <PieChartOutlined />),
  getItem(<a href='/con' rel='noopener noreferrer' style={{ margin: '1.24em' }}>
    Conexiones
          </a>, '6', <DesktopOutlined />)

]

class SiderG extends React.Component {
  //   navegar = (lugar) => {

  //     setTimeout(() => {
  //         navigate(lugar);
  //     }, 200);

  // }

  state = {
    collapsed: false
  }

  onCollapse = (collapsed) => {
    (collapsed)
    this.setState({
      collapsed
    })
  }

  render () {
    const { collapsed } = this.state
    return (

      <div
        className='designSider' style={{ display: this.props.hideFooter.isHome ? 'none' : undefined }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          {/* <div className="logo" /> */}
          <Menu className='siderI' theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
          <Menu theme='light' mode='inline' defaultSelectedKeys={['1']} />

        </Sider>

      </div>

    )
  }
}

export default connect((state) => ({
  hideFooter: state.hideFooter
}))(SiderG)
