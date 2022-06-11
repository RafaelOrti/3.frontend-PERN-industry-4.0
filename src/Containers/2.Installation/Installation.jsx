
import { connect } from "react-redux";
import { NOT_HOME } from "../../redux/actions";


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { raiz } from '../../utiles';

//notificaciones
import { useNotifications } from "@mantine/notifications";

//ENDPOINTS CALL
import axios from 'axios';

//ICONS
import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from "tabler-icons-react";



import './Installation.scss';

const Installation = (props) => {

    const [dataInstallation, setDataInstallation] = useState({ on: "", degreening: "", door: "", password: "", temp: "", H2O: "", C2O: "", C2H4: "" });


    useEffect(() => {
        props.dispatch({ type: NOT_HOME })
    }, [])





    const call = async () => {

        console.log("repeticion")

        // setDataInstallation({on: "", degreening: "", door: "", password: "", temp: "", H2O: "", C2O: "", C2H4: ""})
        // let config = {
        //     headers: { Authorization: `Bearer ${props.user?.token}` }
        // };

        // let res = await axios.get(raiz + "installation/InstallationValueReading", config);

        // let x = res.data
        // console.log("x", x)
    }

        //timers
        const firstCall = 3000; // 10 hour in msec, frecuency call timing


        setTimeout(
            call, firstCall);

    return (
        <div className='InstallationDesign'>


        </div>
    )

}

export default connect((state) => ({
    user: state.user,
    // token: state.token,
    hideFooter: state.hideFooter
}))(Installation);


