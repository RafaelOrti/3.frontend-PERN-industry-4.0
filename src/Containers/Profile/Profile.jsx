import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { raiz } from '../../utiles'

// notificaciones
import { useNotifications } from '@mantine/notifications'

// ENDPOINTS CALL
import axios from 'axios'

/* DISEÑO */
import './Profile.scss'

// ICONS
import { ZoomExclamation, Photo, UserCircle } from 'tabler-icons-react'

/* DISEÑO */

// REDUX
import { connect } from 'react-redux'
import { UPDATE, NOT_HOME } from '../../redux/actions'

let a = false

const Profile = (props) => {
  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  const notifications = useNotifications()
  const navigate = useNavigate()

  // 1-Hooks (equivalen al estado en los componentes de clase)
  const [dataUser, setDataUser] = useState({ name: props.user?.user.name, email: props.user?.user.email, password: '', passwordConfirmation: '' })
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
      const resultado = await axios.delete(raiz + 'users/profile/delete', config)

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
          message: 'Hemos tenido un problema con nuestra basde de datos, por favor cualquier duda o queja escriba a raorcar3@gmail.com',
          icon: <ZoomExclamation />,
          autoClose: 2000,
          id: 'letters'
        })
      } else if ((resultado.data.msg.includes('deleted')) === true) {
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    if (dataUser.password !== '') {
      if (dataUser.password !== dataUser.passwordConfirmation) {
        notifications.showNotification({
          message: 'Las contraseñas no son iguales',
          icon: <ZoomExclamation />,
          autoClose: 2000,
          id: 'letters'
        })
      } else {
        try {
          const body = {
            name: dataUser.name,
            email: dataUser.email,
            password: dataUser.password
          }
          const config = {
            headers: { Authorization: `Bearer ${props.user?.token}` }
          }
          const resultado = await axios.put(raiz + 'users/profile/update', body, config)

          if (resultado.data.msg === 'invalid password') {
            notifications.showNotification({
              message: 'La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,',
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
          } else if ((resultado.data.msg.includes('updated')) === true) {
            props.dispatch({ type: UPDATE, payload: resultado.data })
            setTimeout(() => {
              navigate('/Home')
            }, 1000)
          }
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      notifications.showNotification({
        message: 'Introduce la contraseña',
        icon: <ZoomExclamation />,
        autoClose: 2000,
        id: 'letters'
      })
    }
  }

  // 2-Render (lo que pinta en pantalla)

  return (

    <div className='designLogin'>
      <div className='form'>
        <div className='selectorSection'>

          <div className='btn btnRed' onClick={() => deleteUser()}><UserCircle name='search' />&nbsp;&nbsp;ELIMINAR</div>
          <div className='selected' />
        </div>
        <div className='formLoginSection'>
          {/* <div className="logoSection">
                        <div className="logoImg" />
                        <div className="title">Super Dev</div>
                    </div> */}
          <div className='inputSection noMarginTop'>
            <label>Email</label>
            <div className='search'>
              <input type='email' className='search__input' name='email' id='email' title='email' placeholder={props.user?.user.email} autoComplete='off' onChange={(e) => { fillData(e) }} />
              <div className='search__icon'>
                <Photo name='search' />
              </div>
            </div>
          </div>
          <div className='inputSection'>
            <label>Name</label>
            <div className='search'>
              <input type='text' className='search__input' name='name' id='name' title='name' placeholder={props.user?.user.name} autoComplete='off' onChange={(e) => { fillData(e) }} />
              <div className='search__icon'>
                <Photo name='search' />
              </div>
            </div>
          </div>
          <div className='inputSection'>
            <label>Password</label>
            <div className='search'>
              <input type='password' className='search__input' name='password' id='password' title='password' placeholder='********' autoComplete='off' onChange={(e) => { fillData(e); checkPassword(e) }} />
              <div className='search__icon'>
                <Photo name='search' />
              </div>
            </div>
          </div>
          <div className='inputSection'>
            <label>Password confirmation</label>
            <div className='search'>
              <input type='password' className='search__input' name='passwordConfirmation' id='password2' title='password2' placeholder='********' autoComplete='off' onChange={(e) => { fillData(e); checkPassword(e) }} />
              <div className='search__icon'>
                <Photo name='search' />
              </div>
            </div>
          </div>
          <div className='inputSection loginSection'>
            <div className='btn btnBlue' onClick={() => update()}><p>Cambiar datos</p></div>
            <div className='btn btnBlue' onClick={() => navigateLogin()}><p>Cambiar usuario</p></div>
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
}))(Profile)
