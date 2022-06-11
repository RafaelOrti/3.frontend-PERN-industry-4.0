import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { raiz } from '../../utiles';

//notificaciones
import { useNotifications } from "@mantine/notifications";

//ENDPOINTS CALL
import axios from 'axios';

/*DISEÑO*/
import './AdminClient.scss';

//ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from "tabler-icons-react";



/*DISEÑO*/


//REDUX
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";
import { REGISTER } from "../../redux/actions";

let a = false;

const AdminClient = (props) => {

    useEffect(() => {
        props.dispatch({ type: NOT_HOME })
        readUsers();
        console.log("rrrrrr", props.user)
    }, [])

    const notifications = useNotifications();
    let navigate = useNavigate();

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [dataUser, setDataUser] = useState({ name: "", email: "", password: "", passwordConfirmation: "" });
    const [users, setUsers] = useState("");
    const [page, setPage] = useState(0);
    // const [msgError, setMsgError] = useState("");
    // const [msgError2, setMsgError2] = useState("");


    //handlers
    const fillData = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value })
        // console.log("dataUser", dataUser)
    };

    const advancePage = () => {

        let numberSections=Object.keys(users).length/10
        numberSections++
        console.log("numberSect", numberSections)
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
    };
    const goBackPage = () => {
        if(page!==0){
        setPage(page-10)
        }else{
            notifications.showNotification({
                message: "No hay más paginas a la izquierda",
                icon: <ZoomExclamation />,
                autoClose: 2000,
                id: "leftPage"
            });
        }
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

    const register = async () => {
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
                let body = {
                    name: dataUser.name,
                    email: dataUser.email,
                    password: dataUser.password
                }
                let resultado = await axios.post(raiz + "users/Register", body);

                let x = resultado.data
                console.log("x", x)
                if (resultado.data.msg === "this user already exists") {
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
                else if ((resultado.data.msg.includes('Welcome')) === true) {
                    console.log("88888: " + resultado)
                    props.dispatch({ type: REGISTER, payload: resultado.data });
                    setTimeout(() => {
                        navigate("/Home");
                    }, 1000);
                }
            } catch (error) {
                console.log(error)
            }

        }
    };

    const readUsers = async () => {

        try {

            let config = {
                headers: { Authorization: `Bearer ${props.user?.token}` }
            };
            let res = await axios.get(raiz + "users/client", config);
            console.log("99999999", res)
            console.log("99999999", res.data)
            setTimeout(() => {
                setUsers(res.data);
            }, 2);
        } catch (error) {
            console.log(error);
        }
    };


    //2-Render (lo que pinta en pantalla)

    return (

        <div className="designLogin">
            <div className="adminForm">
                <div className="selectorSection">
                    <div className="btnAdmin adminSelected"><UserPlus name="search"></UserPlus><p> &nbsp;&nbsp;Usuarios </p></div>
                    <div className="btnAdmin adminBtnGreyL " onClick={() => navigate("/clientAdminCreate")}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Crear usuario</p></div>
                    <div className="btnAdmin adminBtnGreyL " onClick={() => navigate("/clientAdminUpdate")}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Editar usuario</p></div>
                    <div className="btnAdmin adminBtnGreyL " onClick={() => navigate("/clientAdminDelete")}><UserCircle name="search"></UserCircle><p>&nbsp;&nbsp;Eliminar usuario</p></div>

                </div>
                <div className="adminClientForm">
                    <div className="userRow bold" >
                        <div className="userElement" >Nombre</div>
                        <div className="userElement" >email</div>
                        <div className="userElement" >authorizationLevel</div>
                        <div className="userElement" >createdAt</div>
                        <div className="userElement" >updatedAt</div>
                    </div>
                    {
                        console.log("users", users)
                    }
                    {
                        Object.keys(users).slice(0, 10).map(key => {
                            // console.log(key); // 👉️ name, country
                            // console.log(users[key]); // 👉️ James, Chile
                            return (
                                <div className="userRow" key={key} >
                                    <div className="userColumn" >
                                        <div className="userElement" >{users[key].name}</div>
                                    </div>
                                    <div className="userColumn" >
                                        <div className="userElement" >{users[key].email}</div>
                                    </div>
                                    <div className="userColumn" >
                                        <div className="userElement" >{users[key].authorizationLevel}</div>
                                    </div>
                                    <div className="userColumn" >
                                        <div className="userElement" >{users[key].createdAt}</div>
                                    </div>
                                    <div className="userColumn" >
                                        <div className="userElement" >{users[key].updatedAt}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <ul className="pagination">
                        <li key="0" onClick={() => goBackPage()}>«</li>
                        <li key="1" onClick={() => advancePage()}>1</li>
                        <li key="2"><a className="active" href="/">2</a></li>
                        <li key="3">3</li>
                        <li key="4">4</li>
                        <li key="5" onClick={() => advancePage()}>»</li>
                    </ul>
                </div>
            </div>
        </div >


    );



};


export default connect((state) => ({
    user: state.user,
    // token: state.token,
    hideFooter: state.hideFooter
}))(AdminClient);