import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { raiz } from '../../utiles'

// notificaciones
import { useNotifications } from '@mantine/notifications'

// ENDPOINTS CALL
import axios from 'axios'

/* DISEÑO */
import './AdminClient.scss'
import Pagination, { usePagination } from '@mui/material/Pagination'

// ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from 'tabler-icons-react'

/* DISEÑO */

// REDUX
import { connect } from 'react-redux'
import { NOT_HOME, REGISTER } from '../../redux/actions'

let a = false

const AdminClient = (props) => {
  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
    readUsers()
  }, [])

  const notifications = useNotifications()
  const navigate = useNavigate()

  // 1-Hooks (equivalen al estado en los componentes de clase)
  const [dataUser, setDataUser] = useState({ name: '', email: '', password: '', passwordConfirmation: '' })
  const [users, setUsers] = useState('')
  const [page, setPage] = useState(0)
  const [i, setI] = useState(0)
  // const [msgError, setMsgError] = useState("");
  // const [msgError2, setMsgError2] = useState("");

  // handlers
  const fillData = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value })
    // ("dataUser", dataUser)
  }

  const advancePage = () => {
    let numberSections = Object.keys(users).length / 10
    numberSections++
    // if(page!==0){
    //     setPage(page-10)
    //     }else{
    //         notifications.showNotification({
    //             message: "No hay más paginas a la derecha",
    //             icon: <ZoomExclamation />,
    //             autoClose: 2000,
    //             id: "leftPage"
    //         });
    //     }
  }
  const goBackPage = () => {
    if (page !== 0) {
      setPage(page - 10)
    } else {
      notifications.showNotification({
        message: 'No hay más paginas a la izquierda',
        icon: <ZoomExclamation />,
        autoClose: 2000,
        id: 'leftPage'
      })
    }
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

  const navigateLocation = (location) => {
    navigate(location)
  }

  const register = async () => {
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
        const resultado = await axios.post(raiz + 'users/Register', body)

        const x = resultado.data
        if (resultado.data.msg === 'this user already exists') {
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
        } else if ((resultado.data.msg.includes('Welcome')) === true) {
          props.dispatch({ type: REGISTER, payload: resultado.data })
          setTimeout(() => {
            navigate('/Home')
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const readUsers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${props.user?.token}` }
      }
      const res = await axios.get(raiz + 'users/client', config)
      setTimeout(() => {
        console.log(res.data)
        const output = res.data.map(function (obj) {
          return Object.keys(obj).sort().map(function (key) {
            return obj[key]
          })
        })
        setUsers(output)
        console.log(output)
      }, 2)
    } catch (error) {
      console.log(error)
    }
  }

  // 2-Render (lo que pinta en pantalla)

  return (

    <div className='designLogin'>
      <div className='adminForm'>
        <div className='selectorSection'>
          <div className='btnAdmin adminSelected'><UserPlus name='search' /> &nbsp;&nbsp;Usuarios </div>
          <div className='btnAdmin adminBtnGreyL ' onClick={() => navigate('/clientAdminCreate')}><UserCircle name='search' />&nbsp;&nbsp;Crear usuario</div>
          <div className='btnAdmin adminBtnGreyL ' onClick={() => navigate('/clientAdminUpdate')}><UserCircle name='search' />&nbsp;&nbsp;Editar usuario</div>
          <div className='btnAdmin adminBtnGreyL ' onClick={() => navigate('/clientAdminDelete')}><UserCircle name='search' />&nbsp;&nbsp;Eliminar usuario</div>

        </div>
        <div className='adminClientForm'>
          <div className='userRow bold'>
            <div className='userElement'>Nombre</div>
            <div className='userElement'>email</div>
            <div className='userElement'>authorizationLevel</div>
            <div className='userElement'>createdAt</div>
            <div className='userElement'>updatedAt</div>
          </div>
          {/* {
                        ('users', users)
                    } */}
          {
                        Object.keys(users).slice(page * 10 + 0, page * 10 + 10).map(key => {
                          // (key); // 👉️ name, country
                          // (users[key]); // 👉️ James, Chile
                          return (
                            <div className='userRow' key={key}>
                              <div className='userColumn'>
                                <div className='userElement'>{users[key][0]}</div>
                              </div>
                              <div className='userColumn'>
                                <div className='userElement'>{users[key][2]}</div>
                              </div>
                              <div className='userColumn'>
                                <div className='userElement'>{users[key][0]}</div>
                              </div>
                              <div className='userColumn'>
                                <div className='userElement'>{users[key][1]}</div>
                              </div>
                              <div className='userColumn'>
                                <div className='userElement'>{users[key][6]}</div>
                              </div>
                            </div>
                          )
                        })
                    }
          {/*
          <Pagination setPage={setPage} page={page} count={11} color='primary' defaultPage={1} onClick={console.log(page)} /> */}

        </div>
      </div>
    </div>

  )
}

export default connect((state) => ({
  user: state.user,
  // token: state.token,
  hideFooter: state.hideFooter
}))(AdminClient)
