import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { raiz } from '../../utiles';

//notificaciones
import { useNotifications } from "@mantine/notifications";

//ENDPOINTS CALL
import axios from 'axios';

/*DISEÑO*/
import './Login.scss';

//ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from "tabler-icons-react";



/*DISEÑO*/


//REDUX
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/actions';
import { IS_HOME } from "../../redux/actions";

let a = false;

const Login = (props) => {

    useEffect(() => {
        console.log('Created')
        props.dispatch({ type: IS_HOME })
    }, [])

    const notifications = useNotifications();
    let navigate = useNavigate();

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [dataUser, setDataUser] = useState({ email: "", password: "" });
    // const [msgError, setMsgError] = useState("");
    // const [msgError2, setMsgError2] = useState("");


    //handlers
    const fillData = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value })
        // console.log("dataUser", dataUser)
    };

    // const checkEmail = (e) => {
    //     console.log(e.target.value)
    //     if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e.target.value)) {

    //         notifications.showNotification({
    //             message: "Introduce un email válido",
    //             icon: <ZoomExclamation />,
    //             autoClose: false,
    //             id: 'email'
    //         })
    //     } else {
    //         notifications.hideNotification("email");
    //     }
    // }


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

    const navigateRegisters = () => {
        navigate("/register");
    };

    const login = async () => {

        // setTimeout(() => {
        //     navigate("/home");
        // }, 1000);
        console.log("eeeee",dataUser.email)
        if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(dataUser.email)) {


            try {
                let body = {
                    email: dataUser.email,
                    password: dataUser.password
                }
                let resultado = await axios.post(raiz + "users/login", body);
                console.log("00000", resultado);
                if (resultado.data.msg === "Contraseña incorrecta") {
                    notifications.showNotification({
                        message: "La contraseña es incorrecta",
                        icon: <ZoomExclamation />,
                        autoClose: 2000,
                        id: "letters"
                    });

                } else if (resultado.data.msg === "El User no existe") {
                    notifications.showNotification({
                        message: "El usuario no existe",
                        icon: <ZoomExclamation />,
                        autoClose: 2000,
                        id: "letters"
                    });

                }
                else if ((resultado.data.msg.includes('db error')) === true) {
                    notifications.showNotification({
                        message: "Hemos tenido un problema con nuestra basde de datos, por favor vualquier duda o queja escriba a raorcar3@gmail.com",
                        icon: <ZoomExclamation />,
                        autoClose: 2000,
                        id: "letters"
                    });


                } else if ((resultado.data.msg.includes('Welcome')) === true) {
                    props.dispatch({ type: LOGIN, payload: resultado.data });
                    console.log("login", resultado.data)
                    console.log(props)
                    setTimeout(() => {
                        navigate("/Home");
                    }, 1000);
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            notifications.showNotification({
                message: "Introduce un email válido",
                icon: <ZoomExclamation />,
                autoClose: 2000,
                id: 'email'
            })
        }

    };




    //2-Render (lo que pinta en pantalla)

    return (

        <div className="designLogin">
            <div className="form">
                <div className="selectorSection">
                    <div className="selected"><UserCircle name="search"></UserCircle><p> &nbsp;&nbsp; Log In</p></div>
                    <div className="btn btnGrey" onClick={() => navigateRegisters()}><UserPlus name="search"></UserPlus><p>&nbsp;&nbsp;Register</p></div>
                </div>
                <div className="formLoginSection">
                    <div className="logoSection">
                        <div className="logoImg" />
                        <div className="title">Super Dev</div>
                    </div>
                    <div className="inputSection noMarginTop">
                        <label >Email</label>
                        <div className="search">
                            <input type="email" className="search__input" id="email" name="email" title="email" placeholder="example@test.com" autoComplete="off" onChange={(e) => { fillData(e); }} />
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

                        {/* {msgError}
                        {msgError2} */}
                    </div>
                    <div className="inputSection loginSection">
                        <div className="btn btnBlue" onClick={() => login()}><p>Log In</p></div>
                    </div>
                </div>
            </div>
        </div >


    );



};
// //structure
// const DesignLogin = styled.div`
// font-family: 'Poppins', sans-serif;
// margin: 0;
// padding: 0;
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// min-height: 100vh;
// background-image: url(${fondoLogin});
// background-size: cover;
// `;

// const Form = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: start-flex;
//   align-items: center;
//   background: #ecf0f3;
//   border-radius: 1rem;
//   width: 33%;
//   height: 80%;
//   @media (max-width: 1087px) {
//     width: 70%;
//   }
//   @media (max-height: 500px) {
//     height: 100%;
//   }
// `;

// //selector
// const SelectorSection = styled.div`
// width: 100%;
// height: 2.5rem;
// display: flex;
// justify-content: center;
// align-items: center;
// `;

// const Btn = styled.div`
//   width: 15rem;
//   height: 2.5rem;
//   border-radius: 1rem;
//   justify-self: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: .3s ease;
//   &:hover {
//     color: var(--white);
//   }
//   p {
//     font-size: 1.2rem;
//   }

// `;

// const BtnBlue = styled(Btn)`
// grid-column: 1 / 2;
//   grid-row: 4 / 5;
//   background: var(--primary);
//   color: var(--greyLight-1);
//     box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-light), inset -0.2rem -0.2rem 1rem var(--primary-dark), 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
//     &:active {
//         box-shadow: inset .2rem .2rem 1rem var(--primary-dark),
//           inset -.2rem -.2rem 1rem var(--primary-light);
//       }
// `;

// const BtnGrey = styled(Btn)`
// width: 50%;
// grid-column: 1 / 2;
// grid-row: 5 / 6;
// color: var(--greyDark);
// border-radius: 0  1rem 0 0;
// box-shadow: inset 0.2rem 0.2rem 1rem var(--greyDark), inset -0.2rem -0.2rem 1rem var(--greyDark), -0.2rem -0.2rem 0.5rem var(--white);
// &:hover { color: var(--primary); }
// &:active {
//     box-shadow: inset .2rem .2rem 1rem var(--primary-dark),
//       inset -.2rem -.2rem 1rem var(--primary-light);
//    background: var(--primary);
//       color: var(--greyLight-1);
//   }
// `;

// const Selected = styled.div`
// text-align: center;
// width: 50%;
// `;
// //Selector

// //Form
// const FormLoginSection = styled.div`
// text-align: left;
// height: 90%;
// width: 70%;
// `;

// const LogoSection = styled.div`
// height: 42%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   `;

// //Form

export default connect()(Login);