import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { raiz } from '../../utiles';
import axios from 'axios';
import { Input } from "@mantine/core";



import { TabsProps, Tabs } from '@mantine/core';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
//REDUX...
import { connect } from 'react-redux';


import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';


// import { NOT_HOME } from "../../redux/actions";

import './Home.css';





const Home = (props) => {

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

    const Home = async () => {
        try {
            let body = {
                email: dataUser.email,
                password: dataUser.password
            }
            let resultado = await axios.post(raiz + "users/Home", body);
            //Cambiamos el valor del hook credenciales, por lo tanto se recargará el componente
            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {
                //Guardaríamos los datos en redux...
                props.dispatch({ type: Home, payload: resultado.data });
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
        <div className='designHome'>
            <Navbar collapseOnSelect fixed="top" bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );

};


export default connect()(Home);