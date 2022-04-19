import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { raiz } from '../../utiles';
import { At, Lock } from "tabler-icons-react";
import axios from 'axios';
import { Input } from "@mantine/core";



import { TabsProps, Tabs } from '@mantine/core';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/actions';
// import { NOT_HOME } from "../../redux/actions";

import './Login.scss';

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
    const [activeTab, setActiveTab] = useState(1);


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

    let StyledTabs = (props: TabsProps) => {
        return (
            <Tabs
                variant="unstyled"
                styles={(theme) => ({
                    tabControl: {


                        width: '50%',

                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                        border: `1px  solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                        fontSize: theme.fontSizes.md,
                        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,

                        '&:not(:first-of-type)': {
                            borderLeft: 0,
                        },

                        '&:first-of-type': {
                            borderTopLeftRadius: theme.radius.md,
                            // borderBottomLeftRadius: theme.radius.md,
                        },

                        '&:last-of-type': {
                            borderTopRightRadius: theme.radius.md,
                            // borderBottomRightRadius: theme.radius.md,
                        },
                    },

                    tabActive: {
                        backgroundColor: theme.colors.blue[9],
                        borderColor: theme.colors.blue[9],
                        color: theme.white,
                    },
                })}
                {...props}
            />
        );
    }


    //2-Render (lo que pinta en pantalla)

    return (





        <div className="designLogin">

            <div className="form">
                <StyledTabs >
                    <Tabs.Tab label="Settings" icon={<Settings size={16} />} >
                        <div className="form">
                            <div className="input">
                            <div className="logo">
                                        <div className="logoImg"/>
                                    </div>
                                <div className="inputBox">
                                    
                                    <div className="title">Super Dev</div>
                                    <label >Email</label>
                                    <div className="search">
                                        <input type="text" className="search__input" id="email" title="email" placeholder="example@test.com" autoComplete="off" onChange={(e) => { fillData(e) }} />
                                        <div className="search__icon">
                                            <Photo name="search"></Photo>
                                        </div>
                                    </div>
                                </div>
                                <div className="inputBox">
                                    <label >Password</label>
                                    <div className="search">
                                        <input type="password" className="search__input" id="password" title="password" placeholder="********" autoComplete="off" onChange={(e) => { fillData(e); checkPassword(e); }} />
                                        <div className="search__icon">
                                            <Photo name="search"></Photo>
                                        </div>
                                    </div>

                                    {msgError}
                                    {msgError2}
                                </div>

                                <div className="inputBoxButton">
                                    <div className="btn " onClick={() => login()}><p>Log In</p></div>
                                </div>
                            </div>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab label="Messages" icon={<MessageCircle size={16} />} >

                        <div className="form">
                            <div className="input">
                                <div className="inputBox">
                                    <div className="logo">
                                        {/* <img src="https://lh3.googleusercontent.com/a-/AOh14Gj99VObFyE8W_h8RrcwZO_aYiIHu5AAa_XpnOym=s600-k-no-rp-mo" alt="" /> */}
                                    </div>
                                    <div className="title">Super Dev</div>

                                    <label >Email</label>

                                    <div className="search">
                                        <input type="text" className="search__input" id="email" title="email" placeholder="example@test.com" autoComplete="off" onChange={(e) => { fillData(e) }} />
                                        <div className="search__icon">
                                            <Photo name="search"></Photo>
                                        </div>
                                    </div>

                                    <Input type="text" name="email" icon={<At />} id="email" title="email" placeholder="exameeeple@test.com" autoComplete="off" onChange={(e) => { fillData(e) }} />

                                </div>
                                <div className="inputBox">
                                    <label >Password</label>
                                    <Input type="password" name="password" icon={<Lock />} id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e) => { fillData(e); checkPassword(e); }} />
                                    {msgError}
                                    {msgError2}
                                </div>
                                <div className="inputBox">
                                    <div className="submit" value="Sign In" onClick={() => login()}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tabs.Tab>

                </StyledTabs>
            </div >





        </div >

        // <div className='designLogin'>
        //     <div className="designLogin">
        //         <div className="cardLogin" data-aos="fade-right">
        //             <div className="designFormulario">
        //                 <b>Email:</b>
        //                 <input type="email" className="input" name="email" id="email" title="email" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>{fillData(e)}}/>
        //                 <b>Password:</b>
        //                 <input type="password" className="input" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{ fillData(e); checkPassword(e); }}  />
        //                 {msgError}
        //                 {msgError2}
        //             </div>
        //             <div className="loginButton space" onClick={() => login()}>
        //                 <b>Login</b>
        //             </div>
        //             {/* <b>If you are not registered, you must register</b>
        //             <div className="buttonRegister2" onClick={() => takeMeRegister()}>
        //                 Click here for Register
        //             </div> */}
        //         </div>
        //     </div>
        // </div>

    );

};


export default connect()(Login);