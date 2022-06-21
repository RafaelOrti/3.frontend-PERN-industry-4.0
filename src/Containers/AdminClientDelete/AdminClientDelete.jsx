import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { raiz } from '../../utiles'

// notificaciones
import { useNotifications } from '@mantine/notifications'

// ENDPOINTS CALL
import axios from 'axios'

/* DISEÑO */
import './AdminClientDelete.scss'

// ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from 'tabler-icons-react'

/* DISEÑO */

// REDUX
import { connect } from 'react-redux'
import { UPDATE, LOGOUT, NOT_HOME } from '../../redux/actions'

let a = false

const AdminClientDelete = (props) => {
  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  const notifications = useNotifications()
  const navigate = useNavigate()

  // 1-Hooks (equivalen al estado en los componentes de clase)
  const [dataUser, setDataUser] = useState({ email: '' })
  // const [msgError, setMsgError] = useState("");
  // const [msgError2, setMsgError2] = useState("");

  // handlers
  const fillData = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value })
    // ("dataUser", dataUser)
  }

  const checkPassword = (e) => {
    if (e.target.value.length > 4) {
      a = true
    }
    if (a && (e.target.value.length < 4)) {
      notifications.showNotification({
        message: 'La contraseña debe tener más 8 caracteres',
        icon: <ZoomExclamation />,
        autoClose: false,
        id: 'size1'
      })
    } else if (a && (e.target.value.length > 16)) {
      notifications.showNotification({
        message: 'La contraseña debe tener menos de 15 caracteres',
        icon: <ZoomExclamation />,
        autoClose: false,
        id: 'size2'
      })
    } else {
      notifications.hideNotification('size1')
      notifications.hideNotification('size2')
    }

    const pattern = /^[a-zA-Z0-9]*$/

    if (!e.target.value.match(pattern)) {
      // setMsgError("La contraseña debe tener los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,");
      notifications.showNotification({
        message: 'La contraseña debe tener los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,',
        icon: <ZoomExclamation />,
        autoClose: false,
        id: 'letters'
      })
    } else {
      notifications.hideNotification('letters')
    }
  }

  const navigateLogin = () => {
    navigate('/')
  }

  const deleteUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${props.user?.token}` }
      }
      const body = {

        email: dataUser.email
      }
      const resultado = await axios.post(raiz + 'users/client/delete', body, config)

      if (resultado.data.msg === 'invalid password') {
        notifications.showNotification({
          message: 'La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,',
          icon: <ZoomExclamation />,
          autoClose: 2000,
          id: 'letters'
        })
      } else if (resultado.data.msg === 'User does not exist') {
        notifications.showNotification({
          message: 'El User con este e-mail ya existe en nuestra base de datos',
          icon: <ZoomExclamation />,
          autoClose: 2000,
          id: 'letters'
        })
      } else if ((resultado.data.msg.includes('DB error')) === true) {
        notifications.showNotification({
          message: 'Hemos tenido un problema con nuestra basde de datos, por favor vualquier duda o queja escriba a raorcar3@gmail.com',
          icon: <ZoomExclamation />,
          autoClose: 2000,
          id: 'letters'
        })
      } else if ((resultado.data.msg.includes('deleted')) === true) {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    if (dataUser.email !== '') {
      try {
        const body = {
          name: dataUser.name,
          email: dataUser.email,
          password: dataUser.password
        }
        const config = {
          headers: { Authorization: `Bearer ${props.user?.token}` }
        }
        const resultado = await axios.delete(raiz + 'users/client/delete', body, config)
        const x = resultado.data

        if (resultado.data.msg === 'you only can delete 1 to 3 level user') {
          notifications.showNotification({
            message: 'you only can delete 1 to 3 level user',
            icon: <ZoomExclamation />,
            autoClose: 2000,
            id: 'letters'
          })
        } else if (resultado.data.msg === 'User does not exist') {
          notifications.showNotification({
            message: 'El usuario con este e-mail no existe',
            icon: <ZoomExclamation />,
            autoClose: 2000,
            id: 'letters'
          })
        } else if ((resultado.data.msg.includes('DB error')) === true) {
          notifications.showNotification({
            message: 'Hemos tenido un problema con nuestra basde de datos, por favor vualquier duda o queja escriba a raorcar3@gmail.com',
            icon: <ZoomExclamation />,
            autoClose: 2000,
            id: 'letters'
          })
        } else if ((resultado.data.msg.includes('deleted')) === true) {
          notifications.showNotification({
            message: 'Usuario eliminado',
            icon: <ZoomExclamation />,
            autoClose: 2000,
            id: 'letters'
          })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      notifications.showNotification({
        message: 'Introduce el email',
        icon: <ZoomExclamation />,
        autoClose: 2000,
        id: 'letters'
      })
    }
  }

  // 2-Render (lo que pinta en pantalla)

  return (
    <div className='designLogin'>
      <div className='adminForm'>
        <div className='selectorSection'>
          <div className='btnAdmin adminBtnGreyL ' onClick={() => navigate('/clientAdmin')}><UserCircle name='search' /><p>&nbsp;&nbsp;Usuarios</p></div>
          <div className='btnAdmin adminBtnGreyL ' onClick={() => navigate('/clientAdminCreate')}><UserCircle name='search' /><p>&nbsp;&nbsp;Crear usuario</p></div>
          <div className='btnAdmin adminBtnGreyL ' onClick={() => navigate('/clientAdminUpdate')}><UserCircle name='search' /><p>&nbsp;&nbsp;Editar usuario</p></div>
          <div className='btnAdmin adminSelected'><UserPlus name='search' /><p> &nbsp;&nbsp;Eliminar usuario </p></div>
        </div>
        <div className='formLoginSection'>
          <div className='inputSection noMarginTop'>
            <label>Email</label>
            <div className='search'>
              <input type='email' className='search__input' name='email' id='email' title='email' placeholder={props.user?.user.email} autoComplete='off' onChange={(e) => { fillData(e) }} />
              <div className='search__icon'>
                <Photo name='search' />
              </div>
            </div>
          </div>
          <div className='inputSection loginSection'>
            <div className='btn btnBlue' onClick={() => deleteUser()}><p>Delete user</p></div>
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
}))(AdminClientDelete)
