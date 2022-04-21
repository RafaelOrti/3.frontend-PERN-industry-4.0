
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, MOVIES_TITLE } from '../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
    Input,
    Button
} from 'antd';
import { raiz } from '../../utiles';

import './Header.scss';

const Header = (props) => {

    console.log("props.credentials?.usuario.rol")
    console.log(props.credentials?.usuario.rol)
    let navigate = useNavigate();

    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        // console.log("props.credentials");
        // console.log(props.credentials);
    })

    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }

    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({ type: LOGOUT });

        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    const manejador = (ev) => {
        setTitulo(ev.target.value);
    }
    // {
    //     window.location.pathname === "/add" &&
    //     <div className="link" onClick={() => navegar("/film")}>Film</div>
    // }
   
    // console.log(window.location.pathname);
    if (props.credentials?.token) {
        return (
            <div className='designHeaderGlobal' style={{
                display: props.hideFooter.isHome ? 'none' : undefined
            }} >
                {
                    window.location.pathname !== "/display" &&

                    <div className='designHeader'>

                        <div className="headerSpace logoDesign">
                            <img className="logo" src={require('../../img/logo.png')} alt="logo" onClick={() => navegar("/")}></img>
                        </div>
                        <div className="headerSpace searchDesign">
                            {/* {
                                (window.location.pathname === "/film" || window.location.pathname === "/add") &&
                                <Input.Group compact>
                                    <Input style={{ width: 'calc(100% - 200px)'}} placeholder="Busca una película por título" onChange={(ev) => manejador(ev)} />
                                    <Button style={{  backgroundColor:'black',border:"black"}} onClick={() => busquedaPorTitulo()} type="primary">Buscar</Button>
                                </Input.Group>
                            } */}
                            <div className="relleno"></div>
                        </div>
                        <div className="headerSpace linksDesign">
                            {/* {
                         ( window.location.pathname === "/add" ) &&
                         <div className="link" onClick={() => navegar("/add")}><b>Add</b></div>
                         
                    }
                    {
                        (window.location.pathname !== "/add") &&
                        <div className="link" onClick={() => navegar("/add")}>Add</div>
                    } */}
                            {
                                (props.credentials?.usuario.rol === true) && (window.location.pathname === "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}><b>Admin</b></div>

                            }
                            {
                                (props.credentials?.usuario.rol === true) && (window.location.pathname !== "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}>Admin</div>
                            }
                            {
                                (window.location.pathname === "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    <b>{props.credentials?.usuario.nombre}</b>
                                </div>
                            }
                            {
                                (window.location.pathname !== "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    {props.credentials?.usuario.nombre}
                                </div>
                            }
                            {
                                (window.location.pathname === "/profile") &&
                                <div className="link" onClick={() => logOut()}> <b> Logout</b></div>
                            }
                            {
                                (window.location.pathname !== "/profile") &&
                                <div className="link" onClick={() => logOut()}>Logout</div>
                            }
                        </div>

                    </div>
                }
                {
                    window.location.pathname === "/display" &&
                    (

                        <div className="headerSpace logoDesign">
                            {/* <img className="logoDisplay" src={require('../../img/volver.png')} alt="logo" onClick={() => navegar("/film")}></img> */}
                        </div>

                    )
                }
            </div>

        )
    }



}

export default connect((state) => ({
    credentials: state.credentials,
    hideFooter: state.hideFooter
}))(Header);