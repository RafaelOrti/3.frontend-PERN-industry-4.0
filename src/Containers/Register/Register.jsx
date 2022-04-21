import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { raiz } from '../../utiles';

//notificaciones
import { useNotifications } from "@mantine/notifications";

//ENDPOINTS CALL
import axios from 'axios';

/*DISEÑO*/
import './Register.scss';

//ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from "tabler-icons-react";



/*DISEÑO*/


//REDUX
import { connect } from 'react-redux';
import { Login } from '../../redux/actions';
import { IS_HOME } from "../../redux/actions";

let a = false;

const Register = (props) => {

    useEffect(() =>{
        props.dispatch({ type: IS_HOME })
    },[])

    const notifications = useNotifications();
    let navigate = useNavigate();

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [dataUser, setDataUser] = useState({ email: "", password: "", passwordConfirmation: "" });
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

    const navigateLogin = () => {
        navigate("/");
    };

    const register = async () => {
        if (dataUser.password !== dataUser.passwordConfirmation) {
            notifications.showNotification({
                message: "Las contraseñas no son iguales",
                icon: <ZoomExclamation />,
                autoClose: 2000,
                id: "letters"
            });
        } else {
            try {
                let body = {
                    email: dataUser.email,
                    password: dataUser.password
                }
                let resultado = await axios.post(raiz + "users/Register", body);
                console.log(resultado);
                if (resultado.data === "Usuario o contraseña inválido") {
                    // setMsgError2("Usuario o contraseña inválido")
                } else {
                    props.dispatch({ type: Register, payload: resultado.data });
                    setTimeout(() => {
                        navigate("/Home");
                    }, 1000);
                }
            } catch (error) {
                console.log(error)
            }

        }
    };




    //2-Render (lo que pinta en pantalla)

    return (

        <div className="designLogin">
            <div className="form">
                <div className="selectorSection">

                    <div className="btn btnGreyL " onClick={() => navigateLogin()}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Log In</p></div>
                    <div className="selected"><UserPlus name="search"></UserPlus><p> &nbsp;&nbsp;Register </p></div>
                </div>
                <div className="formLoginSection">
                    {/* <div className="logoSection">
                        <div className="logoImg" />
                        <div className="title">Super Dev</div>
                    </div> */}
                    <div className="inputSection noMarginTop">
                        <label >Email</label>
                        <div className="search">
                            <input type="email" className="search__input" id="email" title="email" placeholder="example@test.com" autoComplete="off" onChange={(e) => { fillData(e) }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>
                    </div>
                    <div className="inputSection">
                        <label >Password</label>
                        <div className="search">
                            <input type="password" className="search__input" id="password" title="password" placeholder="********" autoComplete="off" onChange={(e) => { fillData(e); checkPassword(e); }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>


                    </div>
                    <div className="inputSection">
                        <label >Password confirmation</label>
                        <div className="search">
                            <input type="password2" className="search__input" id="password2" title="password2" placeholder="********" autoComplete="off" onChange={(e) => { fillData(e); checkPassword(e); }} />
                            <div className="search__icon">
                                <Photo name="search"></Photo>
                            </div>
                        </div>


                    </div>
                    <div className="inputSection loginSection">
                        <div className="btn btnBlue" onClick={() => register()}><p>Log In</p></div>
                    </div>
                </div>
            </div>
        </div >


    );



};


export default connect()(Register);