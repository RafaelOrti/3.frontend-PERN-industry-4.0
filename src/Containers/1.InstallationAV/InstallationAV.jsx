
// import { connect } from "react-redux";
// import { IS_HOME } from "../../redux/actions";


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { raiz } from '../../utiles';

// //notificaciones
// import { useNotifications } from "@mantine/notifications";

// //ENDPOINTS CALL
// import axios from 'axios';

// //ICONS
// import { At, Lock, Check, ZoomExclamation, Photo, UserCircle, UserPlus } from "tabler-icons-react";

// import './InstallationAV.scss';

// import cv from "./opencv";

// const InstallationAV = (props) => {

//     const [dataInstallationAV, setDataInstallationAV] = useState({ on: "", degreening: "", door: "", password: "", temp: "", H2O: "", C2O: "", C2H4: "" });


//     useEffect(() => {
//         props.dispatch({ type: IS_HOME })
//     }, [])


//     let src = cv.imread('canvasInput');
//     let dst = new cv.Mat();
//     let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
//     let high = new cv.Mat(src.rows, src.cols, src.type(), [150, 150, 150, 255]);
//     // You can try more different parameters
//     cv.inRange(src, low, high, dst);
//     cv.imshow('canvasOutput', dst);
//     src.delete(); dst.delete(); low.delete(); high.delete();



//     const call = async () => {

//         console.log("repeticion")

//         // setDataInstallationAV({on: "", degreening: "", door: "", password: "", temp: "", H2O: "", C2O: "", C2H4: ""})
//         // let config = {
//         //     headers: { Authorization: `Bearer ${props.user?.token}` }
//         // };

//         // let res = await axios.get(raiz + "InstallationAV/InstallationAVValueReading", config);

//         // let x = res.data
//         // console.log("x", x)
//     }

//         //timers
//         const firstCall = 3000; // 10 hour in msec, frecuency call timing


//         // setTimeout(
//         //     call, firstCall);

//     return (
//         <div className='InstallationAVDesign'>

     
//         </div>
//     )

// }

// export default connaect((state) => ({
//     user: state.user,
//     // token: state.token,
//     hideFooter: state.hideFooter
// }))(InstallationAV);


