import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { raiz } from '../../utiles';

//notificaciones
import { useNotifications } from "@mantine/notifications";

//ENDPOINTS CALL
import axios from 'axios';

/*DISEÑO*/
import './AdminClientUpdate.scss';

//ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from "tabler-icons-react";



/*DISEÑO*/


//REDUX
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";
import { REGISTER } from "../../redux/actions";

let a = false;

const AdminClientUpdate = (props) => {

    useEffect(() => {
        props.dispatch({ type: NOT_HOME })
    }, [])

    const notifications = useNotifications();
    let navigate = useNavigate();

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [dataUser, setDataUser] = useState({ name: "", email: "", authorizationLevel: "", password: "", passwordConfirmation: "" });
    const [users, setUsers] = useState("");
    // const [msgError, setMsgError] = useState("");
    // const [msgError2, setMsgError2] = useState("");


    //handlers
    const fillData = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value })
        // console.log("dataUser", dataUser)
    };

    const checkPassword = (e) => {


        if (e.target.value.length > 4) {

            a = true
        }
        console.log(e.target.value.length)
        console.log("gggg", a)
        if (a && (e.target.value.length < 4)) {

            notifications.showNotification({
                message: "La contraseña debe tener más 8 caracteres",
                icon: <ZoomExclamation />,
                autoClose: false,
                id: 'size1'
            });
        } else if (a && (e.target.value.length > 16)) {

            notifications.showNotification({
                message: "La contraseña debe tener menos de 15 caracteres",
                icon: <ZoomExclamation />,
                autoClose: false,
                id: 'size2'
            });
        } else {

            notifications.hideNotification("size1");
            notifications.hideNotification("size2");
        }

        var pattern = /^[a-zA-Z0-9]*$/;

        if (!e.target.value.match(pattern)) {
            // setMsgError("La contraseña debe tener los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,");
            notifications.showNotification({
                message: "La contraseña debe tener los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,",
                icon: <ZoomExclamation />,
                autoClose: false,
                id: "letters"
            });
        } else {
            notifications.hideNotification("letters");

        }



    };

    const navigateLocation = (location) => {
        navigate(location);
    };


    const update = async () => {

        if (dataUser.password === "" || dataUser.passwordConfirmation === "" || dataUser.name === "" || dataUser.email === "" || dataUser.authorizationLevel === "") {
            console.log("dataUser", dataUser)
            notifications.showNotification({
                message: "Introduce todos los campos",
                icon: <ZoomExclamation />,
                autoClose: 2000,
                id: "letters"
            });
        } else {
            console.log("dataUser", dataUser)
            if (dataUser.password !== dataUser.passwordConfirmation) {
                notifications.showNotification({
                    message: "Las contraseñas no son iguales",
                    icon: <ZoomExclamation />,
                    autoClose: 2000,
                    id: "letters"
                });
            } else {
                try {
                    console.log("notifications.")
                    let body = {
                        name: dataUser.name,
                        email: dataUser.email,
                        authorizationLevel: dataUser.authorizationLevel,
                        password: dataUser.password
                    }
                    let config = {
                        headers: { Authorization: `Bearer ${props.user?.token}` }
                    };

                    let resultado = await axios.put(raiz + "users/client/update", body, config);

                    let x = resultado.data
                    console.log("x", x)
                    if (resultado.data.msg === "this user doesnt exists") {
                        notifications.showNotification({
                            message: "El User con este e-mail ya existe en nuestra base de datos",
                            icon: <ZoomExclamation />,
                            autoClose: 2000,
                            id: "letters"
                        });

                    }
                    else if ((resultado.data.msg.includes('DB error')) === true) {
                        notifications.showNotification({
                            message: "Hemos tenido un problema con nuestra basde de datos, por favor vualquier duda o queja escriba a raorcar3@gmail.com",
                            icon: <ZoomExclamation />,
                            autoClose: 2000,
                            id: "letters"
                        });

                    }
                    else if ((resultado.data.msg.includes('updated')) === true) {
                        notifications.showNotification({
                            message: "Usuario Editado",
                            icon: <ZoomExclamation />,
                            autoClose: 2000,
                            id: "letters"
                        });
                        // setTimeout(() => {
                        //     navigate("/Home");
                        // }, 1000);
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        }
    };




    //2-Render (lo que pinta en pantalla)

    return (

        <div className="designLogin">
            <div className="adminForm">
                <div className="selectorSection">
                    
                    <div className="btnAdmin adminBtnGreyL " onClick={() => navigate("/clientAdmin")}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Usuarios</p></div>
                    
                    <div className="btnAdmin adminBtnGreyL " onClick={() => navigate("/clientAdminCreate")}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Crear usuario</p></div>
                    <div className="btnAdmin adminSelected"><UserPlus name="search"></UserPlus><p> &nbsp;&nbsp;Editar usuario </p></div>
                    <div className="btnAdmin adminBtnGreyL " onClick={() => navigate("/clientAdminDelete")}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Eliminar usuario</p></div>

                </div>
                <div className="formLoginSection">
                    {/* <div className="logoSection">
                        <div className="logoImg" />
                        <div className="title">Super Dev</div>
                    </div> */}
                    <div className="inputSection noMarginTop">
                        <label >Email</label>
                        <div className="search">
                            <input type="email" className="search__input" name="email" id="email" title="email" placeholder="example@test.com" autoComplete="off" onChange={(e) => { fillData(e) }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>
                    </div>
                    <div className="inputSection">
                        <label >Name</label>
                        <div className="search">
                            <input type="text" className="search__input" name="name" id="name" title="name" placeholder="name" autoComplete="off" onChange={(e) => { fillData(e); }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>


                    </div>
                    <div className="inputSection">
                        <label >authorizationLevel</label>
                        <div className="search">
                            <input type="number" className="search__input" name="authorizationLevel" id="authorizationLevel" title="authorizationLevel" placeholder="1" autoComplete="off" onChange={(e) => { fillData(e); }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>


                    </div>
                    <div className="inputSection">
                        <label >Password</label>
                        <div className="search">
                            <input type="password" className="search__input" name="password" id="password" title="password" placeholder="********" autoComplete="off" onChange={(e) => { fillData(e); checkPassword(e); }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>


                    </div>
                    <div className="inputSection">
                        <label >Password confirmation</label>
                        <div className="search">
                            <input type="password" className="search__input" name="passwordConfirmation" id="password2" title="password2" placeholder="********" autoComplete="off" onChange={(e) => { fillData(e); checkPassword(e); }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>


                    </div>
                    <div className="inputSection loginSection">
                        <div className="btn btnBlue" onClick={() => update()}><p>Editar usuario</p></div>
                    </div>
                </div>
            </div>
        </div >


    );



};

export default connect((state) => ({
    user: state.user,
    // token: state.token,
    hideFooter: state.hideFooter
}))(AdminClientUpdate);
