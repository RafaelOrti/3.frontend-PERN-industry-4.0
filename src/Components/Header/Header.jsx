
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


import { raiz } from '../../utiles';


import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/actions';


import './Header.scss';

const Header = (props) => {

    // console.log("props.credentials?.user.rol")
    // console.log(props)
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
    // console.log("34567",props)
    
    if (props.user?.user) {
        return (
            <div className='headerGlobalDesign' style={{
                display: props.hideFooter.isHome ? 'none' : undefined
            }} >
                {console.log("77777",props.user?.user.authorizationLevel)}
                {
                    (window.location.pathname !== "/" || window.location.pathname !== "/register") &&

                    <div className='headerDesign'>

                        <div className="headerSpace headerLogoDesign">
                            <img className="headerLogo" src={require('../../img/logo.png')} alt="logo" onClick={() => navegar("/")}></img>
                        </div>
                        <div className="headerSpace">

                            <div className="headerFilled"></div>
                        </div>
                        <div className="headerSpace headerLinksDesign">
                            
                            {
                                (props.user?.user.authorizationLevel === 3) && (window.location.pathname === "/admin") &&
                                <div className="link" onClick={() => navegar("/clientAdmin")}><b>ClientAdmin</b></div>

                            }
                            {
                                (props.user?.user.authorizationLevel === 3) && (window.location.pathname !== "/admin") &&
                                <div className="link" onClick={() => navegar("/clientAdmin")}>ClientAdmin</div>
                            }
                            {
                                (props.user?.user.authorizationLevel === 5) && (window.location.pathname === "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}><b>Admin</b></div>

                            }
                            {
                                (props.user?.user.authorizationLevel === 5) && (window.location.pathname !== "/admin") &&
                                <div className="link" onClick={() => navegar("/admin")}>Admin</div>
                            }
                            {
                                (window.location.pathname === "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    <b>{props.user?.user.authorizationLevel}</b>
                                </div>
                            }
                            {
                                (window.location.pathname === "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    <b>{props.user?.user.name}</b>
                                </div>
                            }
                            {
                                (window.location.pathname !== "/profile") &&
                                <div className="link" onClick={() => navegar("/profile")}>
                                    {props.user?.user.name}
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

            </div>

        )
    }



}

export default connect((state) => ({
    user: state.user,
    // token: state.token,
    hideFooter: state.hideFooter
}))(Header);