import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { raiz } from '../../utiles';
import { At, Lock } from "tabler-icons-react";
import axios from 'axios';


//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/actions';
// import { NOT_HOME } from "../../redux/actions";

import './Login.css';

const Login = (props) => {

    let navigate = useNavigate();

    // useEffect(() => {
    //     console.log('Created')
    //     props.dispatch({ type: NOT_HOME })
    // }, [])

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [dataUser, setDataUser] = useState({ email: "", password: "" });
    const [msgError, setMsgError] = useState("");
    const [msgError2, setMsgError2] = useState("");



    //handlers
    const fillData = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value })
    };
    const checkPassword = (e) => {
        if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(e.target.value.length) !== true) {
            setMsgError("La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,");
        } else {
            setMsgError("");
        }
    };


    //Funciones locales

    const login = async () => {
        try {
            let body = {
                email: dataUser.email,
                password: dataUser.password
            }
            let resultado = await axios.post(raiz + "users/login", body);
            //Cambiamos el valor del hook credenciales, por lo tanto se recargará el componente
            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {
                //Guardaríamos los datos en redux...
                props.dispatch({ type: LOGIN, payload: resultado.data });
                setTimeout(() => {
                    navigate("/Home");
                }, 1000);
            }
        } catch (error) {
            console.log(error)
        }
    };




    //2-Render (lo que pinta en pantalla)

    return (

        <div className='designLogin'>
            <div className="designLogin">
                <div className="cardLogin" data-aos="fade-right">
                    <div className="designFormulario">
                        <b>Email:</b>
                        <input type="email" className="input" name="email" id="email" title="email" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>{fillData(e)}}/>
                        <b>Password:</b>
                        <input type="password" className="input" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{
                                fillData(e);
                                checkPassword(e);
                            }}
                        />
                        {msgError}
                        {msgError2}
                    </div>
                    <div className="loginButton space" onClick={() => login()}>
                        <b>Login</b>
                    </div>
                    {/* <b>If you are not registered, you must register</b>
                    <div className="buttonRegister2" onClick={() => takeMeRegister()}>
                        Click here for Register
                    </div> */}
                </div>
            </div>
        </div>
            
    );

};


export default connect()(Login);